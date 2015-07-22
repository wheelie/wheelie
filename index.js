'use strict';

// configurations and internals
var packageConfig = require('./package.json');
var logger = require('./lib/logging/logger');
var Wheelie = require('./lib/cli/wheelie');

// starting wheelie
logger.info('Starting Wheelie version ' + packageConfig.version);

module.exports = new Wheelie();
