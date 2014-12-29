'use strict'
addApp.controller('ApplicationCtrl',
    ['$scope', '$location', 'CategoriesResource', 'TownsResource', 'AuthenticationService',
        function ($scope, $location, CategoriesResource, TownsResource, AuthenticationService) {

            $scope.isAuthenticated = function () {
                return AuthenticationService.isAuthenticated();
            }

            $scope.getCurrentUser = function () {
                return AuthenticationService.userInfo();
            }

            $scope.logout = function () {
                AuthenticationService.logout().then(function () {
                    $location.path('/');
                });
            }

            TownsResource.all().then(
                function (data) {
                    console.log(data);
                    $scope.towns = data;
                },
                function (error) {
                    throw Error(error);
                });

            CategoriesResource.all().then(
                function (data) {
                    console.log(data);
                    console.log(data[0].name);
                    $scope.categories = data;
                },
                function (error) {
                    throw Error(error);
                });

            $scope.location = $location;
            $scope.pathHeadingMapper = {
                '/': 'Ads - Home',
                '/login': 'Ads - Login',
                '/register': 'Ads - Register',
                '/user/home': 'Ads - Home',
                '/user/ads/publish': 'Ads - Publish New Ad',
                '/user/ads': 'Ads - My Ads'

            };
        }])