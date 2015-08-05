'use strict';

var gulp = require('gulp');
var logger = require('../logging/logger');
var utils = require('../utils');
var config = require('../config').wheelie;

var Registry = require('../models/registry');


/**
 * Wheelie main constructor. It initializes internal variables and stores
 * all global settings wrote in the config file. Because it's important that
 * registered Task shares the same Gulp instance, Wheelie stores a reference
 * of the local Gulp instance.
 * @constructor
 */
function Wheelie() {
  this.registry = new Registry();
  this.gulp = gulp;
  this.options = config;
}

/**
 * Adds a Task into the tasks registry
 * @param {Object} item - The Task to add
 */
Wheelie.prototype.add = function(item) {
  var genericTasks = Array.isArray(item) ? item : [item];

  for (var i = 0, task; (task = genericTasks[i]); i++) {
    this.registry.add(task);
  }
};

/**
 * Removes the registered Task
 * @param {string} task - The name of the Task to remove
 */
Wheelie.prototype.remove = function(task) {
  this.registry.remove(task);
};

/**
 * Updates the registered Task options with given value.
 * @param {string} name - The name of the Task to update
 * @param {Object} value - The Task options update
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
    logger.debug('Registering "' + task.name + '" task');
    // generates the task settings
    var config = task.config(this.options);
    for (var j = 0, patch; (patch = task.patches[j]); j++) {
      config = utils.extend(config, patch);
    }

    // prepares the Gulp callback
    var callback = task.run(this.gulp, config);

    // registers the task in the Gulp registry
    this.gulp.task(task.name, task.dependencies, callback);
  }

  return this.gulp;
};

module.exports = Wheelie;
