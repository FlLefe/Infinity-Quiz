// eslint-disable-next-line import/no-extraneous-dependencies
import { rateLimit } from 'express-rate-limit';

/**
 * Rate limiter middleware.
 *
 * @typedef {Object} RateLimiterOptions
 * @property {number} windowMs - The time window in milliseconds.
 * @property {number} max - The maximum number of requests allowed per window.
 * @property {boolean} standardHeaders - Whether to return rate limit info in the `RateLimit-*` headers.
 * @property {boolean} legacyHeaders - Whether to disable the `X-RateLimit-*` headers.
 * @property {function} handler - The handler function to be called when the limit is exceeded.
 *
 * @param {RateLimiterOptions} options - The rate limiter options.
 * @returns {RequestHandler} The rate limiter middleware.
 */
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // eslint-disable-next-line no-unused-vars
  handler: (req, res, next, options) => res.status(429).send({ error: 'Limite de requête dépassée' }),
});

export default limiter;
