'use strict';

var gulp = require('gulp');
var Registry = require('../models/registry');
var logger = require('../logging/logger');


function Wheelie() {
  this.registry = new Registry();
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
};

Wheelie.prototype.setDestination = function(value) {
};

Wheelie.prototype.setDefault = function(value) {
};

/**
 * Configures Gulp tasks using the internal registry
 */
Wheelie.prototype.build = function() {
};

module.exports = Wheelie;
