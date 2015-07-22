'use strict';

var gulp = require('../../index').gulp;
var globals = require('../../index').options;

var Task = require('../models/task');


var config = {
  src: globals.src + '/noop/**',
  dest: globals.dest + '/noop'
};

function run() {
  console.log(config);
  console.log(gulp);
}

module.exports = new Task('noop', run, config);
