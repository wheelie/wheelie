'use strict';

module.exports = {
  'Exception': Exception,
  'AttributeError': AttributeError,
  'IllegalArgument': IllegalArgument,
  'NotImplementedError': NotImplementedError
};

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
 * AttributeError exception when trying to reference or assign a not existing value
 */
function AttributeError(message) {
  message = message || 'attribute references access or assignment failed';
  return new BaseException('AttributeError', message);
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
