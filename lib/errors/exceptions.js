'use strict';


/**
 * BaseException inherited by all exceptions
 * @constructor
 * @param {string} name - Exception name
 * @param {string} message - Exception detail
 */
function BaseException(name, message) {
  this.name = name;
  this.message = message;
}

// Base Exception inherits from Javascript ``Error`` object
BaseException.prototype = Object.create(Error.prototype);
BaseException.prototype.constructor = BaseException;
BaseException.prototype.toString = function() {
  return this.name + ': ' + this.message;
}

/**
 * Generic exception
 */
function Exception(message) {
  message = message || 'a generic exception occurs';
  return new BaseException('Exception', message);
}

/**
 * IllegalArgument exception when trying to pass a value of a wrong type to a function
 */
function IllegalArgument(message) {
  message = message || 'illegal or inappropriate argument passed to this method';
  return new BaseException('IllegalArgument', message);
}

/**
 * NotImplementedError exception when trying to launch a function that has not been implemented
 */
function NotImplementedError(message) {
  message = message || 'this method is defined but not implemented';
  return new BaseException('NotImplementedError', message);
}

function KeyError(message) {
  message = message || 'the key was not found in the Object instance';
  return new BaseException('KeyError', message);
}

module.exports = {
  'Exception': Exception,
  'IllegalArgument': IllegalArgument,
  'NotImplementedError': NotImplementedError,
  'KeyError': KeyError
};
