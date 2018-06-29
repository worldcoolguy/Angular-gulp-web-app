(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('MainController', MainController);

    MainController.$inject = ['$location', 'MainService','$rootScope'];

    /* @ngInject */
    function MainController($location, MainService, $rootScope) {
        var vm = this;

        vm.navigateTo = function(to) {
            localStorage.setItem('userOption', to);
            $location.url('/service');
        };

        var getConfig = function() {
          $rootScope.$broadcast('preloader:active');
            MainService.getConfig()
                .then(
                    function(data) {
                      $rootScope.$broadcast('preloader:hide');
                      localStorage.setItem('configData', JSON.stringify(data));
                    },
                    function(error) {
                        console.error(error);
                        $rootScope.$broadcast('preloader:hide');
                    });
        };

        getConfig();
    }
})();
