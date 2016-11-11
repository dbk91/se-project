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

BooksController.$inject = ['$scope', 'BooksService'];

function BooksController($scope, BooksService) {
    $scope.letterLimit = 100;

    $scope.find = function() {
        $scope.books = BooksService.query();
    };
}