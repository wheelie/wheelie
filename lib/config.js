'use strict';

var argv = require('yargs').argv;


module.exports = {
  logger: {
    colors: {
      'DEBUG': 'white',
      'INFO': 'blue',
      'WARNING': 'yellow',
      'ERROR': 'red',
    },
    writeLevel: 'INFO'
  },
  wheelie: {
    src: 'client/',
    build: 'static/',
    dist: 'static/',
    production: !!argv.production
  }
}
