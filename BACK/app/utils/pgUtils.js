import pool from '../services/pgPool.js';

/**
 * Utility functions for executing SQL queries.
 * @module pgUtils
 */

export default {
  /**
   * Executes a SQL query and returns the rows.
   * @async
   * @function executeRequest
   * @param {string} sqlQuery - SQL query to execute.
   * @param {Array} values - Values for the query.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async executeRequest(sqlQuery, values) {
    try {
      const response = await pool.query(sqlQuery, values);
      return { result: response.rows, error: null };
    } catch (error) {
      return { result: null, error };
    }
  },

  /**
   * Executes a SQL query and returns the first row.
   * @async
   * @function executeRequestWithSingleResult
   * @param {string} sqlQuery - SQL query to execute.
   * @param {Array} values - Values for the query.
   * @returns {Promise} Promise object representing the result of the database query.
   */
  async executeRequestWithSingleResult(sqlQuery, values) {
    try {
      const response = await pool.query(sqlQuery, values);
      const result = response.rows[0];
      return { result, error: null };
    } catch (error) {
      return { result: null, error };
    }
  },
};
