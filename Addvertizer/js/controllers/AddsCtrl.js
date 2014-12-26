addApp.controller('AddsCtrl', ['$scope', 'AddsResource', function ($scope, AddsResource) {


      AddsResource.all().then(
        function (data) {

            $scope.ads = data.ads;
            console.log(data.ads);
            console.log(data.ads[0].imageDataUrl);
        },
        function (error) {
            console.log(error)
        });




}])