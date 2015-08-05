'use strict';

// internal imports
var Task = require('../models/task');

// external plugins
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

// utilities
var handlers = require('../errors/handlers');


function config(globals) {
  return {
    src: [
      'gulpfile.js',
      options.src + '/js/**/*.js'
    ]
  }
};

function run(gulp, config) {
  return function() {
      return gulp.src(config.src)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .on('error', handlers.notifyError);
  }
}

module.exports = new Task('jshint', [], run, config);
