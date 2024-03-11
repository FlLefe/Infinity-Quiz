// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import APIError from '../error/APIError.js';

/**
 * Module for JWT authentication.
 * @module jwt
 */

export default {
  /**
   * Generates a JWT token.
   * @param {Object} user - User data.
   * @returns {string} - JWT token.
   */
  encode(user) {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '2h' });
  },

  /**
   * Decodes a JWT token.
   * @param {string} token - JWT token.
   * @returns {Object} - Decoded token and error (if any).
   */
  decode(token) {
    let result;
    let error;
    try {
      result = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        error = new APIError('Expired connection', 401);
      } else {
        error = new APIError('Invalid token', 401);
      }
    }
    return { result, error };
  },
};
