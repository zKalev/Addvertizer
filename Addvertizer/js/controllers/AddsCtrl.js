addApp.controller('AddsCtrl', ['$scope', 'AddsResource', 'numberAdsPerPage', function ($scope, AddsResource, numberAdsPerPage) {

    $scope.pager = {
        currentPage: 1,
        numPerPage: numberAdsPerPage,
        maxSize: 5,
        numPages: function () {
            return $scope.numPage;
        }
    }
    $scope.categoryId=undefined;
    $scope.townId=undefined;

    $scope.$watch('pager.currentPage + pager.numPerPage', function () {

        AddsResource.getAdds($scope.pager.currentPage,$scope.categoryId,$scope.townId).then(
            function (data) {

                $scope.ads = data.ads;
                $scope.numPage = data.numPages;
                console.log(data.numPages);
            },
            function (error) {
                console.log(error);
                throw Error(error);
            });
    })
}])