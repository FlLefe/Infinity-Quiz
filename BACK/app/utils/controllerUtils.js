/**
 * Manages the response of a controller function.
 * @param {object} res - The response object.
 * @param {any} result - The result to be sent in the response.
 * @param {Error} error - The error object, if any.
 * @param {function} next - The next middleware function.
 */
export default function manageResponse(res, result, error, next) {
  if (error) {
    next(error);
  } else {
    res.json(result);
  }
}
