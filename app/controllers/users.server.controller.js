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
      passport = require('passport');

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
            // Check the error
            if (err && err.errors) {
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

exports.list = function(req, res, next) {
    return res.status(200).send({
        message: 'list users here'
    });
}

exports.login = function(req, res, next) {
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
}

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
}

exports.auth = function(req, res, next) {
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