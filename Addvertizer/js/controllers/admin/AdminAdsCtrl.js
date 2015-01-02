addApp.controller('AdminAdsCtrl',
    ['$scope', '$location', 'AddsResource', 'UserResource', 'NotificationService', 'numberAdsPerPage',
        function ($scope, $location, AddsResource, UserResource, NotificationService, numberAdsPerPage) {


            $scope.getAdminAds = function (status, categoryId, townId, sortBy) {
                AddsResource.getAdminAds($scope.pager.currentPage, status, categoryId, townId, sortBy).then(
                    function (data) {
                        console.log(data);
                        $scope.adminadsdata = data.ads;
                        $scope.numPage = data.numPages;
                    },
                    function (error) {
                        console.log(error);
                    });
            }
            $scope.setStatus = function (status) {
                if (status === -1) {
                    $scope.status = undefined;
                } else {
                    $scope.status = status;
                }
            }

            $scope.pager = {
                currentPage: 1,
                numPerPage: numberAdsPerPage,
                maxSize: 5,
                numPages: function () {
                    return $scope.numPage;
                }
            }
            //pager watch
            $scope.$watch('pager.currentPage + pager.numPerPage', function () {
                $scope.getAdminAds($scope.status, $scope.categoryId, $scope.townId);

            });
            $scope.$watch('categoryId', function (newValue, oldValue) {
                $scope.getAdminAds($scope.status, newValue, $scope.townId);
                $scope.pager.currentPage = 1;
            });

            $scope.$watch('townId', function (newValue) {
                $scope.getAdminAds($scope.status, $scope.categoryId, newValue);
                $scope.pager.currentPage = 1;

            });

            $scope.$watch('status', function () {
                $scope.getAdminAds($scope.status);
                $scope.pager.currentPage = 1;
            });


            $scope.adminAdsOperations = {

                approveAd: function (id) {
                    AddsResource.approveAd(id).then(
                        function (data) {
                            console.log(data);
                            NotificationService.success(data.message);
                        },
                        function (error) {
                            NotificationService.error(error.data.message);
                            console.log(error);
                        })
                },
                rejectAd: function (id) {
                    AddsResource.rejectAd(id).then(
                        function (data) {
                            console.log(data);
                            NotificationService.success(data.message);
                        },
                        function (error) {
                            console.log(error);
                            NotificationService.error(error.data.message)
                        })
                }
            }


        }])
