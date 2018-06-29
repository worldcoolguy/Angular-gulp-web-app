(function() {
    'use strict';

    angular
        .module('app.booking')
        .controller('BookingController', BookingController);

    BookingController.$inject = ['$location', '$timeout', 'BookingService', 'Notification', '$rootScope'];

    /* @ngInject */
    function BookingController($location, $timeout, BookingService, Notification, $rootScope) {
        var vm = this;
        vm.listDays = [];
        vm.listRanges = [];
        vm.selectTime = 0;
        vm.selectDay = 0;

        vm.$onInit = function() {
            loadListTimes();
        };

        var convertDate = function(fecha) {
          var daysNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
          var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
          var date = new Date(fecha);
          return daysNames[date.getDay()]+', '+date.getDate()+' de '+monthNames[date.getMonth()]+' del '+date.getFullYear();
        };

        var getListDays = function(){
          vm.listDays = [];
          if(vm.listTimes !== null && vm.listTimes.length > 0){
            for (var i = 0; i < vm.listTimes.length; i++) {
              var ranges = [];
              for(var j= 0; j < vm.listTimes[i].ranges.length; j++){
                ranges[j] = {
                  start_time: vm.listTimes[i].ranges[j].start_time,
                  end_time: vm.listTimes[i].ranges[j].end_time,
                  hours: 'Desde ' + getHora(vm.listTimes[i].ranges[j].start_time)+ ' Hasta ' +getHora(vm.listTimes[i].ranges[j].end_time)
                };
              }
              vm.listDays[i] = {
                value: convertDate(vm.listTimes[i].day).toLowerCase(),
                display: convertDate(vm.listTimes[i].day),
                ranges: ranges
              };
            }
          } else{
            Notification.clearAll();
            Notification.error('Error al cargar los dias de reserva.');
          }
        };

        var loadListTimes = function() {
            $rootScope.$broadcast('preloader:active');
            vm.listTimes = [];
            var branch = JSON.parse(localStorage.getItem('branchData'));
            var branch_id = branch.id;
            var service_id = localStorage.getItem('serviceId');
            vm.listTimes = BookingService.getDayBooking(branch_id, service_id);
            $rootScope.$broadcast('preloader:hide');
            getListDays();
        };

        vm.selectedItemChange = function() {
          console.log(vm.selectDay);
          vm.listRanges = [];
          vm.selectTime = 0;

          for (var i = 0; i < vm.listDays.length; i++) {
            if(vm.listDays[i].value === vm.selectDay){
              for (var j = 0; j < vm.listDays[i].ranges.length; j++) {
                vm.listRanges[j] = {
                  value:vm.listDays[i].ranges[j].start_time + '*' +vm.listDays[i].ranges[j].end_time,
                  display:vm.listDays[i].ranges[j].hours
                };
              }
              break;
            }
          }
        };

        vm.save = function() {
          if(vm.selectDay !== 0 && vm.selectTime !== 0){
            $rootScope.$broadcast('preloader:active');
            var branch = JSON.parse(localStorage.getItem('branchData'));
            var login = JSON.parse(localStorage.getItem('loginData'));
            var config = JSON.parse(localStorage.getItem('configData'));
            var bookingJSON = {
              'channel_id': config.channel_id,
              'branch_id': branch.id,
              'service_id': localStorage.getItem('serviceId'),
              'customer_id': login.customer_id,
              'doc_type': login.typeDocument.id + '',
              'doc_number': login.document,
              'phone': '+51' + login.cellphone,
              'start_time': vm.selectTime.split('*')[0],
              'end_time': vm.selectTime.split('*')[1]
            };

            BookingService.generateBooking(bookingJSON)
            .then(function(response) {
              $rootScope.$broadcast('preloader:hide');
              $location.url('/bookings');
            }, function(error) {
              console.log(error);
              $rootScope.$broadcast('preloader:hide');
              Notification.clearAll();
                if(error.data.type === 'CustomerBookingRestrictionException'){
                  Notification.warning('No puede generar otra reserva para el mismo servicio.');
                } else{
                  Notification.error('Error al generar la reserva.');
                }
            });
          } else{
            Notification.clearAll();
            Notification.warning('Falta seleccionar campos requeridos.');
          }
        };
    }
})();
