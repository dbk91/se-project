/*
 * users.client.controller.js
 * --------------------------
 * 
 * This file contains the front-end controller for the
 * users. Any methods ranging from registering to editing
 * account information are handled here.
 *
 */

// Invoke 'stict' Javascript mode
'use strict';

angular.module('users')
       .controller('UsersController', UsersController);

UsersController.$inject = ['$scope', '$location', '$http', '$filter', 'Authentication', 'UserService'];

function UsersController($scope, $location, $http, $filter, Authentication, UserService) {
    // Bind the controller to a variable
    let vm = this;

    // Initialize the controller variables
    vm.authentication = Authentication;

    // Initialize scope variables
    $scope.success = null;
    // Variable to control form inputs
    $scope.disable = false;

    // Define the method for submitting registration form
    $scope.register = function() {
        // Disable the form on submission
        $scope.disable = true;

        // Get the user data from the registration form
        let user = new UserService({
            email: this.email,
            password: this.password,
            name: {
                first: this.firstName,
                last: this.lastName
            }
        });

        // Clear the fields
        $scope.errors = null;

        // Attempt to save the new user
        user.$register(function(response) { // Success callback
            // To show success message
            $scope.success = true;
            // Assign the return message and display in DOM
            $scope.message = response.message;
            $scope.disable = false;
        }, function(errorResponse) { // Failure callback
            // Multiple errors on the form submission
            if (errorResponse.data.errors) {
                // Assign the respective error messages
                $scope.errors = errorResponse.data.errors;
            // Single error message
            } else {
                // To show failure message
                $scope.success = false;
                // Server error
                $scope.message = errorResponse.data.message;
            }
            // Re-enable the form
            $scope.disable = false;
        });
    };

    $scope.login = function() {
        // Disable the form
        $scope.disable = true;

        // Get the user data from the login form
        let user = new UserService({
            email: this.email,
            password: this.password
        });

        // Clear the error fields
        $scope.errors = null;

        user.$login(function(response) {
            // To show success message
            $scope.success = true;
            // Assign the return message and display in DOM
            $scope.message = response.message;
            $scope.disable = false;
            // Gets the response from the server and binds it to the client
            vm.authentication.user = response.user;
        }, function(errorResponse) { // Failure callback
            // To show failure message
            $scope.success = false;
            // Server error
            $scope.message = errorResponse.data.message;
            // Re-enable the form
            $scope.disable = false;
        });
    };

    /*
    $scope.validateEmail = function(email) {
        return $http({
            url: '/users/validate_email',
            method: 'POST',
            data: { email: email }
        });
    }; */
}