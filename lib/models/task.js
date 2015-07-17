'use strict';

var utils = require('../utils');
var exceptions = require('../exceptions');


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

  this.name = utils.getMandatoryField(fields[0]);
  this.sourceFolder = utils.getMandatoryField(fields[1]);
  this.destFolder = utils.getMandatoryField(fields[2]);
  this.run = utils.getMandatoryFunction(fields[3]);
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
