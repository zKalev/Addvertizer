'use strict'
addApp.controller('ApplicationCtrl', ['$scope', '$location', 'AuthenticationService', function ($scope, $location, AuthenticationService) {

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

    $scope.location = $location;
    $scope.pathHeadingMapper = {
        '/': 'Ads - Home',
        '/login': 'Ads - Login',
        '/register': 'Ads - Register',
        '/user/home': 'Ads - Home'

    };
}])