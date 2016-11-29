/*
 * cart.server.controller.js
 * --------------------------
 *
 * This file contains the methods for the cart
 * controller. Each method maps to a URL and
 * describes how each response should be handled.
 *
 */

// Invoke 'strict' Javascript mode
'use strict';

const mongoose = require('mongoose'),
      Book     = mongoose.model('Book');

exports.readCart = function(req, res) {
    // Instantiate the cart if not defined
    req.session.cart = req.session.cart || {};

    // Initialize the display cart
    let cart = { items: [], total: 0 };

    // If available, populate the display cart
    if (req.session.cart) {
        for (let book in req.session.cart) {
            book = req.session.cart[book];
            cart.items.push(book);
            cart.total += book.price * book.qty;
        }
    }

    return res.status(200).send({
        cart: cart
    });
}

exports.updateCart = function(req, res, next) {
    // Instantiate the cart if not defined
    req.session.cart = req.session.cart || {};
    let cart = req.session.cart;
    // Get the book ID
    let bookId = req.body.bookId;

    // Fetch the book from the database
    Book.findById(bookId)
        .exec()
        .then(function(book) {
            if (!book) {
                return res.status(400).send({
                    message: 'No book was found with the provided identifier.'
                });
            }

            if (cart[bookId]) {
                cart[bookId].qty++;
            } else {
                cart[bookId] = {
                    title: book.title,
                    price: book.price,
                    qty: 1
                }
            }

            return res.status(200).send({
                message: 'Book added to cart!'
            });
        })
        .catch(function(err) {
            return res.status(500).send({
                message: 'An error occurred while adding the book to the cart'
            });
        })
        .finally(next);
}

exports.deleteCart = function(req, res, next) {
    // Instantiate the cart if not defined
    req.session.cart = req.session.cart || {};

    // Check if a book ID was specified
    if (req.body.bookId) {
        let bookId = req.body.bookId;
    // Clear the whole cart if a book was not specified
    } else {
        req.session.cart = {};
        return res.status(200).send({
            success: true
        });
    }
}