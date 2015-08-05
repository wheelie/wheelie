'use strict';

var exceptions = require('../exceptions');
var mandatory = require('../utils').mandatory;
var isFunction = require('../utils').isFunction;
var isArray = require('../utils').isArray;


/**
 * Task model, used to define a Gulp task with a proper run() function
 * @constructor
 * @param {string} name - The Task name
 * @param {Array} dependencies - Tasks list that should be run before this one
 * @param {function} run - The Gulp action
 * @param {Object} config - A list of common options used by the run() method
 */
function Task(name, dependencies, run, options) {
  this.name = mandatory(name);
  this.dependencies = isArray(mandatory(dependencies));
  this.run = isFunction(mandatory(run));
  this.options = options;
}

/**
 * ``Task.run()`` should be implemented and is used by the task registry when
 * defining available ``Gulp`` tasks. In this function you can use the
 * ``this.options`` to access ``Task`` internal options.
 */
Task.prototype.run = function() {
  throw exceptions.NotImplementedError();
};

module.exports = Task;
