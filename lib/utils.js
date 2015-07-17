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

module.exports = {
  getMandatoryField: getMandatoryField,
  getMandatoryFunction: getMandatoryFunction
}
