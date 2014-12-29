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


            $scope.getMyAdds = function () {
                AddsResource.getMyAds($scope.pager.currentPage).then(
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
            //$scope.getMyAdds();


            //pager watch
            $scope.$watch('pager.currentPage + pager.numPerPage', function () {
                $scope.getMyAdds($scope.categoryId, $scope.townId);
            })



        }]);