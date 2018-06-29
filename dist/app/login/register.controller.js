(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location'];

    /* @ngInject */
    function RegisterController($location) {
        var vm = this;

        activate();

        function activate() {

        }
        vm.selectTypeDocument = null;
        vm.listTypeDocument = [{
          id:1,
          name: 'Cédula'
        },
        {
          id:2,
          name: 'Carné de extranjería'
        }];
        var loadLogin = function() {
          if (localStorage.getItem('loginData')) {
            var login = JSON.parse(localStorage.getItem('loginData'));
            console.log(login.cellphone);
            vm.selectTypeDocument = login.typeDocument;
            vm.document = login.document;
            vm.cellphone = login.cellphone;  
            vm.username = login.username;
          }
        };        

        vm.login = function() {
            var loginData = {
              typeDocument : vm.selectTypeDocument,
              document : vm.document,
              cellphone : vm.cellphone,
              customer_id : vm.selectTypeDocument.id + "-" + vm.document,
              username : vm.username
            };            
            var $captcha = $( '#recaptcha' );
            var response = grecaptcha.getResponse();
            if (response.length === 0) {
              $( '.msg-error').text( "Por favor, compruebe" );
              if( !$captcha.hasClass( "error" ) ){
                $captcha.addClass( "error" );
              }
            } else {
              $( '.msg-error' ).text('');
              $captcha.removeClass( "error" );
              localStorage.setItem('loginData', JSON.stringify(loginData));
              $location.url('/main');
            }            
        };
        loadLogin();
    }
})();
