/*
 * books.server.controller.js
 * --------------------------
 *
 * This file contains the methods for the user
 * controller. Each method maps to a URL and
 * describes how each response should be handled.
 *
 */

// Invoke 'strict' JavaScript mode
'use strict';

const Book = require('mongoose').model('Book');

exports.list = function(req, res) {
    Book.find()
        .sort('-price')
        .exec(function(err, books) {
            if (err) {
                return res.status(500).send({
                    message: 'Server Error'
                });
            } else {
                res.json(books);
            }
        });
};