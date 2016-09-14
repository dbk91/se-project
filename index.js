// Invoke 'strict' Javascript mode
'use strict';

// Set environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the application dependencies
var express = require('./config/express');

// Instantiate the application
var app = express();

// Listen on specified port
app.listen(31337);

// Log status
console.log('Application running on http://localhost:31337');

// Export the application
module.exports = app;