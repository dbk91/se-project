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
        type: String,
        required: 'You must provide the title of the book',
        validate: [
            function(title) {
                return title.length < 64;
            }, 'The title cannot exceed 64 characters'
        ]
    },
    price: {
        type: Number,
        required: 'You must provide a price',
        validate: [
            function(price) {
                return price > 0;
            }, 'The price must be greater than zero'
        ]
    },
    description: {
        type: String,
        description: '',
        trim: true,
        validate: [
            function(description) {
                return description.length < 1024;
            }, 'The description length exceeded the maximum number of characters'
        ]
    },
    posted: {
        type: Date,
        default: Date.now
    },
    seller: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

// Add the index to title
BookSchema.index({ title: 'text' });

mongoose.model('Book', BookSchema);