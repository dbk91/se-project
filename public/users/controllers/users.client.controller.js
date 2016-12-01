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

UsersController.$inject = ['$scope', '$location', '$ngBootbox', 'Authentication', 'UserService'];

function UsersController($scope, $location, $ngBootbox, Authentication, UserService) {
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

    $scope.promptLogin = function() {
        // Set the dialog options
        let dialogOptions = {
            templateUrl: 'users/views/login.client.view.html',
            title: '<div class="text-center">Login</div>',
            backdrop: true,
            onEscape: true,
            scope: $scope
        };

        // Open the login modal
        $ngBootbox.customDialog(dialogOptions);
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

        user.$login()
            .then(function(res) {
                // Apply success attribute
                $scope.success = true;
                // Assign the return message and display in DOM
                $scope.message = res.message;
                // Clear the fields
                $scope.email    = '';
                $scope.password = '';
                $scope.disable = false;
                // Get the response from the server and binds it to the client
                vm.authentication.user = res.user;
                // Wait to close login modal
                setTimeout(function() {
                    $ngBootbox.hideAll();
                    $scope.message = '';
                }, 450);
            })
            .catch(function(err) {
                // Apply failure attribute
                $scope.success = false;
                // Get response
                $scope.message = err.data.message;
                // Re-enable the form
                $scope.disable = false;
            });
    };
}