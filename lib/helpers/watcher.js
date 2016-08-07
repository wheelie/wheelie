'use strict';

var Task = require('wheelie/lib/models/task');

var dependencies = ['build'];


/**
 * Returns a Wheelie ``Task`` that is used as a default task.
 * It's useful when there are tasks with the ``watcher``
 * attribute defined, so that Wheelie auto loads them
 * in the watchers list (once per run).
 *
 * __wheelie__ task doesn't do anything except providing
 * an empty task that Gulp can execute.
 */
module.exports = new Task('__wheelie__', dependencies);
