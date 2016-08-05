'use strict';


/**
 * Expects that field is available or throws an AttributeError exception
 * @param {any} field - The field to check
 */
function isSet(field) {
  return field !== undefined && field !== null;
}

/**
 * Expects that given argument is a function or throws an
 * IllegalArgument exception
 * @param {function} fn - The function to check
 */
function isFunction(fn) {
  return typeof fn === 'function';
}

/**
 * Expects that given argument is an Array or throws an
 * AttributeError exception
 * @param {function} array - The array to check
 */
function isArray(array) {
  return Array.isArray(array);
}

module.exports = {
  isSet: isSet,
  isFunction: isFunction,
  isArray: isArray,
}
