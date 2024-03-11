/**
 * Module containing functions to interact with the database regarding banwords.
 * @module statisticDatamapper
 */

import handleRequest from '../utils/pgUtils.js';

const { executeRequest, executeRequestWithSingleResult } = handleRequest;

export default {

  /**
   * Retrieve all stats from the database.
   * @async
   * @function findAll
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async findAll() {
    const sqlQuery = 'SELECT * FROM get_all_statistics();';
    return executeRequest(sqlQuery);
  },

  /**
   * Find a stat by its ID in the database.
   * @async
   * @function findById
   * @param {number} id - ID of the banword to find.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async findById(id) {
    const sqlQuery = 'SELECT * FROM get_statistic_by_user_id($1);';
    const values = [id];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

  /**
   * Create a new stat in the database.
   * @async
   * @function create
   * @param {Object} stat - stat object containing the banword information to create.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async create(stat) {
    const sqlQuery = 'SELECT * FROM insert_stat($1);';
    const values = [stat];
    return executeRequestWithSingleResult(sqlQuery, values);
  },

};
