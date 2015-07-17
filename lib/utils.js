'use strict';

var exceptions = require('./exceptions');


/**
 * Expects that field is available or throws an AttributeError exception
 * @param {any} field - The field to check
 */
function getMandatoryField(field) {
  if (field !== undefined && field !== null) {
    return field;
  } else {
    throw exceptions.AttributeError();
  }
}

/**
 * Expects that given argument is a function or throws an
 * IllegalArgument exception
 * @param {function} fn - The function to check
 */
function getMandatoryFunction(fn) {
  if (typeof fn === 'function') {
    return fn;
  } else {
    throw exceptions.IllegalArgument();
  }
}

/**
 * Expects that given argument is a function or throws an
 * IllegalArgument exception
 * @param {function} fn - The function to check
 */
function getMandatoryArray(array) {
  if (Array.isArray(array)) {
    return array;
  } else {
    throw exceptions.AttributeError();
  }
}

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
  getMandatoryField: getMandatoryField,
  getMandatoryFunction: getMandatoryFunction,
  getMandatoryArray: getMandatoryArray,
  extend: extend
}
