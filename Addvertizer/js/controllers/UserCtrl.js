'use strict'
addApp.controller('UserCtrl',
    ['$scope', '$resource', 'AuthenticationService', 'UserResource', 'NotificationService', 'baseServiceUrl', 'numberUsersPerPAge',
        function ($scope, $resource, AuthenticationService, UserResource, NotificationService, baseServiceUrl, numberUsersPerPAge) {


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
            $scope.loadUserProfile = function () {
                UserResource.getUserProfile().then(
                    function (data) {
                        $scope.user = data;
                        console.log(data)
                    },
                    function (error) {
                        console.log(error);
                    });
            }

            $scope.pager = {
                currentPage: 1,
                numPerPage: numberUsersPerPAge,
                maxSize: 5,
                numPages: function () {
                    return $scope.numPage;
                }
            }

            $scope.loadUsers = function () {
                UserResource.all($scope.pager.currentPage).then(
                    function (data) {
                        $scope.users = data.users;
                        $scope.numPage = data.numPages;
                        console.log(data);
                    },
                    function (error) {
                        console.log(error)
                    });
            }
            $scope.$watch('pager.currentPage + pager.numPerPage', function () {
                $scope.loadUsers();

            })
            
            


        }]);
