import bcrypt from 'bcrypt';
import jwt from './jwt.js';
import APIError from '../error/APIError.js';
import adminController from '../../controllers/admin.js';

/**
 * Encodes a password using bcrypt hashing algorithm.
 * @param {string} password - The password to be encoded.
 * @returns {Promise<string>} - A promise that resolves to the encoded password.
 */
export async function encodePassword(password) {
  return bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT, 10));
}

/**
 * Compare a password with its hashed version.
 * @param {string} password - The plain text password to compare.
 * @param {string} passwordHash - The hashed password to compare against.
 * @returns {Promise<boolean>} - A promise that resolves to true if the password matches the hash, false otherwise.
 */
export async function passwordMatch(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}

/**
 * Middleware function to check if the user is a member.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the middleware is complete.
 * @throws {APIError} - If the authentication token is missing, invalid, or the user role is not valid.
 */
export async function isMember(req, res, next) {
  req.user = {};
  try {
    // Retrieve the Authorization header
    const authHeader = req.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) throw new APIError('Le token d\'authentification est manquant', 401);

    const token = authHeader.split('Bearer ')[1];
    if (!token) throw new APIError('Le token d\'authentification est invalide', 401);

    const { result, error } = jwt.decode(token);
    if (error) throw new APIError('Le token d\'authentification est invalide', 401);

    if (!result.role || (result.role !== 'member' && result.role !== 'admin')) throw new APIError('Le rôle de l\'utilisateur n\'est pas valide', 401);

    req.user = result;

    // Verify in database that the user has member role
    const resultCheckDB = await adminController.getUserRole(req, res, next);

    if (!resultCheckDB || (resultCheckDB.role !== 'member' && resultCheckDB.role !== 'admin')) {
      req.user = {};
      throw new APIError('Le rôle de l\'utilisateur n\'est pas valide', 401);
    }

    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Middleware function to check if the user is an admin.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the middleware is complete.
 * @throws {APIError} - Throws an APIError if the user is not an admin.
 */
// eslint-disable-next-line consistent-return
export async function isAdmin(req, res, next) {
  try {
    const { user } = req;

    if (!user || !user.role || user.role !== 'admin') {
      throw new APIError('Vous n\'avez pas les droits', 401);
    }

    next();
  } catch (err) {
    return next(err);
  }
}
