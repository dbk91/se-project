/*
 * books.client.controller.js
 * --------------------------
 * 
 * This file contains the front-end controller for the
 * books. Any methods ranging from registering to editing
 * account information are handled here.
 *
 */

// Invoke 'stict' Javascript mode
'use strict';

angular.module('books')
       .controller('BooksController', BooksController);

BooksController.$inject = ['$scope', '$routeParams', 'Authentication', 'BooksService'];

function BooksController($scope, $routeParams, Authentication, BooksService) {
    let vm = this;

    vm.authentication = Authentication;

    $scope.find = function(page) {
        let booksService = new BooksService({
            title: this.title,
            page: page
        });

        booksService.$list()
            .then(function(response) {
                $scope.books = response.books;
                $scope.pages = new Array(response.pages);
                $scope.total = response.totalBooks;
                $scope.currentPage = response.currentPage;
            }, function(errorResponse) {
                console.log(errorResponse);
            });
    };

    $scope.findOne = function() {
        $scope.book = BooksService.get({
            bookId: $routeParams.bookId
        });
    };

    $scope.createBook = function() {
        // Disable the form on submission
        $scope.disable = true;

        // Get the data from the form
        let book = new BooksService({
            title: this.title,
            price: this.price,
            description: this.description
        });

        book.$save()
            .then(function(response) {
                // To show success message
                $scope.success = true;
                // Assign the return message and display in DOM
                $scope.message = response.message;
                $scope.disable = false;
            }, function(errorResponse) {
                // Multiple errors on the form submission
                if (errorResponse.data.errors) {
                    // Assign the respective error messages
                    $scope.errors = errorResponse.data.errors;
                // Single error message
                } else {
                    // To show failure message
                    $scope.success = false;
                    // Server error
                    $scope.message = errorResponse.data.message;
                }
                // Re-enable the form
                $scope.disable = false;
            });
    };
}