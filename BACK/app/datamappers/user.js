/**
 * Module containing functions to interact with the database regarding users.
 * @module userDatamapper
 */

import handleRequest from '../utils/pgUtils.js';

const { executeRequest, executeRequestWithSingleResult } = handleRequest;

export default {

  /**
   * Find a user by its ID in the database.
   * @async
   * @function findById
   * @param {number} id - ID of the user to find.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async findById(id) {
    const sqlQuery = 'SELECT * FROM get_user_without_password($1);';
    const values = [id];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
   * Find all nicknames in the database.
   * @async
   * @function findAllNicknames
   * @param {text} nickname - nickname of the user to find.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async findAllNicknames() {
    const sqlQuery = 'SELECT * FROM get_all_nicknames();';
    return executeRequest(sqlQuery);
  },

  /**
   * Find a user by its nickname in the database.
   * @async
   * @function findByNickname
   * @param {text} nickname - nickname of the user to find.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async findByNickname(nickname) {
    const sqlQuery = 'SELECT * FROM get_user_by_nickname($1);';
    const values = [nickname];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
     * Find a user by its nickname in the database.
     * @async
     * @function findByEmail
     * @param {text} email - email of the user to find.
     * @returns {Promise} Promise object representing the result of the database query.
     */
  async findByEmail(email) {
    const sqlQuery = 'SELECT * FROM get_user_by_email($1);';
    const values = [email];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
   * Find a user (full data) by its ID in the database.
   * @async
   * @function findByIdWithPassword
   * @param {number} id - ID of the user to find.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async findByIdWithPassword(id) {
    const sqlQuery = 'SELECT * FROM get_user($1);';
    const values = [id];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
   * Update a user in the database.
   * @async
   * @function update
   * @param {Object} user - User object containing the updated user data.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async update(user) {
    const sqlQuery = 'SELECT * FROM update_user($1);';
    const values = [user];
    return executeRequest(sqlQuery, values);
  },

  /**
   * Create a new user in the database.
   * @async
   * @function create
   * @param {Object} user - user object containing the user information to create.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async create(user) {
    const sqlQuery = 'SELECT * FROM insert_user($1);';
    const values = [user];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
   * Delete a user from the database by its ID.
   * @async
   * @function delete
   * @param {number} id - ID of the banword to delete.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async delete(id) {
    const sqlQuery = 'SELECT * FROM delete_user($1);';
    const values = [id];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
   * Update user promptToken in the database.
   * @async
   * @function update
   * @param {Object} user - User object containing the updated user data.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async decountPromptToken(userId) {
    const sqlQuery = 'SELECT * FROM decount_user_prompt($1);';
    const values = [userId];
    return executeRequest(sqlQuery, values);
  },

};
