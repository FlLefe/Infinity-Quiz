/**
 * Represents an API error.
 * @class
 * @extends Error
 */
export default class APIError extends Error {
  /**
   * Creates an instance of APIError.
   * @constructor
   * @param {string} message - The error message.
   * @param {number} [status=500] - The HTTP status code associated with the error.
   */
  constructor(message, status = 500) {
    super(message);
    /**
     * The HTTP status code associated with the error.
     * @type {number}
     */
    this.status = status;
  }
}
