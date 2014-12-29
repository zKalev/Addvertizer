'use strict'
addApp.controller('MyAdsCtrl',
    ['$scope', '$location', 'AddsResource', 'CategoriesResource', 'TownsResource', 'NotificationService', 'numberAdsPerPage',
        function ($scope, $location, AddsResource, CategoriesResource, TownsResource, NotificationService, numberAdsPerPage) {

            $scope.pager = {
                currentPage: 1,
                numPerPage: numberAdsPerPage,
                maxSize: 5,
                numPages: function () {
                    return $scope.numPage;
                }
            }

            $scope.setStatus = function (status) {
                if (status === -1) {
                    $scope.status = undefined;
                } else {
                    $scope.status = status;
                }
            }

            $scope.crud = {

                deactivateAd: function (adId) {
                    AddsResource.deactivateAd(adId).then(
                        function (data) {
                            console.log(data);
                            NotificationService.success(data.message);
                        },
                        function (error) {
                            throw new Error(error);
                            console.log(error);
                        })
                }
                ,
                deleteAd: function (adId) {
                    AddsResource.deleteAd(adId).then(
                        function (data) {
                            console.log(data);
                            NotificationService.success(data.message)
                        }, function (error) {
                            throw new Error(error);
                            console.log(error);
                        })
                },
                publishAgain: function (adId) {
                    AddsResource.publishAgain(adId).then(
                        function (data) {
                            console.log(data);
                            NotificationService.success(data.message)
                        },
                        function (error) {
                            NotificationService.success(error.message);
                            throw new Error(error);

                            console.log(error);
                        }
                    )
                }
            }

            $scope.getMyAdds = function (status) {
                AddsResource.getMyAds($scope.pager.currentPage, status).then(
                    function (data) {

                        $scope.ads = data.ads;
                        $scope.numPage = data.numPages;
                        console.log(data.ads);
                    },
                    function (error) {
                        console.log(error);
                        throw Error(error);
                    });
            }

            //pager watch
            $scope.$watch('pager.currentPage + pager.numPerPage', function () {
                $scope.getMyAdds($scope.status);
            })
            $scope.$watch('status', function () {
                $scope.getMyAdds($scope.status);
                $scope.pager.currentPage = 1;
            })

        }]);