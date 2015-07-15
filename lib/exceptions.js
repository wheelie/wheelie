'use strict';

function Exception(name, message) {
  this.name = name;
  this.message = message;
}

Exception.prototype = Object.create(Error.prototype);
Exception.prototype.constructor = Exception;
Exception.prototype.toString = function() {
  return this.name + ': ' + this.message;
}

function AttributeError() {
  return new Exception('AttributeError', 'attribute references access or assignment failed')
}

var ExceptionsList = {
  "AttributeError": AttributeError 
}

module.exports = ExceptionsList;
