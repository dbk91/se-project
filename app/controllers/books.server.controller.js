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

const mongoose = require('mongoose'),
      Book     = mongoose.model('Book');

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

exports.read = function(req, res, next) {
    let book = req.book ? req.book.toJSON() : {};

    return res.json(book);
};

exports.bookById = function(req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
          message: 'Article is invalid'
        });
    }

    Book.findById(id)
        .exec(function(err, book) {
            if (err)
                return next(err);
            else if (!book) {
                return res.status(400).send({
                    message: 'No book has be found with that identifier.'
                });
            }

            req.book = book;
            next();
        });
};