'use strict';

var utils = require('../utils');


/**
 * TaskGroup model, used to define a group of Gulp task
 * @constructor
 * @param {string} name - The name of this group of tasks
 * @param {Array} tasks - The list of tasks launched with this group
 */
function TaskGroup(name, tasks) {
  this.name = utils.getMandatoryField(name);
  this.tasks = utils.getMandatoryArray(tasks);
}

module.exports = TaskGroup;
