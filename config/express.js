/*
 * express.js
 * ----------
 * 
 * This file contains the configuration method for the
 * node module "express". It accepts an instance of MongoDB
 * and instantiates an instance of "express" to handle the
 * server's routes.
 *
 */

// Invoke 'strict' Javscript mode
'use strict';

const express        = require('express'),
      config         = require('./config'),
      http           = require('http'),
      bodyParser     = require('body-parser'),
      methodOverride = require('method-override'),
      session        = require('express-session'),
      MongoStore     = require('connect-mongo')(session),
      passport       = require('passport');

// Define Express' configuration
module.exports = function(db) {
    // Instantiate the "express" application
    const app = express();

    // Instantiate the HTTP server
    const server = http.createServer(app);

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Configure the 'session' middleware
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        store: new MongoStore({
            mongooseConnection: db.connection
        })
    }));

    // Set the path to the views
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    // Bootstrap the passport module
    app.use(passport.initialize());
    // Initialize a passport session to track the user's express session
    app.use(passport.session());

    // Load the route configurations
    require('../app/routes/index.server.routes')(app);
    require('../app/routes/users.server.routes')(app);

    // Static server files
    app.use(express.static('public'));

    // Return the server instance
    return server;
};