addApp.controller('AddsCtrl',
    ['$scope', '$location', 'AddsResource', 'UserResource', 'CategoriesResource', 'TownsResource', 'NotificationService', 'numberAdsPerPage',
        function ($scope, $location, AddsResource, UserResource, CategoriesResource, TownsResource, NotificationService, numberAdsPerPage) {

            $scope.pager = {
                currentPage: 1,
                numPerPage: numberAdsPerPage,
                maxSize: 5,
                numPages: function () {
                    return $scope.numPage;
                }
            }



            $scope.getAdds = function getAdds(categoryId, townId) {
                AddsResource.getAdds($scope.pager.currentPage, categoryId, townId).then(
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

            $scope.publish = function (ad) {
                console.log(ad);
                var loggedUser = UserResource.getLoggedUserProfile();
                ad.ownerName = loggedUser.name;
                ad.ownerPhone = loggedUser.phoneNumber;
                ad.email = loggedUser.email;

                AddsResource.create(ad).then(
                    function (data) {
                        NotificationService.success('Ad published successfully!');

                        $location.path('/user/ads')
                    })
            }

            $scope.alert = function (msg) {
                alert(msg)
            }
            $scope.image = {};

            $scope.$watch('categoryId', function (newValue, oldValue, scope) {
                $scope.getAdds(newValue, $scope.townId);
                $scope.pager.currentPage = 1;
            })

            //pager watch
            $scope.$watch('pager.currentPage + pager.numPerPage', function (newValue, oldValue, scope) {
                if (newValue === oldValue) {
                    //do nothing
                    console.log('--initialization phase do nothing')
                } else {
                    $scope.getAdds($scope.categoryId, $scope.townId);
                }
            })

            $scope.$watch('townId', function (newValue, oldValue, scope) {
                if (newValue === oldValue) {
                    //do nothing
                    console.log('--initialization phase do nothing')
                } else {
                    $scope.getAdds($scope.categoryId, newValue);
                    $scope.pager.currentPage = 1;
                }
            })

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
        }])