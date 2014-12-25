'use strict'
var addApp=angular.module('AddApp',['ngRoute', 'ngResource', 'ngCookies']).
    config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

        $routeProvider
            .when('/', {
                templateUrl: './views/partials/home.html',
                controller: 'ApplicationCtrl'
            })

            .otherwise({ redirectTo: '/' });
    }])
    .run(function($rootScope, $location,$log) {
        $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/unauthorized');
            }
        })
        $rootScope.$log=$log;
    })
    .constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net/api');