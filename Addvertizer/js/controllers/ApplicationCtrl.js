'use strict'
addApp.controller('ApplicationCtrl',['$scope','$location', function ($scope,$location) {
    console.log('application controller---------------');
    $scope.currentUser='zkalev';
    $scope.test='laaaa';
    $scope.location=$location;
    console.log($scope.location);
    this.test='laaaa this';
}])