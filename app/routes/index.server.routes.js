// Invoke 'strict' Javascript mode
'use strict';

// Load the 'index' controller
const index = require('../controllers/index.server.controller');

// Define the routes module
module.exports = function(app) {
    // Server index
    app.route('/')
       .get(index.render);
};