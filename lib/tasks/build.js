'use strict';

var TaskGroup = require('../models/task_group');


module.exports = new TaskGroup('build', ['sass', 'assets', 'templates']);
