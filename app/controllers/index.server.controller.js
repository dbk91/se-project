// Invoke 'strict' Javascript mode
'use strict';

// Create the render controller method
exports.render = function(req, res) {
    // Initialize the display cart
    let cart = { items: [], total: 0 };

    if (req.session.cart) {
        for (let book in req.session.cart) {
            cart.items.push(book);
            cart.total += book.price;
        }
    }

    res.render('index', {
        title: 'Software Engineering - CMSC 447',
        user: JSON.stringify(req.user),
        cart: JSON.stringify(cart)
    });
};
