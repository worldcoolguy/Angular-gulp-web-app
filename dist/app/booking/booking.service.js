(function() {
    'use strict';

    angular
        .module('app.booking')
        .service('BookingService', BookingService);

    BookingService.$inject = ['$http', 'appConfig'];

    /* @ngInject */
    function BookingService($http, appConfig) {

        this.getBookings = function(customer_id, fields) {
            fields = (fields !== null && fields !== "") ? fields : '';
            return $http({
                url: appConfig.main.host + '/bookings/',
                method: 'GET',
                data: null,
                params: {
                    customer_id: customer_id
                }
            }).then(function(response) {
                return response.data;
            }, function(error) {
                throw error;
            });
        };

        this.getBooking = function(booking_id) {
            return $http({
                    "method": "get",
                    "url": appConfig.main.host + '/bookings/' + booking_id,
                    "headers": {
                        "accept": "application/json",
                        "content-type": "text/plain"
                    },
                    "data": null,
                    "params": {}
                })
                .then(
                    function (response) {
                       return response.data;
                    },
                    function (error) {
                      throw error;
                    }
                );
        };

        this.generateBooking = function(bookingJSON) {
            return $http({
                    method: "POST",
                    url: appConfig.main.host + '/bookings/',
                    headers: {
                        "accept": "application/json",
                        "content-type": "application/json"
                    },
                    data: bookingJSON,
                    params: {}
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

        this.getBranchs = function(customer_id, fields) {
            fields = (fields !== null && fields !== "") ? fields : '';
            return $http({
                url: appConfig.main.host + '/branches/',
                method: 'GET',
                data: {},
                params: {
                    customer_id: customer_id,
                    "limit": 10
                }
            }).then(
                function(response) {
                    return (response.data);
                },
                function(error) {
                    throw error;
                });
        };

        this.getDayBooking = function(branch_id, service_id) {
            var listDays = [];
            $.ajax({
                async: false,
                type: 'GET',
                url: appConfig.main.host + "/bookings/days",
                data: {
                    "branch_id": branch_id,
                    "service_id": service_id,
                    "limit": 10
                },
                success: function(data) {
                    listDays = data;
                },
                error: function(error) {
                    throw error;
                }
            });

            return listDays;
        };

        this.deleteBooking = function(booking) {
            return $http.delete(appConfig.main.host + "/bookings/" + booking.id)
                .then(
                    function(response) {
                        return response;
                    },
                    function(error) {
                        throw error;
                    }
                );
        };
    }
})();
