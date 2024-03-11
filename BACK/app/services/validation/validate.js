// eslint-disable-next-line import/no-extraneous-dependencies
import APIError from '../error/APIError.js';

/**
 * Middleware function to validate request data against a Joi schema.
 * If validation fails, it sends a 422 Unprocessable entity.
 * @param {Joi.Schema} schema - Joi schema for validation.
 * @param {('body'|'params')} prop - Choose whether to validate the request body or parameters.
 * @returns {Function} Express middleware function.
 */
export default function validate(schema, prop) {
  return async (req, _, next) => {
    try {
      const { error } = await schema.validateAsync(req[prop]);
      if (error) {
        throw new APIError(error.message, 422);
      }
      next();
    } catch (error) {
      next(error); // Pass the error to the error handler
    }
  };
}
