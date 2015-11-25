'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('ansi-escapes');
require('ansi-regex');
require('chalk');
require('cli-cursor');
require('cli-width');
require('figures');
require('lodash', '_');
require('readline2', 'readlineFacade');
require('run-async');
require('rx-lite', 'rx');
require('strip-ansi');
require('through');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
