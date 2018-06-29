(function() {
    'use strict';

    angular
        .module('app.ticket')
        .controller('TicketSummaryController', TicketSummaryController);

    TicketSummaryController.$inject = ['$location', '$mdDialog', 'Notification', 'TicketService', '$rootScope'];

    /* @ngInject */
    function TicketSummaryController($location, $mdDialog, Notification, TicketService, $rootScope) {
        var vm = this;
        vm.updateTimer = "";
        vm.printTicket = null;
        vm.Screen = [];
        vm.ticket = null;

        vm.$onInit = function() {
            calcularScreen();
            loadTicket();
        };

        var loadTicket = function() {
          $rootScope.$broadcast('preloader:active');
            if (localStorage.getItem('ticketData')) {
                var ticket = JSON.parse(localStorage.getItem('ticketData'));
                vm.printTicket = ticket.print;
                vm.ticket = ticket;
            } 
           /* TicketService.getTicket(ticket, "status")
            .then(function(data) {
                $rootScope.$broadcast('preloader:hide');
                if (data.status !== 'WAITING') {
                    $location.url('/tickets');
                }
            }, function(error) {
                console.error(error);
                $rootScope.$broadcast('preloader:hide');
                Notification.clearAll();
                if (error.status === 404) {
                    Notification.warning('Ticket no disponible.');
                    $location.url('/tickets');
                } else {
                    Notification.error('Error al obtener ticket.');
                }
            });
        */
        };

        vm.showTimer = function($event, ticket) {
            vm.updateTimer = 'fa-spin';
            $rootScope.$broadcast('preloader:active');
            var fields = "position,low_estimated_time,high_estimated_time,status";
            TicketService.getTicket(ticket, fields)
            .then(function(data) {
                $rootScope.$broadcast('preloader:hide');
                if (data.status !== 'WAITING') {
                    $location.url('/tickets');
                }
                vm.ticket.position = data.position;
                vm.ticket.low_estimated_time = data.low_estimated_time;
                vm.ticket.high_estimated_time = data.high_estimated_time;
                vm.updateTimer = '';
            }, function(error) {
                console.error(error);
                $rootScope.$broadcast('preloader:hide');
                Notification.clearAll();
                if (error.status === 404) {
                    Notification.warning('Ticket no disponible.');
                    $location.url('/tickets');
                } else {
                    Notification.error('Error al actualizar ticket.');
                }
                vm.updateTimer = '';
            });
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
                  $location.url('/tickets');
                }, function(error) {
                    console.error(error);
                    $rootScope.$broadcast('preloader:hide');
                    Notification.clearAll();
                    if (error.status === 404) {
                        Notification.warning('Ticket no disponible.');
                        $location.url('/tickets');
                    }else if(error.data.type === 'CancellationOfTicketNotAllowedException'){
                        Notification.warning('No se puede cancelar el Ticket.');
                        $location.url('/tickets');
                    } else {
                        Notification.error('Error al cancelar ticket.');
                    }
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
