// Invoke 'strict' Javascript mode
'use strict';

// Create the cart service
angular.module('cart')
       .factory('Cart', Cart);

Cart.$inject = ['$window'];

function Cart($window) {
    // Initialize the cart
    let cart = $window.cart;

    return cart;
}