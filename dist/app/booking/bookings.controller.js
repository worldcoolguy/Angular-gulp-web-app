(function() {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingsController', BookingsController);

    BookingsController.$inject = ['$location', '$mdDialog', 'BookingService', 'Notification', '$rootScope'];

    /* @ngInject */
    function BookingsController($location, $mdDialog, BookingService, Notification, $rootScope) {
        var vm = this;
        vm.listBranchs = null;

        vm.$onInit = function() {
            calcularScreen();
            getListBranchs();
        };

        var getListBranchs = function() {
            $rootScope.$broadcast('preloader:active');
            var customer_id = JSON.parse(localStorage.getItem('loginData')).customer_id;
            var fields = "";
            BookingService.getBookings(customer_id, fields).then(
                function(data) {
                    $rootScope.$broadcast('preloader:hide');
                    if (data.length > 0) {
                      vm.listBranchs = data;
                    }else {
                      vm.listBranchs = null;
                    }
                },
                function(error) {
                  console.log(error);
                  $rootScope.$broadcast('preloader:hide');
                  Notification.clearAll();
                  Notification.error('Error al obtener las reservas.');
                });
        };

        vm.getFechBookings = function(fecha){
          return getFecha(fecha);
        };

        vm.getHoraBookings = function(fecha){
          return getHora(fecha);
        };

        vm.addBooking = function() {
            localStorage.setItem('userOption', '0');
            $location.url('/service');
        };

        vm.cancelBooking = function(ev, booking) {
            var confirm = $mdDialog.confirm()
                .title('Desea cancelar la Reserva?')
                .targetEvent(ev)
                .ok('Si')
                .cancel('No');
            $mdDialog.show(confirm).then(function() {
                $rootScope.$broadcast('preloader:active');
                BookingService.deleteBooking(booking).then(function(data) {
                    $rootScope.$broadcast('preloader:hide');
                    getListBranchs();
                }, function(error) {
                    console.log(error);
                    $rootScope.$broadcast('preloader:hide');
                    Notification.clearAll();
                    Notification.error('Error al anular la reserva.');
                });
            }, function() {
                Notification.clearAll();
            });
        };

        var calcularScreen = function() {
            var widthScreen = parseInt(window.innerWidth);
            if (widthScreen <= 400) {
                vm.Screen = ["col-xs-12"];
            } else if (widthScreen >= 401 && widthScreen <= 520) {
                vm.Screen = ["col-xs-offset-1", "col-xs-10"];
            } else if (widthScreen >= 521 && widthScreen <= 767) {
                vm.Screen = ["col-xs-offset-2", "col-xs-8"];
            } else if (widthScreen >= 768 && widthScreen <= 890) {
                vm.Screen = ["col-xs-offset-1", "col-xs-10"];
            } else if (widthScreen >= 891 && widthScreen <= 1100) {
                vm.Screen = ["col-xs-offset-2", "col-xs-8"];
            } else if (widthScreen >= 1101 && widthScreen <= 1360) {
                vm.Screen = ["col-xs-offset-3", "col-xs-6"];
            } else if (widthScreen >= 1361) {
                vm.Screen = ["col-xs-offset-4", "col-xs-4"];
            }
        };
    }
})();
