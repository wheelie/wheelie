'use strict';

function BaseException(name, message) {
  this.name = name;
  this.message = message;
}

BaseException.prototype = Object.create(Error.prototype);
BaseException.prototype.constructor = BaseException;
BaseException.prototype.toString = function() {
  return this.name + ': ' + this.message;
}

function Exception(message) {
  message = message || 'a generic exception occurs';
  return new BaseException('Exception', message);
}

function AttributeError(message) {
  message = message || 'attribute references access or assignment failed';
  return new BaseException('AttributeError', message);
}

var ExceptionsList = {
  'Exception': Exception,
  'AttributeError': AttributeError
}

module.exports = ExceptionsList;
