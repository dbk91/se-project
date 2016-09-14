// Invoke 'strict' Javscript mode
'use strict';

var express = require('express'),
    http    = require('http');

// Define Express' configuration
module.exports = function() {
   // New express application
   var app = express();

   // HTTP server
   var server = http.createServer(app);

   // Set the path to the views
   app.set('views', './app/views');
   app.set('view engine', 'ejs');

   require('../app/routes/index.server.routes.js')(app);

   // Static server files
   app.use(express.static('public'));

   // Return the instance of a server
   return server;
};