'use strict';

var gulp = require('gulp');
var logger = require('../logging/logger');
var config = require('../config').wheelie;

var Registry = require('../models/registry');


function Wheelie() {
  this.registry = new Registry();
  this.gulp = gulp;
  this.options = config;
}

/**
 * Changes the internal Registry. It should be used only for testing purposes
 * @private
 */
Wheelie.prototype._setInternalRegistry = function(registry) {
  this.registry = registry;
};

Wheelie.prototype.add = function(item) {
  var genericTasks = Array.isArray(item) ? item : [item];

  for (var i = 0, task; (task = genericTasks[i]); i++) {
    this.registry.add(task);
  }
};

Wheelie.prototype.remove = function(task) {
  this.registry.remove(task);
};

Wheelie.prototype.update = function(name, value) {
  this.registry.update(name, value);
};

Wheelie.prototype.setSource = function(value) {
  this.options.src = value;
};

Wheelie.prototype.setDestination = function(value) {
  this.options.dest = value;
};

Wheelie.prototype.setDefault = function(task) {
  this.gulp.task('default', [task]);
};

/**
 * Configures Gulp tasks using the internal registry
 */
Wheelie.prototype.build = function() {
  var tasks = this.registry.items();

  for (var i = 0, task; (task = tasks[i]); i++) {
    // register the task in the Gulp registry
    this.gulp.task(task.name, task.run);
    logger.debug('Gulp registers "' + task.name + '" task');
  }
};

module.exports = Wheelie;
