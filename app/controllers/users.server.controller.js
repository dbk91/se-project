// Invoke 'strict' JavaScript mode
'use strict';

const User     = require('mongoose').model('User'),
      passport = require('passport');

// Create a method for registration for the User Controller
exports.register = function(req, res, next) {
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
}