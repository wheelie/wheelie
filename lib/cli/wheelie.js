'use strict';

var logger = require('../logging/logger');
var utils = require('../utils');
var config = require('../config');

var Registry = require('../models/registry');
var Watcher = require('../helpers/watcher');
var disablerGenerator = require('../helpers/disabler');


/**
 * Wheelie main constructor. It initializes internal variables and stores
 * all global settings wrote in the config object. Because it's important that
 * registered Task shares the same Gulp instance, Wheelie stores a reference
 * of the local Gulp instance. If the constructor isn't called with the
 * gulp reference, Wheelie tries a local import.
 * @constructor
 * @param {Object} options - Options Object that overwrites the default
 *                           configurations
 * @param {Object} gulp - The Gulp instance provided in the constructor
 */
function Wheelie(options, gulp) {
  options = options || {};
  this._gulp = gulp || require('gulp');
  this._registry = new Registry();
  this._options = utils.extend({}, config, options);
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
 * Disables a registered Task so that the task is available
 * but doesn't do anything. This is useful when removing
 * a Task may break the Recipe because some tasks depend
 * on this one.
 * @param {string} name - The name of the Task to disable
 */
Wheelie.prototype.disable = function(name) {
  var disabler = disablerGenerator(name);
  this._registry.add(disabler);
};

/**
 * Returns the destination folder according to the production flag.
 */
Wheelie.prototype._getDest = function() {
  return this._options.production ? this._options.dist : this._options.build;
};

/**
 * Updates the Gulp entrypoint for the 'default' task
 * @param {string} taskName - The name of the task that becomes the default task
 */
Wheelie.prototype.setDefault = function(taskName) {
  this._options.entrypoint = taskName;
};

/**
 * Configures Gulp tasks using the internal registry. This method returns
 * the Gulp instance because, after this point, Wheelie is useless and further
 * configurations require the use of Gulp APIs.
 */
Wheelie.prototype.build = function() {
  // sets the destination folder at once
  this._options.dest = this._getDest();

  // activate the auto-watch 'default' task
  if (!this._options.production) {
    this.add(Watcher);
  }

  // get each task from the registry and register it
  // in the `gulp` instance
  var tasks = this._registry.items();

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

    // registers a watcher if defined in the task and not
    // in production mode
    if (!this._options.production && config.watcher) {
      logger.debug(
        'Adding a watcher for task "' + task.name + '" ' +
        'with paths: ' + config.watcher
      );
      this._gulp.watch(config.watcher, [task.name]);
    }
  }

  // set the gulp entrypoint
  this._gulp.task('default', [this._options.entrypoint]);

  return this._gulp;
};

module.exports = Wheelie;
