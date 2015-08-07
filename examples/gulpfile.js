'use strict';

var gulp = require('gulp');
var wheelie = require('../index');
var noopTask = require('./tasks/noop');

// starting wheelie
wheelie.add(noopTask);
wheelie.setDefault('noop');

wheelie.update('noop', {'key': 'updated'});
wheelie.build();
