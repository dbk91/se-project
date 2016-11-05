/*
 * config.js
 * ---------
 *
 * This file pulls the environment from the environment variable
 * and loads the appropriate configuration file.
 *
 */

// Invoke 'strict' JavaScript mode
'use strict';

// Load the appropriate configuration file according to the 'NODE_ENV' variable
module.exports = require(`./env/${process.env.NODE_ENV}`);