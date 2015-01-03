addApp.controller('AdminTownsCtrl', ['$scope', '$location', '$routeParams', 'TownsResource', 'TownsService', 'NotificationService',
    function ($scope, $location, $routeParams, TownsResource, TownsService, NotificationService) {

        TownsResource.all().then(
            function (data) {
                console.log(data);
                $scope.towns = data;

            }, function (error) {
                console.log(error);
            })

        $scope.navigateToEditTown = function (town) {

            $location.path('/admin/towns/edit/' + JSON.stringify(town));
        }
        $scope.navigateToDeleteTown = function (town) {
            $location.path('/admin/towns/delete/' + JSON.stringify(town));
        }

        if ($routeParams.editId !== undefined) {
            $scope.currentTown = JSON.parse($routeParams.editId);
        }
        if ($routeParams.deleteId !== undefined) {
            $scope.currentTown = JSON.parse($routeParams.deleteId);
        }

        $scope.editTown = function (town) {
            TownsService.updateTown(town).then(
                function (data) {
                    console.log(data);
                    NotificationService.success(data.message);
                    $location.path('/admin/towns/list');
                },
                function (error) {
                    console.log(error)
                });
        }

        $scope.createTown = function (town) {
            TownsService.createTown(town).then(
                function (data) {
                    console.log(data);
                    NotificationService.success(data.message);
                    $location.path('/admin/towns/list');
                },
                function (error) {
                    console.log(error)
                });
        }

        $scope.deleteTown = function (townId) {
            TownsService.deleteTown(townId).then(
                function (data) {
                    console.log(data);
                    NotificationService.success(data.message);
                    $location.path('/admin/towns/list');
                },
                function (error) {
                    console.log(error);
                }
            )
        }

    }]);