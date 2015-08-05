'use strict';

// internal imports
var Task = require('../models/task');

// injecting BrowserSync task
var browserSync = require('./browser_sync');


function config(globals) {
  // TODO: we should get these values from the plugins registry

  return {
    sass: globals.src + '/scss/**/*.{sass,scss}',
    assets: globals.src + '/assets/**',
    templates: globals.src + '/templates/**',
    jshint: [
      'gulpfile.js',
      globals.src + '/js/**/*.js'
    ]
  };
}

function run(gulp, config) {
  return function() {
    browserSync.run();
    gulp.watch(config.sass, ['sass']);
    gulp.watch(config.assets, ['assets']);
    gulp.watch(config.templates, ['templates']);
    gulp.watch(config.jshint, ['jshint']);
  };
}

module.exports = new Task('watch', ['build'], run, config);
