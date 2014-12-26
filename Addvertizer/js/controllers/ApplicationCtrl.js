'use strict'
addApp.controller('ApplicationCtrl',['$scope','$location', function ($scope,$location) {

    $scope.currentUser='zkalev';
    $scope.test='laaaa';
    $scope.location=$location;
    console.log(location);
    this.test='laaaa this';
}])