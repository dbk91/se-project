// Invoke 'strict' Javscript mode
'use strict';

const express        = require('express'),
      config         = require('./config'),
      http           = require('http'),
      bodyParser     = require('body-parser'),
      methodOverride = require('method-override');

// Define Express' configuration
module.exports = function(db) {
    // New express application
    const app = express();

    // HTTP server
    const server = http.createServer(app);

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Set the path to the views
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    // Load the route configurations
    require('../app/routes/index.server.routes')(app);
    require('../app/routes/users.server.routes')(app);

    // Static server files
    app.use(express.static('public'));

    // Return the server instance
    return server;
};