'use strict';

var exceptions = require('../exceptions');

var Task = require('../models/task.js');


/**
 * Registry class that holds a list of Task, ready for Gulp.task() registration
 * @constructor
 */
function Registry() {
  this.list = {};
  this.size = 0;
}

/**
 * Returns a registered Task according to provided name
 * @param {string} name - The name of the Task to retrieve
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
 * Returns an array of registered tasks.
 */
Registry.prototype.items = function() {
  var items = [];
  for (var key in this.list) {
    if (this.list.hasOwnProperty(key)) {
      items.push(this.list[key]);
    }
  }

  return items;
};

/**
 * Adds a Task into the internal list. If a Task with the same name exists,
 * it will be overwritten.
 * @param {Object} task - The task instance to add
 */
Registry.prototype.add = function(task) {
  if (task instanceof Task) {
    this.list[task.name] = task;
    this.size += 1;
  } else {
    throw exceptions.IllegalArgument();
  }
};

/**
 * Removes a Task according to provided name. It throws a KeyError exception if
 * the task does not exist.
 * @param {string} name - The name of the task to remove
 */
Registry.prototype.remove = function(name) {
  this.get(name);
  delete this.list[name];
  this.size -= 1;
};

/**
 * Updates Task options merging deeply the provided values.
 * @param {string} name - The name of the task to update
 * @param {Object} value - The object with task options
 */
Registry.prototype.update = function(name, value) {
  var task = this.get(name);
  task.patches.push(value);
};

module.exports = Registry;
