(function() {
    'use strict';

    angular
        .module('app.ticket')
        .service('TicketService', TicketService);

    TicketService.$inject = ['$http', 'appConfig'];

    /* @ngInject */
    function TicketService($http, appConfig) {
        function fInit() {}

        this.function = fInit;

        this.getBranchs = function(service_id) {
            return $http({
                    url: appConfig.main.host + '/branches/',
                    method: 'GET',
                    params: {
                        'limit': 10,
                        'latitude': 9.932507,
                        'longitude': -84.078445,
                        'services': localStorage.getItem('serviceId')
                    }
                })
                .then(
                    function(response) {
                        return response.data;
                    },
                    function(error) {
                        throw error;
                    });
        };

        this.generateTicket = function(inputTicket) {
            return $http({
                    url: appConfig.main.host + '/tickets/',
                    method: 'POST',
                    data: JSON.stringify(inputTicket)
                })
                .then(
                    function(response) {
                        return (response.data);
                    },
                    function(error) {
                        throw error;
                    }
                );
        };

        this.getTickets = function(customer_id) {
            return $http({
                    url: appConfig.main.host + '/tickets/',
                    method: 'GET',
                    params: {
                        'customer_id': customer_id
                    }
                })
                .then(
                    function(response) {
                        return (response.data);
                    },
                    function(error) {
                        throw error;
                    });
        };

        this.getTicket = function(ticket , fields) {
            var params = fields === '' ? {} : {fields: fields};
            console.log("1234123");
            return $http({
                    url: appConfig.main.host + '/tickets/' + ticket.id,
                    method: 'GET',
                    params: params
                })
                .then(
                    function(response) {
                      return response.data;
                    },
                    function(error) {
                      throw error;
                    }
                );
        };

        this.deteleTicket = function(ticket) {
            return $http.delete(appConfig.main.host + '/tickets/' + ticket.id)
                .then(
                    function(response) {
                        return (response.data);
                    },
                    function(error) {
                        throw error;
                    });
        };
    }
})();
