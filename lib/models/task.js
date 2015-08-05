'use strict';

var mandatory = require('../utils').mandatory;
var isFunction = require('../utils').isFunction;
var isArray = require('../utils').isArray;


/**
 * Task model, used to define a Gulp task with a proper run() function. It also
 * contains a ``patches`` array that stores all configuration patches so that
 * the config generation may be lazy.
 * @constructor
 * @param {string} name - The Task name
 * @param {Array} dependencies - Tasks list that should be run before this one
 * @param {function} run - The Gulp action
 * @param {function} config - A lazy callback that returns a list of options
 */
function Task(name, dependencies, run, config) {
  this.name = mandatory(name);
  this.dependencies = isArray(mandatory(dependencies));
  this.run = isFunction(run) || this.run;
  this.config = isFunction(config) || this.config;
  this.patches = [];
}

/**
 * ``Task.run()`` may be implemented and Wheelie uses this method to provide
 * a proper ``Gulp`` callback task. Wheelie calls this function and passes
 * the current ``gulp`` instance and the Task ``config`` settings generated
 * by the ``config()`` callback with proper ``patches``.
 * @param {Object} gulp - The Wheelie gulp instance
 * @param {Object} config - The Task configuration with applied patches
 */
Task.prototype.run = function(/*gulp, config*/) {
  return undefined;
};

/**
 * Returns a config object that is passed to ``Task.run()`` as a parameter.
 * When Wheelie calls this method, it passes the instance ``globals`` settings.
 * This method is not mandatory if the Task doesn't need any configurable
 * settings.
 * @param {Object} globals - Wheelie global settings
 */
Task.prototype.config = function(/*globals*/) {
  return {};
};

module.exports = Task;
