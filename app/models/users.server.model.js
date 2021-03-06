/*
 * users.server.model.js
 * ---------------------
 *
 * This file contains the methods and schema
 * for the user model. Mongoose defines the Schema
 * and implements methods before storing the
 * data in the database.
 *
 */

// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
const mongoose = require('mongoose'),
      crypto   = require('crypto'),
      Schema   = mongoose.Schema,
      http     = require('http');

// Create the scheme for the user
const UserSchema = new Schema({
    name: {
        first: {
            name: 'firstName',
            type: String,
            required: 'You must provide a first name',
            trim: true,
            validate: [
                function(name) {
                    return name.length <= 32;
                }, 'This field must be less than 32 characters'
            ]
        },
        last: {
            name: 'lastName',
            type: String,
            required: 'You must provide a last name',
            trim: true,
            validate: [
                function(name) {
                    return name.length <= 32;
                }, 'This field must be less than 32 characters'
            ]
        }
    },
    email: {
        type: String,
        // Match the UMBC E-mail with regular expression
        match: [
            /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@(umbc)\.(edu)$/,
            'You must register with a valid UMBC e-mail address'
        ],
        index: {
            unique: 'An account is already registered with this e-mail'
        },
        lowercase: true,
        trim: true,
        required: 'You must provide a UMBC e-mail address'
    },
    password: {
        type: String,
        // Ensure password is at least eight characters long
        validate: [
            function(password) {
                return password.length >= 8;
            }, 'The password must be at least 8 characters long'
        ],
        required: 'You must provide a password'
    },
    salt: {
        type: String
    },
    created: {
        type: Date,
        // Default to the current time on creation
        default: Date.now
    },
    lastUpdated: {
        type: Date
    }
});

UserSchema.virtual('name.full').get(function() {
    // Return the full name using ES6 template literals
    return `${this.name.first} ${this.name.last}`;
});

// Create an instance method for hashing a password
UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('base64');
};

// Use a pre-save middleware to hash the password
// Capitalize first and last name if they were not entered as such
UserSchema.pre('save', function(next, done) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }

    // Force capitalize the first and last name
    if (this.name.first)
        this.name.first = `${this.name.first.charAt(0).toUpperCase()}${this.name.first.slice(1).toLowerCase()}`;

    if (this.name.last)
        this.name.last = `${this.name.last.charAt(0).toUpperCase()}${this.name.last.slice(1).toLowerCase()}`;

    // Continue to the next middleware
    next();
});

// Hash the input password and authenticate by comparing to the stored hash
UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

// Create the user model from the defined schema
mongoose.model('User', UserSchema);