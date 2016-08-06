'use strict';

var gulp = require('gulp');
var Wheelie = require('../index');
var noopTask = require('./tasks/noop');

// starting wheelie
var wheelie = new Wheelie();
wheelie.add(noopTask);
wheelie.setDefault('noop');

wheelie.update('noop', {'key': 'updated'});
wheelie.build();
