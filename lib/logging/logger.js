'use strict';

var chalk = require('chalk');
var config = require('../config');

// Logger settings
var WRITE_LEVELS = {
  'DEBUG': 1,
  'INFO': 2,
  'WARNING': 3,
  'ERROR': 4,
  'DISABLED': 5
};

// Styles functions
var currentWriteLevel;
var debugStyle;
var infoStyle;
var warningStyle;
var errorStyle;


/**
 * Wheelie logger
 * @constructor
 */
function Logger() {
  var colors = config.colors;
  var writeLevel = config.writeLevel;

  // setting current write level
  this.setWriteLevel(writeLevel);

  // setting console styles
  debugStyle = chalk[colors.DEBUG];
  infoStyle = chalk[colors.INFO];
  warningStyle = chalk[colors.WARNING];
  errorStyle = chalk[colors.ERROR];
}

/**
 * Prints to stdout with newline, using the DEBUG chalk style
 * @param {string} text - Text to print
 */
Logger.prototype.debug = function(text) {
  if (this.writeIsEnabled('DEBUG')) {
    console.log('DEBUG: ', debugStyle(text));
  }
};

/**
 * Prints to stdout with newline, using the INFO chalk style
 * @param {string} text - Text to print
 */
Logger.prototype.info = function(text) {
  if (this.writeIsEnabled('INFO')) {
    console.info(infoStyle(text));
  }
};

/**
 * Prints to stdout with newline, using the WARNING chalk style
 * @param {string} text - Text to print
 */
Logger.prototype.warning = function(text) {
  if (this.writeIsEnabled('WARNING')) {
    console.warn(warningStyle(text));
  }
};

/**
 * Prints to stdout with newline, using the ERROR chalk style
 * @param {string} text - Text to print
 */
Logger.prototype.error = function(text) {
  if (this.writeIsEnabled('ERROR')) {
    console.error(errorStyle(text));
  }
};

/**
 * Sets the current write level; returns an error if writeLevel doesn't exist
 * @param {string} writeLevel - The new write level
 */
Logger.prototype.setWriteLevel = function(writeLevel) {
  if (WRITE_LEVELS[writeLevel] === undefined) {
    throw new Error('Write level "' +  writeLevel + '" doesn\'t exist');
  } else {
    currentWriteLevel = writeLevel;
  }
};

/**
 * Returns the current write level
 * @return {string} the current write level
 */
Logger.prototype.getWriteLevel = function() {
  return currentWriteLevel;
};

/**
 * Returns if this write level is enabled, according to the current write level
 * @param {string} writeLevel - Write level to test
 */
Logger.prototype.writeIsEnabled = function(writeLevel) {
  return WRITE_LEVELS[writeLevel] >= WRITE_LEVELS[currentWriteLevel];
};

module.exports = new Logger();
