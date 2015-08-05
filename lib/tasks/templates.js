'use strict';

var Task = require('../models/task');


function config(globals) {
  return {
    src: globals.src + '/templates/**',
    dest: globals.dest + '/'
  };
}

function run(gulp, config) {
  return function() {
      return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
  };
}

module.exports = new Task('templates', [], run, config);
