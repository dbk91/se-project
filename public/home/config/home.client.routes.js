// Invoke 'strict' Javascript mode
'use strict';

angular.module('home')
       .config(config);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home/views/home.client.view.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}