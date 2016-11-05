// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Authentication' service
angular.module('users')
       .factory('Authentication', Authentication);

Authentication.$inject = ['$window'];

function Authentication($window) {
    let auth = {
        user: $window.user
    };

    return auth;
}