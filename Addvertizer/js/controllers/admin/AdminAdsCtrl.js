addApp.controller('AdminAdsCtrl',
    ['$scope', '$location', '$routeParams', 'AddsResource', 'UserResource', 'NotificationService', 'numberAdsPerPage',
        function ($scope, $location, $routeParams, AddsResource, UserResource, NotificationService, numberAdsPerPage) {
            $scope.pager = {
                currentPage: 1,
                numPerPage: numberAdsPerPage,
                maxSize: 5,
                numPages: function () {
                    return $scope.numPage;
                }
            }
            var adminAdsOperations = {

                approveAd: function (ad) {
                    AddsResource.approveAd(ad.id).then(
                        function (data) {
                            console.log(data);
                            ad.status = 'Approved'
                            NotificationService.success(data.message);
                        },
                        function (error) {
                            NotificationService.error(error.data.message);
                            console.log(error);
                        });
                },
                rejectAd: function (ad) {
                    AddsResource.rejectAd(ad.id).then(
                        function (data) {
                            console.log(data);
                            ad.status = 'Rejected'
                            NotificationService.success(data.message);
                            // $location.path('/admin/ads');
                        },
                        function (error) {
                            console.log(error);
                            NotificationService.error(error.data.message)
                        });
                },
                deleteAd: function (id) {
                    AddsResource.deleteAdminAd(id).then(
                        function (data) {
                            console.log(data);
                            NotificationService.success(data.message);
                            $('#' + id).hide();

                        }, function (error) {
                            console.log(error);
                            NotificationService.error(error.data.message);
                        });
                },
                navigateToEdit: function (id) {
                    $location.path('/admin/ads/edit/' + id);
                },
                navigateToDelete: function (id) {
                    $location.path('/admin/ads/delete/' + id);
                },
                updateAdminAd: function (ad) {
                    AddsResource.updateAdminAd(ad).then(
                        function (data) {
                            console.log(data);
                            NotificationService.success(data.message);
                            $location.path('/admin/ads')
                        },

                        function (error) {
                            console.log(error);
                            NotificationService.error(error.data.message);
                        });
                }
                //formatDate: function (data) {
                //    return new Date(data).format("dd-m-yy")
                //}
            }

            $scope.adminAdsOperations = adminAdsOperations;
            $scope.getAdminAds = function (status, categoryId, townId) {
                AddsResource.getAdminAds($scope.pager.currentPage, status, categoryId, townId).then(
                    function (data) {
                        console.log(data);
                        $scope.adminadsdata = data.ads;
                        $scope.adminadsdata.adminAdsOperations = adminAdsOperations;
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
            $scope.categoriesFunc = {
                setCategoryId: function (id) {
                    if (id === -1)
                        $scope.categoryId = undefined;
                    else
                        $scope.categoryId = id;
                }
            }

            $scope.townsFunc = {
                setTownId: function (id) {
                    if (id === -1)
                        $scope.townId = undefined;
                    else
                        $scope.townId = id;
                }
            }
            $scope.getAdminAds();
            //pager watch
            $scope.$watch('pager.currentPage + pager.numPerPage', function (newValue, oldValue, scope) {

                if (newValue === oldValue) {
                          //do nothing
                    console.log('--initialization phase do nothing')
                } else {
                    $scope.getAdminAds($scope.status, $scope.categoryId, $scope.townId);
                }
            });
            $scope.$watch('categoryId', function (newValue,oldValue,scope) {

                if (newValue === oldValue) {
                    //do nothing
                    console.log('--initialization phase do nothing')
                } else {
                    $scope.getAdminAds($scope.status, newValue, $scope.townId);
                    $scope.pager.currentPage = 1;
                }

            });

            $scope.$watch('townId', function (newValue,oldValue,scope) {

                if (newValue === oldValue) {
                    //do nothing
                    console.log('--initialization phase do nothing')
                } else {
                    $scope.getAdminAds($scope.status, $scope.categoryId, newValue);
                    $scope.pager.currentPage = 1;
                }
            });

            $scope.$watch('status', function (newValue,oldValue,scope) {

                if (newValue === oldValue) {
                    //do nothing
                    console.log('--initialization phase do nothing')
                } else {
                    $scope.getAdminAds($scope.status);
                    $scope.pager.currentPage = 1;
                }

            });
            $scope.location = $location;
            //
            $scope.getById = function (id) {
                AddsResource.getAdminAdById(id).then(
                    function (data) {
                        console.log(data);
                        $scope.adminAd = data;
                        console.log(data)
                    },
                    function (error) {
                        console.log(error);
                        NotificationService.error(error.data.message);
                    }
                )
            }

            $scope.getById($routeParams.id);


        }])
