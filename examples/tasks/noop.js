'use strict';

var Task = require('../../lib/models/task');


function config(globals) {
  return {
    src: globals.src + '/noop/**',
    dest: globals.dest + '/noop'
  };
}

function run(gulp, config) {
  return function() {
      console.log(gulp);
      console.log(config);
  };
}

module.exports = new Task('noop', [], run, config);
