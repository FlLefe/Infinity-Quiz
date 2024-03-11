/**
 * Module for logging using Winston.
 * @module logger
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  addColors, format as _format, transports as _transports, createLogger,
} from 'winston';

/**
 * Levels of logging severity.
 * @readonly
 * @enum {number}
 */
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

/**
 * Determines the logging level based on the environment.
 * @function
 * @returns {string} The logging level.
 */
const level = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return isDevelopment ? 'debug' : 'http';
};

/**
 * Colors associated with different logging levels.
 * @readonly
 * @enum {string}
 */
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'blue',
  debug: 'white',
};

/**
 * Paths for log files.
 * @type {Object.<string, string>}
 */
const logFilePaths = {
  // Path for all logs.
  all: 'logs/all.log',
  // Path for error logs.
  error: 'logs/error.log',
};

// Add colors to the Winston logging levels
addColors(colors);

/**
 * Format of the log messages.
 * @type {Object}
 */
const format = _format.combine(
  _format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }),
  _format.colorize(),
  _format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

/**
 * Transports for logging.
 * @type {Array}
 */
const transports = [
  // Transport for all logs.
  new _transports.File({
    filename: logFilePaths.all,
  }),
  // Transport for error logs.
  new _transports.File({
    filename: logFilePaths.error,
    level: 'error',
  }),
];

if (process.env.NODE_ENV === 'development') {
  transports.push(new _transports.Console());
}

/**
 * Logger instance configured with the specified options.
 * @type {object}
 */
const logger = createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;
