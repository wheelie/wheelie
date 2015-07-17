'use strict';

var utils = require('../utils');
var exceptions = require('../exceptions');

var Task = require('../models/task.js');
var TaskGroup = require('../models/task_group.js');


/**
 * Registry class that holds a list of Task or TaskGroup,
 * ready for Gulp.task() registration
 * @constructor
 */
function Registry() {
  this.list = [];
  this.size = 0;
}

/**
 * Returns a registerd Task or TaskGroup according to provided name
 * @param {string} name - The nome of the Task or TaskGroup to retrieve
 */
Registry.prototype.get = function(name) {
  var task = this.list[name];
  if (task !== undefined) {
    return task;
  } else {
    throw exceptions.KeyError();
  }
};

/**
 * Adds a Task or a TaskGroup into the internal list. If a Task or a
 * TaskGroup with the same name exists, it will be overwritten.
 * @param {Object} task - The task instance to add
 */
Registry.prototype.add = function(task) {
  if (task instanceof Task || task instanceof TaskGroup) {
    this.list[task.name] = task;
    this.size += 1;
  } else {
    throw exceptions.IllegalArgument();
  }
};

/**
 * Removes a Task or a TaskGroup according to provided name. It throws a
 * KeyError exception if the task does not exist.
 * @param {string} name - The name of the task to remove
 */
Registry.prototype.remove = function(name) {
  this.get(name);
  delete this.list[name];
  this.size -= 1;
};

/**
 * Updates a Task options object or a TaskGroup tasks list. If the provided
 * name returns a Task instance, its options attribute will be merged with
 * provided values. On the other hand, if a TaskGroup is found, its tasks
 * attribute will be overwritten with the value argument. In such case, it's
 * mandatory that value is an Array object.
 * @param {string} name - The name of the task to update
 * @param {Object} value - The object with task options or an Array of task name
 */
Registry.prototype.update = function(name, value) {
  var task = this.get(name);

  if (task instanceof Task) {
    // merge task options with user-defined values
    task.options = utils.extend({}, task.options, value);
  } else if (task instanceof TaskGroup) {
    // overwrite tasks list
    task.tasks = utils.getMandatoryArray(value);
  }
};

module.exports = Registry;
