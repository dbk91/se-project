/*
 * books.server.model.js
 * ---------------------
 *
 * This file contains the methods and schema
 * for the 'books' model. Mongoose defines the Schema
 * and implements methods before storing the
 * data in the database.
 *
 */

// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    }
});

mongoose.model('Book', BookSchema);