(function() {
    'use strict';

    angular.module('app.core')
        .factory('appConfig', [appConfig])
        .config(['$qProvider', providerConfig])
        .config(['$mdThemingProvider', mdConfig])
        .config(['NotificationProvider', notificationConfig])
        .config(['$compileProvider', compileProvider]);

    function appConfig() {
        var date = new Date();
        var year = date.getFullYear();
        var main = {
            brand: 'Tiquete Virtual Banco Popular',
            name: 'BMatic',
            year: year,
            layout: 'wide',                                 
            menu: 'vertical',                               
            isMenuCollapsed: false,                         
            fixedHeader: true,                              
            fixedSidebar: true,                                 
            link: 'https://www.hiper.com.pe/',
            host: 'http://52.35.163.246/api/v1'
        };        

        return {
            main: main
        };
    }

    function providerConfig($qProvider){
      $qProvider.errorOnUnhandledRejections(false);
    }

    function mdConfig($mdThemingProvider) {
        var cyanAlt = $mdThemingProvider.extendPalette('cyan', {
            'contrastLightColors': '500 600 700 800 900',
            'contrastStrongLightColors': '500 600 700 800 900'
        });
        var lightGreenAlt = $mdThemingProvider.extendPalette('light-green', {
            'contrastLightColors': '500 600 700 800 900',
            'contrastStrongLightColors': '500 600 700 800 900'
        });

        $mdThemingProvider
            .definePalette('cyanAlt', cyanAlt)
            .definePalette('lightGreenAlt', lightGreenAlt);

        $mdThemingProvider.theme('default')
            .primaryPalette('teal', {
                'default': '500'
            })
            .accentPalette('cyanAlt', {
                'default': '500'
            })
            .warnPalette('red', {
                'default': '500'
            })
            .backgroundPalette('grey');
    }

    function notificationConfig(NotificationProvider) {
      NotificationProvider.setOptions({
          delay: 5000,
          startTop: 20,
          startRight: 10,
          verticalSpacing: 20,
          horizontalSpacing: 20,
          positionX: 'center',
          positionY: 'top'
      });
    }

    function compileProvider($compileProvider, moment){
      $compileProvider.preAssignBindingsEnabled(true);
    }
})();
