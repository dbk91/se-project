/**
 * users.client.routes.js
 * ----------------------
 *
 * This file contains the route provider definitions for
 * the 'users' portion of the client-side Angular application.
 *
 */

// Invoke 'strict' JavaScript mode
'use strict';

angular.module('users')
       .config(config);

function config($routeProvider) {
    $routeProvider
        .when('/users/register', {
            templateUrl: 'users/views/register.client.view.html'
        })
        .when('/users/me', {
            templateUrl: 'users/views/account.client.view.html'
        })
        .when('/users', {
            templateUrl: 'users/views/list.client.view.html'
        });
}