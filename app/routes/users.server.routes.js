/*
 * users.server.routes.js
 * ----------------------
 *
 * This file contains the definitions for the REST API
 * routes. Each route has seeks a function from the
 * user controller or another node module and assigns
 * that function to an HTTP verb.
 *
 */

// Invoke 'strict' JavaScript mode
'use strict';

const users    = require('../../app/controllers/users.server.controller'),
      passport = require('passport');

// Define the routes' module method
module.exports = function(app) {
    // Define the '/users' route
    app.route('/api/users')
       .post(users.register);

    app.route('/api/users/me')
       .get(users.me)
       .put(users.edit);

    // Define the '/users/login' route
    app.route('/api/users/login')
       .post(users.login);

    app.route('/api/users/logout')
       .get(users.logout)
       .post(users.logout);
};