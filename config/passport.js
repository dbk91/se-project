/*
 * passport.js
 * -----------
 * This file contains the configuration for the node module
 * "passport". This will contain a method to serialize and
 * deserialize user information and also implement the
 * local strategy for authenticating users.
 *
 */

// Load the module's dependencies
const passport = require('passport'),
      mongoose = require('mongoose');

module.exports = function() {
    // Get the User model from the defined mongoose schema
    let User = mongoose.model('User');

    // Serialize the user's id with passport's "serializeUser" method
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Load the user's document with passport's "deserializeUser" method
    passport.deserializeUser(function(id, done) {
        User.findOne({
            _id: id
        }, '-password -salt', function(err, user) {
            done(err, user);
        });
    });

    // Load the custom local strategy and immediately invoke
    require('./strategies/local')();
};