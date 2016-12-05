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

config.$inject = ['$routeProvider']

function config($routeProvider) {
    $routeProvider
        .when('/users/register', {
            templateUrl: 'users/views/register.client.view.html'
        })
        .when('/users/me', {
            templateUrl: 'users/views/account.client.view.html',
            resolve: {
                userResolve: getUser
            }
        })
        .when('/users/checkout', {
            templateUrl: 'users/views/checkout.client.view.html',
            resolve: {
                userResolve: getUser
            }
        })
        .when('/users', {
            templateUrl: 'users/views/list.client.view.html'
        });

    getUser.$inject = ['UserService'];

    function getUser(UserService) {
        let user = new UserService();
        // Really hacky way of resolving/rejecting the promises using ES6 Native promises
        // TODO: Change the promise structure of accessing user object
        return new Promise(function(resolve, reject) {
            user.$me()
                .then(function(res) {
                    resolve(res.user);
                })
                .catch(function(err) {
                    reject(err.data.message);
                });
        });
    }
}