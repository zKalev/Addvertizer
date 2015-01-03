'use strict'
addApp.controller('AdminUserCtrl',
    ['$scope', '$location', '$routeParams', 'AuthenticationService', 'UserService', 'UserResource', 'NotificationService', 'baseServiceUrl', 'numberUsersPerPAge',
        function ($scope, $location, $routeParams, AuthenticationService, UserService, UserResource, NotificationService, baseServiceUrl, numberUsersPerPAge) {


            $scope.pager = {
                currentPage: 1,
                numPerPage: numberUsersPerPAge,
                maxSize: 5,
                numPages: function () {
                    return $scope.numPage;
                }
            }

            var adminUsersOperations = {
                navigateToEdit: function (user) {
                    $location.path('/admin/users/edit/' + JSON.stringify(user));
                },
                navigateToDelete: function (user) {
                    $location.path('/admin/users/delete/' + JSON.stringify(user));
                },
                updateProfile: function (user) {
                    UserService.updateUser(user).then(
                        function (data) {
                            console.log(data);
                            NotificationService.success(data.message);
                        },
                        function (error) {
                            console.log(error);
                            NotificationService.error(error.message);
                        });
                },
                deleteUser: function (username) {
                    UserService.deleteUser(username).then(
                        function (data) {
                            console.log(data);
                            NotificationService.success(data.message);
                            $location.path('/admin/users');
                        },
                        function (error) {
                            console.log(error);
                            NotificationService.error(error.message);
                        }
                    )
                },
                changePassword: function (credentials) {
                    alert(JSON.stringify(credentials))
                    UserService.setPassword(credentials).then(
                        function (data) {
                            NotificationService.success(data.message);
                            console.log(data);
                        },
                        function (error) {
                            NotificationService.error(error.message);
                            console.log(error);
                        }
                    )
                }
            }
            $scope.adminUsersOperations = adminUsersOperations;

            if ($routeParams.editId !== undefined) {
                $scope.currentUser = JSON.parse($routeParams.editId);
            }
            if ($routeParams.deleteId !== undefined) {
                $scope.currentUser = JSON.parse($routeParams.deleteId);
            }

            $scope.loadUsers = function () {
                UserResource.all($scope.pager.currentPage).then(
                    function (data) {
                        $scope.users = data.users;
                        $scope.users.adminUserOperations = adminUsersOperations;
                        $scope.numPage = data.numPages;
                        console.log(data);
                    },
                    function (error) {
                        console.log(error)
                    });
            }

            $scope.$watch('pager.currentPage + pager.numPerPage', function () {
                $scope.loadUsers();

            });


        }]);

