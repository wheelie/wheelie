'use strict';

// internal imports
var Task = require('../models/task');

// external plugins
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// utilities
var browserSync = require('browser-sync');
var handlers = require('../errors/handlers');


function config(globals) {
  src: globals.src + '/scss/**/*.{sass,scss}',
  dest: globals.dest + '/css',
  sourceComments: 'map',
  imagePath: '/images',
  autoprefixer: ['last 2 version']
};

function run(gulp, config) {
  return function() {
      return gulp.src(config.src)
        .pipe(sourcemaps.init())
        .pipe(sass(config))
        .on('error', handlers.notifyError)
        .pipe(autoprefixer({ browsers: config.autoprefixer }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({ stream:true }));
  }
}

module.exports = new Task('sass', [], run, config);
