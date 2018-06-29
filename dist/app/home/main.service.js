(function() {
    'use strict';

    angular
        .module('app.home')
        .service('MainService', MainService);

    MainService.$inject = ['$http', 'appConfig'];

    /* @ngInject */
    function MainService($http, appConfig) {
        this.function = fInit();

        function fInit() {}

        this.getConfig = function() {
            return $http({
                    url: 'config/config.json',
                    method: 'GET'
                })
                .then(function(response) {
                        return (response.data);
                    },
                    function(error) {
                        throw error;
                    });
        };

        this.getServicesTickets = function(channelId) {
            return $http({
                    url: appConfig.main.host + '/tickets/services',
                    method: 'GET',
                    params: {
                        'channel_id': channelId
                    }
                })
                .then(function(response) {
                        return (response.data);
                    },
                    function(error) {
                        throw error;
                    });
        };

        this.getServicesBookings = function(channelId) {
            return $http({
                    url: appConfig.main.host + '/bookings/services',
                    method: 'GET',
                    params: {
                        'channel_id': channelId
                    }
                })
                .then(function(response) {
                        return (response.data);
                    },
                    function(error) {
                        throw error;
                    });
        };
    }
})();
