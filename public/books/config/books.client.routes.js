/**
 * books.client.routes.js
 * ----------------------
 *
 * This file contains the route provider definitions for
 * the 'books' portion of the client-side Angular application.
 *
 */

 // Invoke 'strict' JavaScript mode
'use strict';

angular.module('books')
       .config(config);

config.$inject = ['$routeProvider'];

function config($routeProvider) {
    $routeProvider
        .when('/books', {
            templateUrl: 'books/views/books.list.client.view.html'
        })
        .when('/books/:bookId', {
            templateUrl: 'books/views/books.read.client.view.html'
        });
}