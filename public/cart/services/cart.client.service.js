/*
 * cart.client.service.js
 * -----------------------
 *
 * This file contains the methods for the Cart Service.
 *
 */

// Invoke 'strict' JavaScript mode
'use strict';

// Create the user service
angular.module('cart')
       .factory('CartService', CartService);

CartService.$inject = ['$resource'];

function CartService($resource) {
    // Describe the cart service as a $resource object
    let Cart = $resource('/api/cart', {}, {
                    readCart: {
                        method: 'GET',
                        url: '/api/cart'
                    },
                    addToCart: {
                        method: 'PUT',
                        url: '/api/cart/'
                    },
                    deleteCart: {
                        method: 'DELETE',
                        url: '/api/cart'
                    }
                });

    // Return the Cart service as a $resource object
    return Cart;
}