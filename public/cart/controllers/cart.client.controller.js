/*
 * cart.client.controller.js
 * --------------------------
 * 
 * This file contains the front-end controller for the
 * cart. This includes methods such as updating and deleting
 * items from the cart.
 *
 */

// Invoke 'stict' Javascript mode
'use strict';

angular.module('cart')
       .controller('CartController', CartController);

CartController.$inject = ['$scope', '$routeParams', '$filter', 'Cart', 'CartService'];

function CartController($scope, $routeParams, $filter, Cart, CartService) {
    let vm = this;

    vm.cart = Cart;

    vm.buildCart = function(cart) {
        // Construct the beginning of the display cart atble
        let message = `<table class="table table-hover">
                        <thead>
                            <tr>
                                <th class="raleway">Title</th>
                                <th class="raleway">Price</th>
                                <th class="raleway">Quantity</th>
                                <th class="raleway">Remove</th>
                            </tr>
                        </thead>`;

        if (cart.items.length > 0) {
            // Iterate through each item in the display cart
            for (let book in cart.items) {
                book = cart.items[book];
                // Limit the number of characters displayed and add an ellipses if truncated
                let title = `${$filter('limitTo')(book.title, 40)}${book.title.length > 40 ? '...' : ''}`;
                // Apply currency filter to the book price
                let price = $filter('currency')(book.price);

                // Construct the book row
                message += `<tr>
                                <td class="raleway">${title}</td>
                                <td class="raleway">${price}</td>
                                <td class="text-center raleway">${book.qty}</td>
                                <td class="text-center">&times</td>
                            </tr>`;
            }
        } else {
            // Display no items
            message += `<tr><td colspan=4 class="text-center raleway" style="border-bottom: none;">No items in cart.</td>`;
        }

        // End of inner-content table
        message += '</table>';

        // Apply the currency fitler to the total
        let total = $filter('currency')(cart.total);
        message += `<div class="text-right"><h3>Total: ${total}</h3></div>`;

        return message;
    }

    $scope.addToCart = function() {
        // Disable the form on submission
        $scope.disable = true;
        
        // Get the book ID
        let cart = new CartService({
            bookId: $routeParams.bookId
        });

        cart.$addToCart()
            .then(function(res) {
                // To show success message
                $scope.success = true;
                // Update the cart
                return cart.$readCart();
            })
            .then(function(res) {
                // Replace the controller's cart
                vm.cart = res.cart;
            })
            .catch(function(errorResponse) {
                $scope.success = false;
                console.error(errorResponse);
            })
            .finally(function() {
                // Re-enable the form
                $scope.disable = false;
            });
    };

    $scope.readCart = function() {
        // Intialize the User service
        let user = new CartService();
        
        // Fetch the cart information
        user.$readCart()
            .then(function(response) {
                // Retreive the display cart from the server
                let cart = response.cart;
                // Build the display cart
                let message = vm.buildCart(cart);

                // Create the Bootstrap modal
                bootbox.dialog({
                    backdrop: true,
                    onEscape: true,
                    size: 'medium',
                    title: 'Cart',
                    message: message,
                    buttons: {
                        clear: {
                            label: 'Clear Cart',
                            callback: function() { 
                                return $scope.deleteCart();
                            }
                        },
                        confirm: {
                            label: 'Checkout',
                            callback: function() {
                                console.log('go to checkout');
                            }
                        }
                        
                    }
                });
            });
    };

    $scope.deleteCart = function() {
        // Initialize the User service
        let cart = new CartService();

        // Delete items in the cart
        cart.$deleteCart()
            .then(function(res) {
                if (res.success)
                    return cart.$readCart();
            })
            // Update the cart
            .then(function(res) {
                // Fetch the cart and set it to the controller's cart
                vm.cart = res.cart;
            })
            .catch(function(err) {
                console.error('An error occurred.');
            });
    };
}