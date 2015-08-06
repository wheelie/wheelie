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
    writeLevel: 'DEBUG'
  },
  wheelie: {
    src: 'client',
    build: 'build',
    dist: 'dist',
    production: !!argv.production
  }
}
