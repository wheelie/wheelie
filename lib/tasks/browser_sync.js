'use strict';

// internal imports
var Task = require('../models/task');

// external plugins
var browserSync = require('browser-sync');


function config(globals) {
  return {
    server: {
      baseDir: globals.dest
    },
    files: [
      globals.dest + '/**',
      '!' + globals.dest + '/**.map'
    ],
    port: 3000,
    open: false,
    logFileChanges: false,
    logLevel: 'info'
  };
}

function run(gulp, config) {
  browserSync(config);
}

module.exports = new Task('browser-sync', [], run, config);
