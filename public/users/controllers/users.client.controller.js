// Invoke 'stict' Javascript mode
'use strict';

angular.module('users')
    .controller('UsersController', 
    ['$scope', '$location', 'Authentication', 'Users',
    function($scope, $location, Authentication, Users) {
        // Initialize scope variables
        $scope.success = null;
        // Variable to control form inputs
        $scope.disable = false;

        // Define the method for submitting registration form
        $scope.register = function() {
            // Disable the form on submission
            $scope.disable = true;

            // Get the user data from the registration form
            let user = new Users({
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
            user.$save(function(response) {
                // To show success message
                $scope.success = true;
                // Assign the return message and display in DOM
                $scope.message = response.message;
                $scope.disable = false;
            }, function(errorResponse) {
                if (errorResponse.data.errors) {
                    // Assign the respective error messages
                    $scope.errors = errorResponse.data.errors;
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
    }
]);