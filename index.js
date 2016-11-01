// Invoke 'strict' Javascript mode
'use strict';

// Set environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the application dependencies
const express  = require('./config/express'),
      mongoose = require('./config/mongoose');

// Instantiate the database
const db = mongoose();

// Instantiate the application
const app = express(db);

// Listen on specified port
app.listen(31337);

// Log status
console.log('Application running on http://localhost:31337');

// Export the application
module.exports = app;