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
    // Set the criteria
    let criteria = req.body.title
                   ? { $text: { $search: req.body.title } }
                   : {};

    // Set the request limit on searches
    const pageLimit = 8;
    // Set the current page
    let currentPage = req.body.page ? req.body.page : 0;
    // Initialize page number
    let pages = 0;
    // Initialize total count number
    let bookCount = 0;
    // Calculate the page offset
    let offset = pageLimit * currentPage;

    Book.find(criteria)
        .sort('-price')
        .count()
        .exec()
        .then(function(count) {
            // Save the count
            bookCount = count;
            // Find the number of pages
            pages = Math.floor(count / pageLimit) + 1;    
            
            return Book.find(criteria)
                .sort('-price')
                .limit(pageLimit)
                .skip(offset)
                .exec();
        })
        .then(function(data) {
            let books = {
                books: data,
                pages: pages,
                totalBooks: bookCount,
                currentPage: currentPage
            };

            return res.json(books);
        })
        .catch(function(err) {
            return res.status(500).send({
                message: err
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
        })
        .catch(function(err) {
            return next(err);
        });
};