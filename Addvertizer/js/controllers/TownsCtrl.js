addApp.controller('TownsCtrl', ['$scope', '$resource', 'TownsResource', 'baseServiceUrl', function ($scope, $resource, TownsResource, baseServiceUrl) {

    TownsResource.all().then(
        function (data) {
            console.log(data);
            $scope.towns = data;
        },
        function (error) {
            throw Error(error);
        });
}]);
