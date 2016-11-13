/*
 * users.client.service.js
 * -----------------------
 *
 * This file contains the methods for the User Service.
 * The main function returns a singleton to be used for
 * making calls to the server's API.
 *
 */

// Invoke 'strict' JavaScript mode
'use strict';

// Create the user service
angular.module('users')
       .factory('UserService', UserService);

UserService.$inject = ['$resource'];

function UserService($resource) {
    // Describe the user service as a $resource object
    let Users = $resource('/api/users', {}, {
                    register: {
                        method: 'POST',
                        url: '/api/users'
                    },
                    login: {
                        method: 'POST',
                        url: '/api/users/login'
                    }
                });

    // Return the Users service as a $resource object
    return Users;
}