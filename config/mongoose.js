/*
 * mongoose.js
 * -----------
 *
 * This file contains the configuration for the
 * mongoose middleware. It connects mongoose to the
 * MongoDB databse and implements Bluebird as a
 * Promise library for optimal efficiency.
 *
 */

// Invoke 'strict' Javscript mode
'use strict';

const mongoose = require('mongoose'),
      bluebird = require('bluebird'),
      config   = require('./config');

module.exports = function() {
    // Implement Bluebird's promises instead of mongoose's default
    mongoose.Promise = bluebird;
    
    // Connect to MongoDB with Mongoose
    const db = mongoose.connect(config.db);

    // Load the application models
    require('../app/models/users.server.model');
    require('../app/models/books.server.model');

    return db;
}