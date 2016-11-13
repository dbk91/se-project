// Invoke 'strict' JavaScript mode
'use strict';

angular.module('users')
       .directive('emailValidator', emailValidator);

function emailValidator() {
    const EMAIL_REGEX = /.+\@umbc+\.edu/;

    let directive = {
        require: 'ngModel',
        restrict: 'A',
        transclude: true,
        link: link
    };

    return directive;

    function link(scope, element, attrs, ctrl) {
        ctrl.$validators.email = function(value) {
            if (EMAIL_REGEX.test(value)) {
                element.removeClass('invalid-input');
                element.addClass('valid-input');
                return true;
                /*  ** TODO: Implement UMBC directory request to validate e-mail
                scope.validateEmail(value)
                     .success(function(data, status, headers, config) {
                        element.removeClass('invalid-input');
                        element.addClass('valid-input');
                        
                     })
                     .error(function(data, status, headers, config) {

                     });
                 */
            } else if (ctrl.$isEmpty(value)) {
                element.removeClass('valid-input');
                element.removeClass('invalid-input');
            } else {
                element.removeClass('valid-input');
                element.addClass('invalid-input');
            }
            
            return false;
        }
    }
}