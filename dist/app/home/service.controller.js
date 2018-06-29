(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('ServiceController', ServiceController);

    ServiceController.$inject = ['$location', 'MainService', 'Notification', '$rootScope'];

    /* @ngInject */
    function ServiceController($location, MainService, Notification, $rootScope) {
        var vm = this;
        vm.listServices = null;
        vm.optionService = '';

        var getServices = function() {
          $rootScope.$broadcast('preloader:active');
          vm.optionService = localStorage.getItem('userOption');
          var config = JSON.parse(localStorage.getItem('configData'));
          if(vm.optionService === '1'){
            MainService.getServicesTickets(config.channel_id)
            .then(function(data) {
              $rootScope.$broadcast('preloader:hide');
              vm.listServices = data;
              if(data.length === 0){
                Notification.clearAll();
                Notification.warning('No hay servicios registrados.');
              }
            }, function(error) {
              console.error(error);
              $rootScope.$broadcast('preloader:hide');
              Notification.clearAll();
              Notification.error('Error al obtener los servicios');
            });
          } else{
            MainService.getServicesBookings(config.channel_id)
            .then(function(data) {
              $rootScope.$broadcast('preloader:hide');
              vm.listServices = data;
              if(data.length === 0){
                Notification.clearAll();
                Notification.warning('No hay servicios registrados.');
              }
            }, function(error) {
              console.error(error);
              $rootScope.$broadcast('preloader:hide');
              Notification.clearAll();
              Notification.error('Error al obtener los servicios.');
            });
          }
        };

        vm.navigateTo = function(serviceId) {
          localStorage.setItem('serviceId', serviceId);
          if (vm.optionService === '1') {
              $location.url('/ticket');
          } else {
              $location.url('/branch');
          }
        };

        getServices();
    }
})();
