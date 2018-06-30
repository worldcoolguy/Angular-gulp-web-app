//format directive.js author by worldcoolguy using angular - Phoneformat

(function () {
    'use strict';

    angular.module('app.login')
        .directive('phoneformat', phoneFormat);

    // add class for specific pages to achieve fullscreen, custom background etc.
    function phoneFormat() {
        var directive = {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                console.log(attr);
                var phoneParse = function (value) {
                    var numbers = value && value.replace(/-/g, "");
                    var regex = attr.phonetype === 'id' ?  /^\d{10}$/ : /^\d{8}$/;
                    if (regex.test(numbers)) {
                        return numbers;
                    }
                        
                    return undefined;
                }
                var phoneFormat = function (value) {
                    console.log(value);return;
                    var numbers = value && value.replace(/-/g,"");
                    var regex = attr.phonetype === 'id' ? /^(\d{2})(\d{4})(\d{4})$/ : /^(\d{4})(\d{4})$/
                    var matches = numbers && numbers.match(regex);
                    
                    if (matches) {
                        return matches[1] + "-" + matches[2] + (attr.phonetype === 'id' ? ("-" + matches[3]) : '');
                    }

                    return undefined;
                }
                ngModelCtrl.$parsers.push(phoneParse);
                ngModelCtrl.$formatters.push(phoneFormat);
                
                element.bind("blur", function () {
                    if (attr.phonetype ==='id'){
                        var value = phoneFormat(element.val().substr(0,10));
                    }else{
                        var value = phoneFormat(element.val().substr(0,8));
                    } 
                    
                    var isValid = !!value;
                    if (isValid) {
                        ngModelCtrl.$setViewValue(value);
                        ngModelCtrl.$render();
                    }

                    ngModelCtrl.$setValidity("phoneformat", isValid);
                    scope.$apply();
                });
            }
        };

        return directive;
    }

})();
