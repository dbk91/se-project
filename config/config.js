// Invoke 'strict' JavaScript mode
'use strict';

// Load the appropriate configuration file according to the 'NODE_ENV' variable
module.exports = require(`./env/${process.env.NODE_ENV}`);