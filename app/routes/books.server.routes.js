/*
 * books.server.routes.js
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

const books    = require('../../app/controllers/books.server.controller'),
      passport = require('passport');

module.exports = function(app) {
    app.route('/books')
       .get(books.list);
}