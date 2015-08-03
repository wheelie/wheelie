'use strict';

// internal imports
var Task = require('../models/task');
var gulp = require('../../index').gulp;
var options = require('../../index').options;

// external plugins
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// utilities
var browserSync = require('browser-sync');
var handlers = require('../errors/handlers');


var config = {
  src: options.src + '/scss/**/*.{sass,scss}',
  dest: options.dest + '/css',
  sourceComments: 'map',
  imagePath: '/images',
  autoprefixer: ['last 2 version']
};

function run() {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(sass(config))
    .on('error', handlers.notifyError)
    .pipe(autoprefixer({ browsers: autoprefixer }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({ stream:true }));
}

module.exports = new Task('sass', run, config);
