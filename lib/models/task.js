'use strict';

var IllegalArgument = require('../errors/exceptions').IllegalArgument;

var isSet = require('../utils').isSet;
var isFunction = require('../utils').isFunction;
var isArray = require('../utils').isArray;


/**
 * Task model, used to define a Gulp task with a proper run() function. It also
 * contains a ``patches`` array that stores all configuration patches so that
 * the config generation may be lazy.
 * @constructor
 * @param {string} name - The Task name (mandatory)
 * @param {Array} dependencies - Tasks list that should be run before this one
 *                               (default: [])
 * @param {function} run - The Gulp action (default: empty function)
 * @param {function} config - A lazy callback that returns a list of options
 *                            (default: empty function)
 */
function Task(name, dependencies, run, config) {
  // defaults
  this.name = name;
  this.dependencies = dependencies || [];
  this.run = run || this.run;
  this.config = config || this.config;
  this.patches = [];

  // validity check
  this.isValid();
}

/**
 * ``Task.isValid()`` uses a set of validators so that if at least
 * one check doesn't pass, an ``IllegalArgument`` exception is raised,
 * providing the list of wrong fields.
 */
Task.prototype.isValid = function() {
  var message = 'Task "' + this.name + '" received a wrong value for fields: ';
  var invalidFields = [];

  // name is mandatory
  if (!isSet(this.name)) {
    invalidFields.push('name');
  }

  // dependencies must be an array
  if (!isArray(this.dependencies)) {
    invalidFields.push('dependencies');
  }

  // run must be a function
  if (!isFunction(this.run)) {
    invalidFields.push('run');
  }

  // config must be a function
  if (!isFunction(this.config)) {
    invalidFields.push('config');
  }

  // throws an IllegalArgument if at least
  // one check doesn't pass
  if (invalidFields.length > 0) {
    throw new IllegalArgument(message + invalidFields);
  }
};

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
