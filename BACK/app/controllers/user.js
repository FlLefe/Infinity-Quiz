/* eslint-disable consistent-return */
import userDatamapper from '../datamappers/user.js';
import manageResponse from '../utils/controllerUtils.js';
import jwt from '../services/auth/jwt.js';

import { encodePassword, passwordMatch } from '../services/auth/security.js';
import APIError from '../services/error/APIError.js';

export default {

  /**
 * Retrieve a user by its ID.
 * @async
 * @function getUserById
 * @param {Object} req - HTTP Request.
 * @param {Object} res - HTTP Response.
 * @param {Function} next - Next middleware function.
 */
  async getUserById(req, res, next) {
    const userId = req.user?.id;
    if (userId) {
      const { result, error } = await userDatamapper.findById(userId);
      manageResponse(res, result, error, next);
    } else {
      next(new APIError('Utilisateur non connecté pour accéder à la page profil', 401));
    }
  },

  /**
   * Retrieve all nicknames from database
   * @async
   * @function getAllNicknames
   * @param {Object} req - HTTP Request.
   * @param {Object} res - HTTP Response.
   * @param {Function} next - Next middleware function.
   */
  async getAllNicknames(req, res, next) {
    const { result, error } = await userDatamapper.findAllNicknames();
    manageResponse(res, result, error, next);
  },

  /**
 * Edit a user by its ID without mail and role.
 * @async
 * @function editUserById
 * @param {Object} req - HTTP Request.
 * @param {Object} res - HTTP Response.
 * @param {Function} next - Next middleware function.
 */
  async editUserById(req, res, next) {
    if (req.user?.id) {
      const { result: userDataResult, error: userDataError } = await userDatamapper.findByIdWithPassword(req.user.id);
      if (userDataError) return next(new APIError('Aucun utilisateur trouvé avec l\'ID fourni', 404));

      // Check if user nickname needs edit
      if (req.body?.nickname) {
        const { result: findByNicknameResult, error: findByNicknameError } = await userDatamapper.findByNickname(req.body.nickname);
        if (findByNicknameError) return next(findByNicknameError);
        if (findByNicknameResult.nickname) return next(new APIError(`Le pseudonyme ${findByNicknameResult.nickname} existe déjà`, 400));
      }

      // Check is password needs edit
      if (req.body?.lastPassword && req.body?.newPassword) {
        const lastPasswordMatch = await passwordMatch(req.body.lastPassword, userDataResult.password);
        if (!lastPasswordMatch) return next(new APIError('Ancien mot de passe incorrect', 400));

        const newPasswordMatch = await passwordMatch(req.body.newPassword, userDataResult.password);
        if (newPasswordMatch) return next(new APIError('Le nouveau mot de passe doit être différent de l\'ancien', 400));

        const newPassword = await encodePassword(req.body.newPassword);
        req.body.password = newPassword;
      }

      const user = { ...userDataResult, ...req.body };
      const { result: updatedUser, error: updateError } = await userDatamapper.update(user);
      manageResponse(res, updatedUser, updateError, next);
    } else {
      next(new APIError('Utilisateur non connecté pour accéder à la modification de la page profil', 401));
    }
  },

  /**
 * Create a new user in the database.
 * @async
 * @function createUser
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 */
  async createUser(req, res, next) {
    const user = req.body;

    const { result: findByNicknameResult, error: findByNicknameError } = await userDatamapper.findByNickname(user.nickname);
    if (findByNicknameError) return next(findByNicknameError);
    if (findByNicknameResult.nickname) return next(new APIError(`Le pseudonyme ${findByNicknameResult.nickname} existe déjà`, 400));

    const { result: findByEmailResult, error: findByEmailError } = await userDatamapper.findByEmail(user.email);
    if (findByEmailError) return next(findByEmailError);
    if (findByEmailResult.email) return next(new APIError(`${findByEmailResult.email} existe déjà`, 400));

    user.password = await encodePassword(user.password);

    const { result, error } = await userDatamapper.create(user);
    manageResponse(res, result, error, next);
  },

  /**
 * Authenticate a user based on provided credentials and generate a token.
 * @async
 * @function connectUser
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 */
  async connectUser(req, res, next) {
    const login = req.body;

    const { result, error } = await userDatamapper.findByEmail(login.email);

    if (error) return next(error);
    if (!result.id) return next(new APIError('Identifiant ou mot de passe incorrect', 401));

    const isPasswordMatch = await passwordMatch(login.password, result.password);
    if (!isPasswordMatch) return next(new APIError('Identifiant ou mot de passe incorrect', 401));

    delete result?.password;

    const user = {
      id: result.id,
      nickname: result.nickname,
      profile_picture: result.profile_picture,
      role: result.role,
      token: jwt.encode(result),
    };

    manageResponse(res, user, error, next);
  },

};
