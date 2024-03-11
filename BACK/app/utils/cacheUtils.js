// eslint-disable-next-line import/no-extraneous-dependencies
import NodeCache from 'node-cache';

// Create an instance of NodeCache
const cache = new NodeCache();

/**
 * Retrieves data from the cache for the specified key.
 * @param {string} key - The key for which to retrieve data from the cache.
 * @returns {*} The data corresponding to the specified key in the cache, or undefined if no data is associated with that key.
 */
export function getCache(key) {
  return cache.get(key);
}

/**
 * Sets a value in the cache with the specified key.
 * @param {string} key - The key to set in the cache.
 * @param {*} value - The value to set in the cache.
 * @param {number} [totalSeconds=86400] - The total number of seconds the value should be cached for. Default is 86400 seconds (24 hours).
 */
export function setCache(key, value, totalSeconds = 86400) {
  cache.set(key, value, totalSeconds);
}

/**
 * Deletes data associated with the specified key from the cache.
 * @param {string} key - The key for which to delete data from the cache.
 */
export function deleteCache(key) {
  cache.del(key);
}
