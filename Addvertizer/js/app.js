'use strict'
var addApp = angular.module('AddApp', ['ngRoute', 'ngResource', 'ngCookies', 'ui.bootstrap']).
    config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

        $routeProvider
            .when('/', {
                templateUrl: './views/partials/home.html',
                controller: 'ApplicationCtrl'
            }).when('/login', {
                templateUrl: './views/partials/login.html',
                controller: 'LoginCtrl'
            }).when('/register', {
                templateUrl: './views/partials/register.html',
                controller: 'RegisterCtrl'
            }).when('/user/home', {
                templateUrl: './views/partials/home.html',
                controller: 'ApplicationCtrl'
            }).when('/user/ads/publish', {
                templateUrl: './views/partials/new-ad.html',
                controller: 'AddsCtrl'
            })

            .otherwise({redirectTo: '/'});
    }])
    .run(function ($rootScope, $location, $log) {
        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/');
            }
        });

        $rootScope.$log = $log;
    }).value('toastr', toastr)
    .constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net/api').constant('numberAdsPerPage', 3);