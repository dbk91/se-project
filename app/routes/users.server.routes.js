// Invoke 'strict' JavaScript mode
'use strict';

const users    = require('../../app/controllers/users.server.controller'),
      passport = require('passport');

// Define the routes' module method
module.exports = function(app) {
    // Set up the 'register' route
    app.route('/users/register')
       .post(users.register);
};