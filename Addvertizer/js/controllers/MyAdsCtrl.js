'use strict'
addApp.controller('MyAdsCtrl',
    ['$scope', '$location', '$routeParams', 'AddsResource', 'CategoriesResource', 'TownsResource', 'NotificationService', 'numberAdsPerPage',
        function ($scope, $location, $routeParams, AddsResource, CategoriesResource, TownsResource, NotificationService, numberAdsPerPage) {

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

                deactivateAd: function (ad) {
                    AddsResource.deactivateAd(ad.id).then(
                        function (data) {
                            console.log(data);
                            NotificationService.success(data.message);
                            ad.status = 'Inactive';
                        },
                        function (error) {
                            NotificationService.error(error.data.message);
                            throw new Error(error);
                            console.log(error);
                        })
                }
                ,
                deleteAd: function (adId) {
                    AddsResource.deleteAd(adId).then(
                        function (data) {
                            console.log(data);
                            $location.path('/user/ads')
                            NotificationService.success(data.message)
                        }, function (error) {
                            NotificationService.error(error.data.message);
                            console.log(error);
                        })
                },
                publishAgain: function (ad) {
                    AddsResource.publishAgain(ad.id).then(
                        function (data) {
                            console.log(data);
                            NotificationService.success(data.message);
                            ad.status = 'WaitingApproval';
                        },
                        function (error) {
                            NotificationService.error(error.data.message);
                            console.log(error);
                            throw new Error(error);

                        })
                },
                updateAd: function (ad) {
                    console.log(JSON.stringify(ad))
                    ad.changeImage = true;
                    AddsResource.update(ad).then(
                        function (data) {
                            console.log(data);
                            console.log(JSON.stringify(ad))
                            NotificationService.success(data.message);
                        },
                        function (error) {

                            NotificationService.error(error.data.message);
                            console.log(error);
                            throw new Error(error);

                        })
                },
                getById: function (id) {
                    if (id !== undefined) {
                        AddsResource.getById(id).then(
                            function (data) {
                                console.log(data);
                                $scope.ad = data;

                            },
                            function (error) {

                                NotificationService.error(error.data.message);
                                throw new Error(error);
                            })
                    }
                }
            }

            $scope.crud.getById($routeParams.id);

            $scope.navigateToEditPage = function (id) {
                $scope.crud.getById(id);
                $location.path('/user/ads/edit/' + id);
            }

            $scope.navigateToDeletePage = function (id) {
                $scope.crud.getById(id);
                $location.path('/user/ads/delete/' + id);
            }


            $scope.getMyAdds = function (status) {
                AddsResource.getMyAds($scope.pager.currentPage, status).then(
                    function (data) {

                        $scope.ads = data.ads;
                        $scope.numPage = data.numPages;
                        console.log(data.ads);
                    },
                    function (error) {
                        NotificationService.error(error.data.message);
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