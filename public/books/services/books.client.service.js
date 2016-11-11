/*
 * books.client.service.js
 * -----------------------
 *
 * This file contains the methods for the User Service.
 * The main function returns a singleton to be used for
 * making calls to the server's API.
 *
 */

// Invoke 'strict' JavaScript mode
'use strict';

angular.module('books')
       .factory('BooksService', BooksService);

BooksService.$inject = ['$resource'];

function BooksService($resource) {
    let Books = $resource('/books');

    return Books;
}