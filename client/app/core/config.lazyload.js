(function () {
    'use strict';

    angular.module('app')
        .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                debug: false,
                events: false,
                modules: [
                    {
                        name: 'fontawesome',
                        files: [
                            'bower_components/font-awesome/css/font-awesome.css'
                        ]
                    },
                    {
                        name: 'weather-icons',
                        files: [
                            'bower_components/weather-icons/css/weather-icons.min.css'
                        ]
                    },
                    {
                        name: 'googlemap',
                        files: [                            
                            'bower_components/ngmap/build/scripts/ng-map.min.js'
                        ]
                    }
                ]
            });
        }]
    );

})();
