/**
 * Module containing functions to interact with the database regarding banwords.
 * @module banwordDatamapper
 */

import handleRequest from '../utils/pgUtils.js';

const { executeRequest, executeRequestWithSingleResult } = handleRequest;

export default {

  /**
   * Retrieve all banwords from the database.
   * @async
   * @function findAll
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async findAll() {
    const sqlQuery = 'SELECT * FROM get_all_banwords();';
    return executeRequest(sqlQuery);
  },

  /**
   * Retrieve all banwords from the database.
   * @async
   * @function findAllWithoutId
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async findAllWithoutId() {
    const sqlQuery = 'SELECT * FROM get_all_banwords_without_id();';
    return executeRequest(sqlQuery);
  },

  /**
   * Find a banword by its ID in the database.
   * @async
   * @function findById
   * @param {number} id - ID of the banword to find.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async findById(id) {
    const sqlQuery = 'SELECT * FROM get_banword($1);';
    const values = [id];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
   * Update a banword in the database.
   * @async
   * @function update
   * @param {Object} banword - Banword object containing the updated banword information.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async update(banword) {
    const sqlQuery = 'SELECT * FROM update_banword($1);';
    const values = [banword];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
   * Create a new banword in the database.
   * @async
   * @function create
   * @param {Object} banword - Banword object containing the banword information to create.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async create(banword) {
    const sqlQuery = 'SELECT * FROM insert_banword($1);';
    const values = [banword];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
   * Delete a banword from the database by its ID.
   * @async
   * @function delete
   * @param {number} id - ID of the banword to delete.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async delete(id) {
    const sqlQuery = 'SELECT * FROM delete_banword($1);';
    const values = [id];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

};
