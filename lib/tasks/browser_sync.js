'use strict';

// internal imports
var Task = require('../models/task');
var options = require('../../index').options;

// external plugins
var browserSync = require('browser-sync');


var config = {
  server: {
    baseDir: options.dest
  },
  files: [
    options.dest + '/**',
    '!' + options.dest + '/**.map'
  ],
  port: 3000,
  open: false,
  logFileChanges: false,
  logLevel: 'info'
};

function run() {
  browserSync(config);
}

module.exports = new Task('browser-sync', run, config);
