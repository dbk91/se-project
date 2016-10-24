// Invoke 'strict' Javascript mode
'use strict';

// Define the routes module
module.exports = function(app) {
    // Load the 'index' controller
    const index = require('../controllers/index.server.controller');

    // Server index
    app.get('/', index.render);
};