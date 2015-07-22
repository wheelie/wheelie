'use strict';

var gulp = require('gulp');
var logger = require('../logging/logger');
var config = require('../config').wheelie;

var Registry = require('../models/registry');


/**
 * Wheelie main constructor. It initializes internal variables and stores
 * all global settings wrote in the config file. Because it's important that
 * registered Task and TaskGroup shares the same Gulp instance, and to prevent
 * a series of repetitive require(), Wheelie stores a reference of the local
 * Gulp instance.
 * @constructor
 */
function Wheelie() {
  this.registry = new Registry();
  this.gulp = gulp;
  this.options = config;
}

/**
 * Changes the internal Registry. It should be used only for testing purposes
 * @private
 * @param {Object} registry - The registry that replaces the initialized one
 */
Wheelie.prototype._setInternalRegistry = function(registry) {
  this.registry = registry;
};

/**
 * Adds a Task or a TaskGroup to the internal registry
 * @param {Object} item - The Task or the TaskGroup to add
 */
Wheelie.prototype.add = function(item) {
  var genericTasks = Array.isArray(item) ? item : [item];

  for (var i = 0, task; (task = genericTasks[i]); i++) {
    this.registry.add(task);
  }
};

/**
 * Removes the registered Task or TaskGroup
 * @param {string} task - The name of the Task or TaskGroup to remove
 */
Wheelie.prototype.remove = function(task) {
  this.registry.remove(task);
};

/**
 * Updates the registered Task options with given value. If the task is a
 * TaskGroup, value replaces the TaskGroup tasks array.
 * @param {string} name - The name of the Task or TaskGroup to update
 * @param {Object} value - An Object for Task options or an Array for TaskGroup
 */
Wheelie.prototype.update = function(name, value) {
  this.registry.update(name, value);
};

/**
 * Changes the Wheelie src configuration with the given value
 * @param {string} value - The value that replaces options.src
 */
Wheelie.prototype.setSource = function(value) {
  this.options.src = value;
};

/**
 * Changes the Wheelie dest configuration with the given value
 * @param {string} value - The value that replaces options.dest
 */
Wheelie.prototype.setDestination = function(value) {
  this.options.dest = value;
};

/**
 * Uses the internal Gulp to register a 'default' task
 * @param {string} task - The name of the task that becomes the default task
 */
Wheelie.prototype.setDefault = function(task) {
  this.gulp.task('default', [task]);
};

/**
 * Configures Gulp tasks using the internal registry. This method returns
 * the Gulp instance because, after this point, Wheelie is useless and further
 * configurations require the use of Gulp APIs.
 */
Wheelie.prototype.build = function() {
  var tasks = this.registry.items();

  for (var i = 0, task; (task = tasks[i]); i++) {
    // register the task in the Gulp registry
    this.gulp.task(task.name, task.run);
    logger.debug('Gulp registers "' + task.name + '" task');
  }

  return this.gulp;
};

module.exports = Wheelie;
