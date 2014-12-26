addApp.controller('HomeCtrl', ['$scope', 'CategoriesResource', 'AddsResource', function ($scope, CategoriesResource, AddsResource) {


    //AddsResource.all().then(
    //    function (data) {
    //
    //        $scope.ads = data.ads;
    //        console.log(data.ads);
    //        console.log(data.ads[0].imageDataUrl);
    //    },
    //    function (error) {
    //        console.log(error)
    //    });


    var a = CategoriesResource.all().then(
        function (data) {
            console.log(data);
            console.log(data[0].name);
            $scope.categories = data;
        },
        function (error) {

        }
    )
    console.log(a);

}])

