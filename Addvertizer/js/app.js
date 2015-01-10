'use strict'
var addApp = angular.module('AddApp', ['ngRoute', 'ngResource','ngSanitize', 'ngCookies', 'ui.bootstrap', 'naif.base64']).
    config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

        var routeUserChecks = {
            authenticatedAsUser: {
                authenticateAsUser: function (AuthenticationService) {
                    return AuthenticationService.isAuthorizedAsUser();
                }
            },
            authenticatedAsAdmin: {
                authenticatedAsAdmin: function (AuthenticationService) {
                    return AuthenticationService.isAuthorizedAsAdmin();
                }
            }
        }

        $routeProvider
            .when('/', {
                templateUrl: './views/partials/home.html',
                controller: 'AddsCtrl'
            }).when('/login', {
                templateUrl: './views/partials/login.html',
                controller: 'LoginCtrl'
            }).when('/register', {
                templateUrl: './views/partials/register.html',
                controller: 'RegisterCtrl'
            }).when('/user/home', {
                templateUrl: './views/partials/home.html',
                controller: 'AddsCtrl',
                resolve: routeUserChecks.authenticatedAsUser
            }).when('/user/ads/publish', {
                templateUrl: './views/partials/new-ad.html',
                controller: 'AddsCtrl',
                resolve: routeUserChecks.authenticatedAsUser
            }).when('/user/ads', {
                templateUrl: './views/partials/myAds.html',
                controller: 'MyAdsCtrl',
                resolve: routeUserChecks.authenticatedAsUser
            }).when('/user/ads/edit/:id', {
                templateUrl: './views/partials/edit-ad.html',
                controller: 'MyAdsCtrl',
                resolve: routeUserChecks.authenticatedAsUser
            }).when('/user/ads/delete/:id', {
                templateUrl: './views/partials/delete-ad.html',
                controller: 'MyAdsCtrl',
                resolve: routeUserChecks.authenticatedAsUser
            }).when('/user/profile', {
                templateUrl: './views/partials/edit-profile.html',
                controller: 'UserCtrl',
                resolve: routeUserChecks.authenticatedAsUser

                //admin part

            }).when('/admin/ads', {
                templateUrl: './views/partials/admin/admin-ads.html',
                controller: 'AdminAdsCtrl',
                resolve: routeUserChecks.authenticatedAsAdmin
            }).when('/admin/ads/edit/:id', {
                templateUrl: './views/partials/admin/admin-edit-ad.html',
                controller: 'AdminAdsCtrl',
                resolve: routeUserChecks.authenticatedAsAdmin
            })
            .when('/admin/users', {
                templateUrl: './views/partials/admin/admin-users.html',
                controller: 'AdminUserCtrl',
                resolve: routeUserChecks.authenticatedAsAdmin
            }).when('/admin/users/edit/:editId', {
                templateUrl: './views/partials/admin/admin-edit-user.html',
                controller: 'AdminUserCtrl',
                resolve: routeUserChecks.authenticatedAsAdmin
            }).when('/admin/users/delete/:deleteId', {
                templateUrl: './views/partials/admin/admin-delete-user.html',
                controller: 'AdminUserCtrl',
                resolve: routeUserChecks.authenticatedAsAdmin
            }).when('/admin/categories', {
                templateUrl: './views/partials/admin/categories-list.html',
                controller: 'AdminCategoriesCtrl',
                resolve: routeUserChecks.authenticatedAsAdmin
            }).when('/admin/categories/edit/:editId', {
                templateUrl: './views/partials/admin/edit-category.html',
                controller: 'AdminCategoriesCtrl',
                resolve: routeUserChecks.authenticatedAsAdmin
            }).when('/admin/categories/delete/:deleteId', {
                templateUrl: './views/partials/admin/delete-category.html',
                controller: 'AdminCategoriesCtrl',
                resolve: routeUserChecks.authenticatedAsAdmin
            }).when('/admin/categories/create', {
                templateUrl: './views/partials/admin/create-category.html',
                controller: 'AdminCategoriesCtrl',
                resolve: routeUserChecks.authenticatedAsAdmin
            }).when('/admin/towns/list', {
                templateUrl: './views/partials/admin/towns-list.html',
                controller: 'AdminTownsCtrl',
                resolve: routeUserChecks.authenticatedAsAdmin
            }).when('/admin/towns/edit/:editId', {
                templateUrl: './views/partials/admin/edit-town.html',
                controller: 'AdminTownsCtrl',
                resolve: routeUserChecks.authenticatedAsAdmin
            }).when('/admin/towns/delete/:deleteId', {
                templateUrl: './views/partials/admin/delete-town.html',
                controller: 'AdminTownsCtrl',
                resolve: routeUserChecks.authenticatedAsAdmin
            }).when('/admin/towns/create', {
                templateUrl: './views/partials/admin/create-town.html',
                controller: 'AdminTownsCtrl',
                resolve: routeUserChecks.authenticatedAsAdmin
            }).when('/unauthorized', {
                templateUrl: './views/partials/unauthorized.html'
            }).when('/notadmin', {
                templateUrl: './views/partials/unauthorized-admin.html'
            })
            .otherwise({redirectTo: '/'});
    }])
    .run(function ($rootScope, $location, $log) {

        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/unauthorized');
            }
            if (rejection === 'not admin') {
                $location.path('/notadmin');
            }
        });
        $rootScope.$log = $log;
    }).value('toastr', toastr)
    .constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net/api')
    .constant('numberAdsPerPage', 3)
    .constant('homePath', '/')
    .constant('numberUsersPerPAge', 5);