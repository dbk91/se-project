/*
 * users.server.controller.js
 * --------------------------
 *
 * This file contains the methods for the user
 * controller. Each method maps to a URL and
 * describes how each response should be handled.
 *
 */

// Invoke 'strict' JavaScript mode
'use strict';

const User     = require('mongoose').model('User'),
      passport = require('passport'),
      http     = require('http');

// Create a method for registration for the User Controller
exports.register = function(req, res, info) {
    // If the user is not connected, create the user
    if (!req.user) {
        // Create an instance of the User Model
        let user = new User(req.body);

        // Custom authentication with passport
        user.provider = 'local';

        // Attempt to save the user to the DB
        user.save(function(err) {
            // Email already exists
            if (err && err.name === 'MongoError' && err.code === 11000) {
                return res.status(409).send({
                    success: false,
                    message: 'An error occurred.',
                    errors: {
                        email: {
                            message: 'The provided e-mail already exists in our records'
                        }
                    }
                });
            // Check the error
            } else if (err && err.errors) {
                // Return the 400 'bad request' code and failure messages
                return res.status(400).send({
                    errors: err.errors
                });
            } else if (err) {
                // Return the 400 'bad request' code and failure message
                return res.status(400).send({
                    message: 'An error occurred.'
                });
            } else {
                // Return the 200 'okay' status code and success message
                return res.status(200).send({
                    message: 'Your account has been registered!'
                });
            }
        });
    } else {
        // Return to the home page if logged in -- 401 Forbidden
        return res.status(401).send({
            message: 'You cannot register an account while logged in.'
        });
    }
};

exports.me = function(req, res) {
    // Create a user object to securely tranfer data
    let user = null;

    if (req.user) {
        user = {
            email: req.user.email,
            first: req.user.name.first,
            last: req.user.name.last,
            displayName: req.user.name.full
        };
    }

    res.json(user || null);
};

exports.edit = function(req, res) {
    // Get the user
    let user = req.user;

    if (user) {
        // Update the user fields
        user.name.first  = req.body.name.first;
        user.name.last   = req.body.name.last;
        user.email       = req.body.email;
        user.lastUpdated = Date.now();

        user.save(function(err) {
            if (err) {
                return res.status(422).send({
                    message: err
                });
            } else {
                req.login(user, function(err) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.json({
                            success: true,
                            user: user,
                            message: 'Account updated!'
                        });
                    }
                });
            }
        });
    } else {
        res.status(401).send({
            message: 'You must be signed in to access this feature'
        });
    }
};

exports.login = function(req, res, next) {
    console.log('test');
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            res.status(500).send(info);
        } else if (!user) {
            res.status(401).send({
                message: info.message
            });
        } else {
            // Remove sensitive data from user object
            user.password = undefined;
            user.salt     = undefined;

            req.login(user, function(err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    // Set the JSON user object and success message
                    res.json({
                        user: user,
                        message: info.message
                    });
                }
            });
        }
    })(req, res, next);
};

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};

exports.requiresLogin = function(req, res, next) {
    // Validate the user is logged in
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'You must log in to access this feature'
        });
    } else {
        // Call the next middleware
        next();
    }
};