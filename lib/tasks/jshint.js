'use strict';

// internal imports
var Task = require('../models/task');
var gulp = require('../../index').gulp;
var options = require('../../index').options;

// external plugins
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

// utilities
var handlers = require('../errors/handlers');


var config = {
  src: [
      'gulpfile.js',
      options.src + '/js/**/*.js'
  ]
};

function run() {
  return gulp.src(config.src)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .on('error', handlers.notifyError);
}

module.exports = new Task('jshint', run, config);
