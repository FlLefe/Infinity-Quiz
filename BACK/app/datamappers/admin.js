/**
 * Module containing functions to interact with the database regarding users and quizzes.
 * @module adminDatamapper
 */

import handleRequest from '../utils/pgUtils.js';

const { executeRequest, executeRequestWithSingleResult } = handleRequest;

export default {

  /**
   * Retrieve all users from the database.
   * @async
   * @function findAll
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async findAllUsers() {
    const sqlQuery = 'SELECT * FROM get_all_users();';
    return executeRequest(sqlQuery);
  },

  /**
   * Find a user by its ID in the database.
   * @async
   * @function findUserById
   * @param {number} id - ID of the user to find.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async findUserById(id) {
    const sqlQuery = 'SELECT * FROM get_user($1);';
    const values = [id];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
   * Find a user by its ID in the database without password
   * @async
   * @function findByIdWithoutPassword
   * @param {number} id - ID of the user to find.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async findByIdWithoutPassword(id) {
    const sqlQuery = 'SELECT * FROM get_user_without_password($1);';
    const values = [id];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
   * Update a user in the database.
   * @async
   * @function updateUser
   * @param {Object} user - User object containing the updated user information.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async updateUser(user) {
    const sqlQuery = 'SELECT * FROM update_user_admin($1);';
    const values = [user];
    return executeRequest(sqlQuery, values);
  },

  /**
   * Update a quiz in the database.
   * @async
   * @function updateQuiz
   * @param {Object} quiz - Quiz object containing the updated quiz information.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async updateQuiz(quiz) {
    const sqlQuery = 'SELECT * FROM update_quiz_admin($1);';
    const values = [quiz];
    return executeRequest(sqlQuery, values);
  },

  /**
   * Delete a quiz from the database by its ID.
   * @async
   * @function deleteQuiz
   * @param {number} id - ID of the quiz to delete.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async deleteQuiz(id) {
    const sqlQuery = 'SELECT * FROM delete_quiz_admin($1);';
    const values = [id];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

};
