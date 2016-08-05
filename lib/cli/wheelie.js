'use strict';

var logger = require('../logging/logger');
var utils = require('../utils');
var config = require('../config');

var Registry = require('../models/registry');


/**
 * Wheelie main constructor. It initializes internal variables and stores
 * all global settings wrote in the config file. Because it's important that
 * registered Task shares the same Gulp instance, Wheelie stores a reference
 * of the local Gulp instance. If the constructor isn't called with the
 * gulp reference, Wheelie tries a local import.
 * @constructor
 */
function Wheelie(gulp) {
  this._gulp = gulp || require('gulp');
  this._registry = new Registry();
  this._options = utils.extend({}, config);
}

/**
 * Adds a Task into the tasks registry
 * @param {Object} item - The Task to add
 */
Wheelie.prototype.add = function(item) {
  var genericTasks = Array.isArray(item) ? item : [item];

  for (var i = 0, task; (task = genericTasks[i]); i++) {
    this._registry.add(task);
  }
};

/**
 * Removes the registered Task
 * @param {string} task - The name of the Task to remove
 */
Wheelie.prototype.remove = function(task) {
  this._registry.remove(task);
};

/**
 * Updates the registered Task options with given value.
 * @param {string} name - The name of the Task to update
 * @param {Object} value - The Task options update
 */
Wheelie.prototype.update = function(name, value) {
  this._registry.update(name, value);
};

/**
 * Changes the Wheelie source folder with the provided value
 * @param {string} value - The value that replaces options.src
 */
Wheelie.prototype.setSrc = function(value) {
  this._options.src = value;
};

/**
 * Changes the Wheelie build folder with the provided value
 * @param {string} value - The value that replaces options.build
 */
Wheelie.prototype.setBuild = function(value) {
  this._options.build = value;
};

/**
 * Changes the Wheelie dist folder with the provided value
 * @param {string} value - The value that replaces options.dist
 */
Wheelie.prototype.setDist = function(value) {
  this._options.dist = value;
};

/**
 * Returns the destination folder according to the production flag.
 */
Wheelie.prototype._getDest = function() {
  return this._options.production ? this._options.dist : this._options.build;
};

/**
 * Uses the internal Gulp to register a 'default' task
 * @param {string} task - The name of the task that becomes the default task
 */
Wheelie.prototype.setDefault = function(task) {
  this._gulp.task('default', [task]);
};

/**
 * Configures Gulp tasks using the internal registry. This method returns
 * the Gulp instance because, after this point, Wheelie is useless and further
 * configurations require the use of Gulp APIs.
 */
Wheelie.prototype.build = function() {
  var tasks = this._registry.items();

  // sets the destination folder at once
  this._options.dest = this._getDest();

  for (var i = 0, task; (task = tasks[i]); i++) {
    logger.debug('Registering "' + task.name + '" task');
    // clones internal settings so they cannot be changed
    // between each plugin execution
    var options = utils.extend({}, this._options);

    // generates the task settings
    var config = task.config(options);
    for (var j = 0, patch; (patch = task.patches[j]); j++) {
      config = utils.extend(config, patch);
    }

    // prepares the Gulp callback
    var callback = task.run(this._gulp, config, options);

    // registers the task in the Gulp registry
    this._gulp.task(task.name, task.dependencies, callback);
  }

  return this._gulp;
};

module.exports = Wheelie;
