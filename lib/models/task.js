'use strict';

var utils = require('../utils');
var exceptions = require('../exceptions');


/**
 * Task model, used to define a Gulp task with a proper run() function
 * @constructor
 * @param {string} name - The Task name
 * @param {function} run - The task action
 * @param {Object} options - A list of common options used by the run() method
 */
function Task(name, run, options) {
  this.name = utils.getMandatoryField(name);
  this.run = utils.getMandatoryFunction(run);
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
