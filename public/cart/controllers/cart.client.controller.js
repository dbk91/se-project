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

CartController.$inject = ['$scope', '$routeParams', '$location', '$ngBootbox', 'Cart', 'CartService', 'UserService'];

function CartController($scope, $routeParams, $location, $ngBootbox, Cart, CartService, UserService) {
    let vm = this;

    vm.cart = Cart;

    // TODO: Methods and method naming are confusing, find a more elegant and
    // RESTful way to delete on book from the cart
    $scope.addToCart = function(book) {
        // Disable the form on submission
        $scope.disable = true;
        // Initialize the cart
        let cart = null;

        if (typeof book === 'undefined') {
            cart = new CartService({
                bookId: $routeParams.bookId,
                add: true // Flag to add to the cart, see note above method
            });
        } else {
            cart = new CartService({
                bookId: book.id,
                add: false
            });
        }
        
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
        // Initialize the Cart service
        let cart = new CartService();
        // Initialize the User service
        let user = new UserService();

        // Fetch the cart information
        cart.$readCart()
            .then(function(response) {
                // Retreive the display cart from the server
                let cart = response.cart;
                // Set the controller cart
                vm.cart = cart;

                // Build the options for the display cart
                let dialogOptions = {
                    templateUrl: 'cart/views/cart.client.view.html',
                    title: '<div class="text-center">Cart</div>',
                    backdrop: true,
                    onEscape: true,
                    scope: $scope, // Not expliciltly stated in the ngBootbox docs, but allows ngBoobox to share Angular's scope
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
                                user.$me()
                                    .then(function(res) {
                                        // Hides the modal and moves user to checkout
                                        // Throws an Angular error in browser console, but still 'works'
                                        $ngBootbox.hideAll();
                                        $location.url('/users/checkout');
                                        return $scope.$apply();
                                    })
                                    .catch(function(err) {
                                        $scope.message = err.data.message;
                                    });

                                return false;
                            }
                        }
                    }
                };

                // Open the cart modal if not on the checkout page
                if ($location.url() != '/users/checkout') {
                    $ngBootbox.customDialog(dialogOptions);
                }
            });
    };

    $scope.deleteCart = function() {
        // Initialize the User service
        cart = new CartService();

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