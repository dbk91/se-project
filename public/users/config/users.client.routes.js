// Invoke 'strict' Javascript mode
'use strict';

angular.module('users').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/users/register', {
                templateUrl: 'users/views/register.client.view.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);