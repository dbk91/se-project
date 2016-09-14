// Invoke 'strict' Javascript mode
'use strict';

// Create the render controller method
exports.render = function(req, res) {
    res.render('index', {
        title: 'Software Engineering - CMSC 447'
    });
};
