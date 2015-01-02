'use strict'
var addApp = angular.module('AddApp', ['ngRoute', 'ngResource', 'ngCookies', 'ui.bootstrap', 'naif.base64']).
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
            }).when('/user/ads', {
                templateUrl: './views/partials/myAds.html',
                controller: 'MyAdsCtrl'
            }).when('/user/ads/edit/:id', {
                templateUrl: './views/partials/edit-ad.html',
                controller: 'MyAdsCtrl'
            }).when('/user/ads/delete/:id', {
                templateUrl: './views/partials/delete-ad.html',
                controller: 'MyAdsCtrl'
            }).when('/user/profile', {
                templateUrl: './views/partials/edit-profile.html',
                controller: 'UserCtrl'
                //admin part
            }).when('/admin/ads', {
                templateUrl: './views/partials/admin/admin-ads.html',
                controller: 'AdminAdsCtrl'
            }).when('/admin/users', {
                templateUrl: './views/partials/admin/admin-users.html',
                controller: 'UserCtrl'
            })

            .otherwise({redirectTo: '/user/home'});
    }])
    .run(function ($rootScope, $location, $log) {
        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/');
            }
        });

        $rootScope.$log = $log;
    }).value('toastr', toastr)
    .constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net/api')
    .constant('numberAdsPerPage', 3)
    .constant('homePath', '/')
    .constant('numberUsersPerPAge', 5);