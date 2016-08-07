'use strict';

var Task = require('wheelie/lib/models/task');


/**
 * Returns an empty task that can override an
 * already defined task in the registry. This is
 * called `disabler` because each task that is
 * overridden with this empty Task, is simply
 * disabled.
 *
 * The ``disablerGenerator`` must be used in the
 * ``Wheelie#disable()`` public API.
 */
function disablerGenerator(taskName) {
  return new Task(taskName);
}

module.exports = disablerGenerator;
