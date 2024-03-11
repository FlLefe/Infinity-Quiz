/* eslint-disable consistent-return */
import adminDatamapper from '../datamappers/admin.js';
import userDatamapper from '../datamappers/user.js';
import quizDatamapper from '../datamappers/quiz.js';
import banwordDatamapper from '../datamappers/banword.js';
import statisticDatamapper from '../datamappers/statistic.js';
import manageResponse from '../utils/controllerUtils.js';
import { deleteCache } from '../utils/cacheUtils.js';

export default {

  /**
   * Retrieve all users from database
   * @async
   * @function getAllUsers
   * @param {Object} req - HTTP Request.
   * @param {Object} res - HTTP Response.
   * @param {Function} next - Next middleware function.
   */
  async getAllUsers(req, res, next) {
    const { result, error } = await adminDatamapper.findAllUsers();
    manageResponse(res, result, error, next);
  },

  /**
 * Retrieve a single user by its ID.
 * @async
 * @function getOneUser
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - Next middleware function.
 */
  async getOneUser(req, res, next) {
    const { result, error } = await adminDatamapper.findByIdWithoutPassword(req.params.id);
    manageResponse(res, result, error, next);
  },

  /**
 * Retrieves the role of a user based on their ID.
 * @async
 * @function getUserRole
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
  // eslint-disable-next-line consistent-return
  async getUserRole(req, res, next) {
    const { id } = req.user;
    const { result, error } = await adminDatamapper.findByIdWithoutPassword(id);
    if (error) return next(error);

    return result;
  },

  /**
 * Edit a user by its ID, including mail and role.
 * @async
 * @function editUserById
 * @param {Object} req - HTTP Request.
 * @param {Object} res - HTTP Response.
 * @param {Function} next - Next middleware function.
 */
  async editUserById(req, res, next) {
    const { result: findByIdResult, error: findByIdError } = await userDatamapper.findByIdWithPassword(req.params.id);
    if (findByIdError) return next(findByIdError);

    const user = { ...findByIdResult, ...req.body };
    const { result: updateResult, error: updateError } = await adminDatamapper.updateUser(user);

    manageResponse(res, updateResult, updateError, next);
  },

  /**
   * Delete a user from database with it's id
   * @async
   * @function deleteUserById
   * @param {Object} req - HTTP Request.
   * @param {Object} res - HTTP Response.
   * @param {Function} next - Next middleware function.
   */
  async deleteUserById(req, res, next) {
    const { result, error } = await userDatamapper.delete(req.params.id);
    manageResponse(res, result, error, next);
  },

  /**
   * Retrieve all quiz from database
   * @async
   * @function getAllQuiz
   * @param {Object} req - HTTP Request.
   * @param {Object} res - HTTP Response.
   * @param {Function} next - Next middleware function.
   */
  async getAllQuiz(req, res, next) {
    const { result, error } = await quizDatamapper.findAll();
    manageResponse(res, result, error, next);
  },

  /**
 * Retrieve a single quiz with its questions and author by quiz ID.
 * @async
 * @function getOneQuiz
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - Next middleware function.
 */
  async getOneQuiz(req, res, next) {
    const { result, error } = await quizDatamapper.findQuizWithQuestionsAndAuthorByQuizId(req.params.id);
    manageResponse(res, result, error, next);
  },
  /**
 * Edit a quiz by its ID.
 * @async
 * @function editQuizById
 * @param {Object} req - HTTP Request.
 * @param {Object} res - HTTP Response.
  * @param {Function} next - Next middleware function.
 */
  async editQuizById(req, res, next) {
    const { result: findByIdResult, error: findByIdError } = await quizDatamapper.findById(req.params.id);
    if (findByIdError) return next(findByIdError);

    const quiz = { ...findByIdResult, ...req.body };
    const { result: updateResult, error: updateError } = await adminDatamapper.updateQuiz(quiz);

    manageResponse(res, updateResult, updateError, next);
  },

  /**
   * Delete a quiz from database with it's id
   * @async
   * @function deleteQuizById
   * @param {Object} req - HTTP Request.
   * @param {Object} res - HTTP Response.
   * @param {Function} next - Next middleware function.
   */
  async deleteQuizById(req, res, next) {
    const { result, error } = await adminDatamapper.deleteQuiz(req.params.id);
    manageResponse(res, result, error, next);
  },

  /**
   * Retrieve all banwords from database
   * @async
   * @function getAllBanwords
   * @param {Object} req - HTTP Request.
   * @param {Object} res - HTTP Response.
   * @param {Function} next - Next middleware function.
   */
  async getAllBanwords(req, res, next) {
    const { result, error } = await banwordDatamapper.findAll();
    manageResponse(res, result, error, next);
  },

  /**
 * Retrieve a single banword by ID.
 * @async
 * @function getOneBanword
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - Next middleware function.
 */
  async getOneBanword(req, res, next) {
    const { result, error } = await banwordDatamapper.findById(req.params.id);
    manageResponse(res, result, error, next);
  },

  /**
 * Edit a banword by its ID.
 * @async
 * @function editBanwordById
 * @param {Object} req - HTTP Request.
 * @param {Object} res - HTTP Response.
 * @param {Function} next - Next middleware function.
 */
  async editBanwordById(req, res, next) {
    const { result: findByIdResult, error: findByIdError } = await banwordDatamapper.findById(req.params.id);
    if (findByIdError) return next(findByIdError);

    const banword = { ...findByIdResult, ...req.body };
    const { result: updateResult, error: updateError } = await banwordDatamapper.update(banword);

    // delete banwords on cache to update them on the next call
    deleteCache('allBanwords');
    manageResponse(res, updateResult, updateError, next);
  },

  /**
   * Create a banword in database
   * @async
   * @function createBanword
   * @param {Object} req - HTTP Request.
   * @param {Object} res - HTTP Response.
   * @param {Function} next - Next middleware function.
   */
  async createBanword(req, res, next) {
    const { result, error } = await banwordDatamapper.create(req.body);
    // delete banwords on cache to update them on the next call
    deleteCache('allBanwords');
    manageResponse(res, result, error, next);
  },

  /**
   * Delete a banword from database with it's id
   * @async
   * @function deleteBanwordById
   * @param {Object} req - HTTP Request.
   * @param {Object} res - HTTP Response.
   * @param {Function} next - Next middleware function.
   */
  async deleteBanwordById(req, res, next) {
    const { result, error } = await banwordDatamapper.delete(req.params.id);
    // delete banwords on cache to update them on the next call
    deleteCache('allBanwords');
    manageResponse(res, result, error, next);
  },

  /**
   * Retrieve all statistics from database
   * @async
   * @function getAllStats
   * @param {Object} req - HTTP Request.
   * @param {Object} res - HTTP Response.
   * @param {Function} next - Next middleware function.
   */
  async getAllStats(req, res, next) {
    const { result, error } = await statisticDatamapper.findAll();
    manageResponse(res, result, error, next);
  },

  /**
 * Retrieve statistics by user ID.
 * @async
 * @function getStatsByUserId
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - Next middleware function.
 */
  async getStatsByUserId(req, res, next) {
    const { result, error } = await statisticDatamapper.findById(req.params.id);
    manageResponse(res, result, error, next);
  },

};
