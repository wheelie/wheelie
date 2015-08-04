'use strict';

// internal imports
var Task = require('../models/task');
var gulp = require('../../index').gulp;
var options = require('../../index').options;

// injecting BrowserSync task
var browserSync = require('./browser_sync');


// we should get these values from the plugins registry
var config = {
  sass: options.src + '/scss/**/*.{sass,scss}',
  assets: options.src + '/assets/**',
  templates: options.src + '/templates/**',
  jshint: [
    'gulpfile.js',
    options.src + '/js/**/*.js'
  ]
};

function run() {
  browserSync.run();
  gulp.watch(config.sass, ['sass']);
  gulp.watch(config.assets, ['assets']);
  gulp.watch(config.templates, ['templates']);
  gulp.watch(config.jshint, ['jshint']);
}

module.exports = new Task('watch', run, config);
