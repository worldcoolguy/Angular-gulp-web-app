(function () {
    'use strict';

    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
                function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

                $stateProvider
                    .state('login', {
                        url: '/login',
                        templateUrl: 'app/login/register.html',
                        controller: 'RegisterController',
                        controllerAs: 'registerCtrl'
                    })
                    .state('main', {
                        url: '/main',
                        templateUrl: 'app/home/main.html',
                        controller: 'MainController',
                        controllerAs: 'mainCtrl'
                    })
                    .state('service', {
                        url: '/service',
                        templateUrl: 'app/home/service.html',
                        controller: 'ServiceController',
                        controllerAs: 'serviceCtrl'
                    })
                    .state('branch', {
                        url: '/branch',
                        templateUrl: 'app/booking/branch.html',
                        controller: 'BranchController',
                        controllerAs: 'branchCtrl'
                    })
                    .state('sector', {
                        url: '/sector',
                        templateUrl: 'app/ticket/sector.html',
                        controller: 'SectorController',
                        controllerAs: 'sectorCtrl'
                    })
                    .state('booking', {
                        url: '/booking',
                        templateUrl: 'app/booking/booking.html',
                        controller: 'BookingController',
                        controllerAs: 'bookingCtrl'
                    })
                    .state('bookings', {
                        url: '/bookings',
                        templateUrl: 'app/booking/bookings.html',
                        controller: 'BookingsController',
                        controllerAs: 'bookingsCtrl'
                    })
                    .state('ticket', {
                        url: '/ticket',
                        templateUrl: 'app/ticket/ticket.html',
                        controller: 'TicketController',
                        controllerAs: 'ticketCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'googlemap'
                                ]);
                            }]
                        }
                    })
                    .state('ticketsummary', {
                        url: '/ticketsummary',
                        templateUrl: 'app/ticket/ticketsummary.html',
                        controller: 'TicketSummaryController',
                        controllerAs: 'ticketSummaryCtrl'
                    })
                    .state('tickets', {
                        url: '/tickets',
                        templateUrl: 'app/ticket/tickets.html',
                        controller: 'TicketsController',
                        controllerAs: 'ticketsCtrl'
                    });

                $urlRouterProvider
                    .when('/', '/login')
                    .otherwise('/login');
            }
        ]);
})();
