/*
 * local.js
 * --------
 *
 * This file contains the local strategy supported from the
 * npm module "passport-local". It provides support for standard
 * username and password authentication. In this case, the
 * user's username is simply the e-mail.
 *
 */

// Invoke 'strict' JavaScript mode
'use strict';

// Load the module's dependencies
const passport      = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      User          = require('mongoose').model('User');

module.exports = function() {
    // Define the passport's local strategy
    passport.use(new LocalStrategy({
            usernameField: 'email'
        },
        function(email, password, done) {
            // Find the user attempting to authenticate
            User.findOne({
                email: email.toLowerCase(),
            },
            function(err, user) {
                // Continue to the next middleware if an error occurred
                if (err) {
                    return done(err);
                }

                // If the user was not found, return a message and continue to the next middleware
                if(!user) {
                    return done(null, false, {
                        message: 'This e-mail was not found in our records'
                    });
                }

                // If the password is incorrect, return an error message and continue to the next middleware
                if (!user.authenticate(password)) {
                    return done(null, false, {
                        message: 'The provided password is incorrect'
                    });
                }

                // User has been authenticated! Return the user as an object
                return done(null, user, {
                    message: 'You have successfully logged in!'
                });
            });
    }));
};