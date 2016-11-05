// Invoke 'strict' JavaScript mode
'use strict';

angular.module('users')
       .config(config);

function config($routeProvider) {
    $routeProvider
        .when('/users/register', {
            templateUrl: 'users/views/register.client.view.html'
        })
        .when('/users/:id', {
            templateUrl: 'users/views/account.client.view.html'
        })
        .when('/users', {
            templateUrl: 'users/views/list.client.view.html'
        });
}