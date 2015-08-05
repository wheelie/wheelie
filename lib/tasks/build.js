'use strict';

var Task = require('../models/task');


module.exports = new Task('build', ['sass', 'assets', 'templates']);
