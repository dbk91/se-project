// Invoke 'stict' Javascript mode
'use strict';

angular.module('home')
       .controller('HomeController', HomeController);

HomeController.$inject = ['$scope', 'Authentication'];

function HomeController($scope, Authentication) {
    $scope.authentication = Authentication;
}