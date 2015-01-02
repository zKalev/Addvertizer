'use strict'
addApp.controller('UserCtrl', ['$scope', '$resource', 'AuthenticationService', 'UserResource', 'NotificationService', 'baseServiceUrl', function ($scope, $resource, AuthenticationService, UserResource, NotificationService, baseServiceUrl) {


    $scope.changePassword = function (pass) {
        AuthenticationService.changePassword(pass).then(
            function (data) {
                console.log(data);
                NotificationService.success(data.message);

            },
            function (error) {
                console.log(error);
                NotificationService.error(error.data.message);
            }
        )
    }

    $scope.updateProfile = function (user) {

        UserResource.updateUserProfile(user).then(
            function (data) {
                NotificationService.success(data.message);
                console.log(data);
            },
            function (error) {
                NotificationService.error(error.data.message);
                console.log(error);
            }
        )
    }
    $scope.getUserProfile = function () {
        UserResource.getUserProfile().then(
            function (data) {
                $scope.user = data;
                console.log(data)
            },
            function (error) {
                console.log(error);
            });
    }


    UserResource.all().then(
        function (data) {
            $scope.users = data.users;
            console.log(data);
        },
        function (error) {
         console.log(error)
        });

}]);
