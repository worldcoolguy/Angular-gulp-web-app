(function() {
    'use strict';

    angular
        .module('app.booking')
        .controller('BranchController', BranchController);

    BranchController.$inject = ['$location', 'BookingService', '$rootScope'];

    /* @ngInject */
    function BranchController($location, BookingService, $rootScope) {
        var vm = this;

        activate();

        function activate() {
        }

        vm.listBranchs = null;
        var getBranchs = function() {
            $rootScope.$broadcast('preloader:active');
            var customer_id = JSON.parse(localStorage.getItem('loginData')).customer_id;
            BookingService.getBranchs(customer_id,"")
                .then(function(data) {
                    $rootScope.$broadcast('preloader:hide');
                    vm.listBranchs = data;
                },
                function(error) {
                  console.log(error);
                  $rootScope.$broadcast('preloader:hide');
                  Notification.clearAll();
                  Notification.error('Error al obtener las Agencias.');
              });
        };

        vm.navigateTo = function(branch, event) {
            localStorage.setItem('branchData', JSON.stringify(branch));
            $location.url('/booking');
        };

        getBranchs();
    }
})();
