(function() {
    'use strict';

    angular
        .module('app.ticket')
        .controller('TicketsController', TicketsController);

    TicketsController.$inject = ['$location', '$mdDialog', 'TicketService', 'Notification', '$rootScope'];

    /* @ngInject */
    function TicketsController($location, $mdDialog, TicketService, Notification, $rootScope) {
        var vm = this;
        vm.listTickets = null;
        vm.Screen = [];
        vm.updateTimer = '';

        vm.$onInit = function() {
            calcularScreen();
            getTickets();
        };

        var getTickets = function() {
            $rootScope.$broadcast('preloader:active');
            var login = JSON.parse(localStorage.getItem('loginData'));
            TicketService.getTickets(login.customer_id)
                .then(function(data) {
                        $rootScope.$broadcast('preloader:hide');
                        if (data.length > 0) {
                            vm.listTickets = data;
                        } else {
                            vm.listTickets = null;
                        }
                    },
                    function(error) {
                      console.error(error);
                      $rootScope.$broadcast('preloader:hide');
                        Notification.clearAll();
                        Notification.error('Error al obtener los tickets.');
                    });
        };

        vm.addTicket = function() {
            localStorage.setItem('userOption', '1');
            $location.url('/service');
        };

        vm.cancelTicket = function(ev, ticket) {
            var confirm = $mdDialog.confirm()
                .title('Desea cancelar el Ticket?')
                .targetEvent(ev)
                .ok('Si')
                .cancel('No');
            $mdDialog.show(confirm).then(function() {
                $rootScope.$broadcast('preloader:active');
                TicketService.deteleTicket(ticket)
                .then(function(data) {
                  $rootScope.$broadcast('preloader:hide');
                    getTickets();
                }, function(error) {
                    console.error(error);
                    $rootScope.$broadcast('preloader:hide');
                    Notification.clearAll();
                    if (error.status === 404) {
                        Notification.warning('Ticket no disponible.');
                    } else {
                        Notification.error('Error al cancelar ticket.');
                    }
                    getTickets();
                });
            }, function() {
                Notification.clearAll();
            });
        };

        vm.showTimer = function($event, ticket) {
            vm.updateTimer = 'fa-spin';
            $rootScope.$broadcast('preloader:active');
            var fields = "position,low_estimated_time,high_estimated_time,status";
            TicketService.getTicket(ticket, fields)
            .then(function(data) {
                $rootScope.$broadcast('preloader:hide');
                ticket.position = data.position;
                ticket.low_estimated_time = data.low_estimated_time;
                ticket.high_estimated_time = data.high_estimated_time;
                ticket.status = data.status;
                vm.updateTimer = '';
            }, function(error) {
              console.error(error);
                $rootScope.$broadcast('preloader:hide');
                Notification.clearAll();
                if (error.status === 404) {
                    Notification.warning('Ticket no disponible.');
                } else {
                    Notification.error('Error al actualizar ticket.');
                }
                vm.updateTimer = '';
                getTickets();
            });
        };

        var calcularScreen = function() {
            var widthScreen = parseInt(window.innerWidth);
            if (widthScreen <= 400) {
                vm.Screen = ['col-xs-12'];
            } else if (widthScreen >= 401 && widthScreen <= 520) {
                vm.Screen = ['col-xs-offset-1', 'col-xs-10'];
            } else if (widthScreen >= 521 && widthScreen <= 767) {
                vm.Screen = ['col-xs-offset-2', 'col-xs-8'];
            } else if (widthScreen >= 768 && widthScreen <= 890) {
                vm.Screen = ['col-xs-offset-1', 'col-xs-10'];
            } else if (widthScreen >= 891 && widthScreen <= 1100) {
                vm.Screen = ['col-xs-offset-2', 'col-xs-8'];
            } else if (widthScreen >= 1101 && widthScreen <= 1360) {
                vm.Screen = ['col-xs-offset-3', 'col-xs-6'];
            } else if (widthScreen >= 1361) {
                vm.Screen = ['col-xs-offset-4', 'col-xs-4'];
            }
        };
    }
})();
