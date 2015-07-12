// configurations
var packageConfig = require('../../package.json');
var config = require('../config');

// internal requirements
var Logger = require('../logging/logger');
var logger = new Logger(config.logger);

logger.info("nothing to do");
