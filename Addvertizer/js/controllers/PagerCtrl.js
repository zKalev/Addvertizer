addApp.controller('PagerCtrl', ['$scope', 'AddsResource', function ($scope, AddsResource) {

    $scope.currentPage = 1;
    $scope.numPerPage = 5;
    $scope.maxSize = 5;

    $scope.numPages = function () {
        return $scope.numPage;
    };

    $scope.$watch('currentPage + numPerPage', function () {

        AddsResource.all($scope.currentPage).then(
            function (data) {

                $scope.ads = data.ads;
                $scope.numPage = data.numPages;
                console.log(data.numPages);
            },
            function (error) {
                console.log(error);
                throw Error(error);
            });
    });
}])