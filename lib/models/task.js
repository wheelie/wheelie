'use strict';

var exceptions = require('../exceptions');


/**
 * Expects that field is available or throws an AttributeError exception
 * @param {any} field - The field to check
 */
function getMandatoryField(field) {
  if (field !== undefined) {
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
 * Task model used
 * @constructor
 * @param {string} name - The Task name
 * @param {string} sourceFolder - The source folder used by this task
 * @param {string} destFolder - The destination folder used by this task
 * @param {function} run - The task action
 * @param {Object} options - A list of common options used by the run() method
 */
function Task(name, sourceFolder, destFolder, run, options) {
  var fields = arguments || [];

  this.name = getMandatoryField(fields[0]);
  this.sourceFolder = getMandatoryField(fields[1]);
  this.destFolder = getMandatoryField(fields[2]);
  this.run = getMandatoryFunction(fields[3]);
  this.options = options;
}

/**
 * ``Task.run()`` should be implemented and is used by the task registry when
 * defining available ``Gulp`` tasks. In this function you can use the
 * ``this.options`` to access ``Task`` internal options.
 */
Task.prototype.run = function() {
  throw exceptions.NotImplementedErro();
};

module.exports = Task;
