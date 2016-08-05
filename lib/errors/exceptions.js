'use strict';


/**
 * IllegalArgument exception when trying to pass a value of a wrong type
 * to a function
 * @constructor
 * @param {string} message - Exception detail
 */
function IllegalArgument(message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message || 'Illegal or wrong argument passed to this method';
}

IllegalArgument.prototype = new Error();
IllegalArgument.prototype.constructor = IllegalArgument;

/**
 * NotImplementedError exception when trying to launch a function that has not
 * been implemented
 * @constructor
 * @param {string} message - Exception detail
 */
function NotImplementedError(message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message || 'This method is defined but not implemented';
}

NotImplementedError.prototype = new Error();
NotImplementedError.prototype.constructor = NotImplementedError;

/**
 * KeyError exception when trying to access to an object key and it's
 * not defined
 * @constructor
 * @param {string} message - Exception detail
 */
function KeyError(message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message || 'The key was not found in the Object instance';
}

KeyError.prototype = new Error();
KeyError.prototype.constructor = KeyError;

module.exports = {
  'IllegalArgument': IllegalArgument,
  'NotImplementedError': NotImplementedError,
  'KeyError': KeyError
};
