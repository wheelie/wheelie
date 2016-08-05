'use strict';

var exceptions = require('./errors/exceptions');


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

/**
 * Merges given JavaScript objects from the latest argument on the right
 * to the first argument on the left. This means that the first argument is
 * updated with the other arguments value. If you don't want to overwrite the
 * first object, pass an empty object like:
 *
 * utils.extend({}, obj1, obj2, ...);
 *
 * @param {Object} out - the output object that should be merged
 */
function extend(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj) {
      continue;
    }

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          out[key] = extend({}, out[key], obj[key]);
        } else {
          out[key] = obj[key];
        }
      }
    }
  }

  return out;
}

module.exports = {
  isSet: isSet,
  isFunction: isFunction,
  isArray: isArray,
  extend: extend
}
