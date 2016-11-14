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
        .exec()
        .then(function(books) {
            return res.json(books);
        }, function(err) {
            return res.status(500).send({
                message: 'Server Error'
            });
        });
};

exports.read = function(req, res, next) {
    let book = req.book ? req.book.toJSON() : {};

    return res.json(book);
};

exports.bookById = function(req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
          message: 'Book is invalid'
        });
    }

    Book.findById(id)
        .exec()
        .then(function(book) {
            if (!book) {
                return res.status(400).send({
                    message: 'No book was found with the provided identifier.'
                });
            }

            req.book = book;
            next();
        }, function(err) {
            return next(err);
        });
};