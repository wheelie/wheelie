'use strict';

var argv = require('yargs').argv;


module.exports = {
  colors: {
    'DEBUG': 'white',
    'INFO': 'blue',
    'WARNING': 'yellow',
    'ERROR': 'red',
  },
  writeLevel: 'INFO',
  src: 'client/',
  build: 'static/',
  dist: 'static/',
  entrypoint: '__wheelie__',
  production: !!argv.production
}
