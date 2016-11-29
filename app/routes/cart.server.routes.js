/*
 * cart.server.routes.js
 * ----------------------
 *
 * This file contains the definitions for the REST API
 * routes for the shopping cart.
 *
 */

// Invoke 'strict' Javascript mode
'use strict';

const cart = require('../../app/controllers/cart.server.controller');

// Define the routes' module
module.exports = function(app) {
    app.route('/api/cart')
       .get(cart.readCart)
       .put(cart.updateCart)
       .delete(cart.deleteCart);
}