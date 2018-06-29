(function() {
    'use strict';

    angular
        .module('app.ticket')
        .controller('SectorController', sectorController);

    sectorController.$inject = ['$location', '$rootScope'];

    /* @ngInject */
    function sectorController($location, $rootScope) {
        var vm = this;

        function activate() {

        }

        activate();

        vm.listSertors = null;
        var branchID = null;

        var getSectors = function(){
          if (localStorage.getItem('branchData')) {
            var branch = JSON.parse(localStorage.getItem('branchData'));
            branchID = branch.id;
            vm.listSertors = branch.sectors;
          }
        };

        getSectors();
    }
})();
