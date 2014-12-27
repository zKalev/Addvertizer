addApp.controller('HomeCtrl', ['$scope', 'CategoriesResource', 'TownsResource', 'AddsResource', function ($scope, CategoriesResource, TownsResource, AddsResource) {

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
}])

