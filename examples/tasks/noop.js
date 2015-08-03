'use strict';

var Task = require('../../lib/models/task');
var gulp = require('../../../lib/index').gulp;
var options = require('../../../lib/index').options;


var config = {
  src: options.src + '/noop/**',
  dest: options.dest + '/noop'
};

function run() {
  console.log(config);
  console.log(gulp);
}

module.exports = new Task('noop', run, config);
