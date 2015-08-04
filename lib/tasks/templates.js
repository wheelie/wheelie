'use strict';

var Task = require('../models/task');
var gulp = require('../../index').gulp;
var options = require('../../index').options;


var config = {
  src: options.src + '/templates/**',
  dest: options.dest + '/'
};

function run() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
}

module.exports = new Task('templates', run, config);
