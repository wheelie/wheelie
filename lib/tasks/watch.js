'use strict';

// internal imports
var Task = require('../models/task');


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
    gulp.watch(config.sass, ['sass']);
    gulp.watch(config.assets, ['assets']);
    gulp.watch(config.templates, ['templates']);
    gulp.watch(config.jshint, ['jshint']);
  };
}

module.exports = new Task('watch', ['browser-sync', 'build'], run, config);
