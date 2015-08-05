'use strict';

var exceptions = require('./exceptions');


/**
 * Expects that field is available or throws an AttributeError exception
 * @param {any} field - The field to check
 */
function mandatory(field) {
  if (field !== undefined && field !== null) {
    return field;
  } else {
    throw exceptions.IllegalArgument();
  }
}

/**
 * Expects that given argument is a function or throws an
 * IllegalArgument exception
 * @param {function} fn - The function to check
 */
function isFunction(fn) {
  if (typeof fn === 'function' || fn === undefined || fn === null) {
    return fn;
  } else {
    throw exceptions.IllegalArgument();
  }
}

/**
 * Expects that given argument is an Array or throws an
 * AttributeError exception
 * @param {function} fn - The function to check
 */
function isArray(array) {
  if (Array.isArray(array) || array === undefined || array === null) {
    return array;
  } else {
    throw exceptions.IllegalArgument();
  }
}

/**
 * Merges given JavaScript objects from the latest argument on the right
 * to the first argument on the left. This means that the first argument is
 * updated with the other arguments value. If you don't want to overwrite the
 * first object, pass an empty object like:
 *
 * utils.extend({}, obj1, obj2, ...);
 *
 * @param {Object} out - a list of object that should be merged
 */
function extend(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj)
      continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object')
          deepExtend(out[key], obj[key]);
        else
          out[key] = obj[key];
      }
    }
  }

  return out;
}

module.exports = {
  mandatory: mandatory,
  isFunction: isFunction,
  isArray: isArray,
  extend: extend
}
