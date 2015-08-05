'use strict';

var assets = require('./assets');
var browserSync = require('./browser_sync');
var build = require('./build');
var jshint = require('./jshint');
var sass = require('./sass');
var templates = require('./templates');
var watch = require('./watch');

module.exports = [assets, browserSync, build, jshint, sass, templates, watch];
