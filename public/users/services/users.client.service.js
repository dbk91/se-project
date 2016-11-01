// Invoke 'strict' JavaScript mode
'use strict';

// Create the user service
angular.module('users').factory('Users', ['$resource', function($resource) {
    // Return the $resource object as a User object
    return $resource('/users/register');
}]);