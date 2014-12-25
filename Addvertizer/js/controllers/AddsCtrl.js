addApp.controller('AddsCtrl', ['$scope', 'AddsResource', function ($scope, AddsResource) {

    $scope.currentUser = 'zkalev';
    var a = AddsResource.all();
      //[{test:'test',coa:'gorega'},{test:'test2',coa:'gorega2'}]
    console.log(a);
    console.log(JSON.stringify(a));
}])