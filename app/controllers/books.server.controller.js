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

exports.create = function(req, res) {
    // Create a new book
    let book = new Book(req.body);

    // Set the seller of the book
    book.seller = req.user;

    // Save the book to the database
    book.save(function(err) {
        // Check the error
        if (err && err.errors) {
            // Return the 400 'bad request' code and failure messages
            return res.status(400).send({
                errors: err.errors
            });
        } else if (err) {
            // Return the 400 'bad request' code and failure message
            return res.status(400).send({
                message: 'An error occurred.'
            });
        } else {
            // Return the 200 'okay' status code and success message
            return res.status(200).send({
                message: 'You have posted your book!'
            });
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

exports.titleSearch = function(req, res) {
    Book.find({ $text: { $search: req.body.title } })
    .then(function(data) {
        let books = { books: data };
        return res.json(books);
    }, function(err) {
        return res.status(500).send({
            message: 'An error occurred.'
        });
    });
};