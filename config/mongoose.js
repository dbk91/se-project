// Invoke 'strict' Javscript mode
'use strict';

const mongoose = require('mongoose'),
      config   = require('./config');

module.exports = function() {
    // Connect to MongoDB with Mongoose
    const db = mongoose.connect(config.db);

    // Load the application models
    require('../app/models/users.server.model');

    return db;
}