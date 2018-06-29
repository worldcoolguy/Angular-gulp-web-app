(function() {
    'use strict';

    angular
        .module('app.ticket')
        .controller('TicketController', TicketController);

    TicketController.$inject = ['NgMap', '$location', 'TicketService', 'Notification', '$rootScope'];

    /* @ngInject */
    function TicketController(NgMap, $location, TicketService, Notification, $rootScope) {
        var vm = this;
        vm.listBranchs = [];
        vm.branch = vm.listBranchs[0];

        NgMap.getMap('gmap').then(function(map) {
             
            vm.map = map;

        }).catch(function(map) {
            console.error('map error: ', map);
        });

        var getBranchs = function() {
           
          $rootScope.$broadcast('preloader:active');

            TicketService.getBranchs()
            .then(function(data) {
              $rootScope.$broadcast('preloader:hide');
                        vm.listBranchs = data;
                        for (var i = 0; i < vm.listBranchs.length; i++) {
                            if (vm.listBranchs[i].status === 'INACTIVE') {
                                vm.listBranchs[i].icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
                            } else {
                                if (vm.listBranchs[i].congestion === 'LOW') {
                                    vm.listBranchs[i].icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                                } else if (vm.listBranchs[i].congestion === 'MEDIUM') {
                                    vm.listBranchs[i].icon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
                                } else {
                                    vm.listBranchs[i].icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                                }
                            }
                        }
                    },
                    function(error) {
                        console.log(error);
                        $rootScope.$broadcast('preloader:hide');
                        Notification.clearAll();
                        Notification.error('Error al obtener las agencias!');
                    });
        };

        vm.showDetail = function(e, branch) {
            vm.branch = branch;
            // console.log(vm.branch);
            vm.map.showInfoWindow('foo-iw', branch.id);
        };

        var hideDetail = function() {
            vm.map.hideInfoWindow('foo-iw');
        };

        vm.clicked = function(branch) {
            hideDetail();
            $rootScope.$broadcast('preloader:active');
            if (branch.sectors.length > 1) {
                localStorage.setItem('branchData', JSON.stringify(branch));
                $location.url('/sector');
            } else {
                var login = JSON.parse(localStorage.getItem('loginData'));
                var config = JSON.parse(localStorage.getItem('configData'));
                console.log(login.document+"---"+login.cellphone);
                var inputTicket = {
                    'channel_id': config.channel_id,
                    'branch_id': branch.id,
                    'sector_id': branch.sectors[0].id,
                    'service_id': localStorage.getItem('serviceId'),
                    'status': 'ENABLED',
                    'customer_id': login.customer_id,
                    'doc_type': login.typeDocument.id + "",
                    'doc_number': login.document,
                    'phone': '+51' + login.cellphone
                };

                TicketService.generateTicket(inputTicket)
                    .then(function(data) {
                            $rootScope.$broadcast('preloader:hide');
                            localStorage.setItem('ticketData', JSON.stringify(data));
                            $location.url('/ticketsummary');
                        },
                        function(error) {
                          console.log(error);
                          $rootScope.$broadcast('preloader:hide');
                          Notification.clearAll();
                            if (error.data.type === "CustomerTicketRestrictionException") {
                                Notification.warning('No puede generar otro ticket para el mismo servicio.');
                            } else {
                                Notification.error('Error al generar ticket!');
                            }
                        });
            }
        };

        getBranchs();
    }
})();
