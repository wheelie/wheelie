'use strict';

var wheelie = require('../index');
var exampleTask = require('./tasks/noop');

// starting wheelie
wheelie.add(exampleTask);
wheelie.setDefault('noop');
wheelie.build();
