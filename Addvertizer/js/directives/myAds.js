'use strict'

addApp.directive('myads', [function () {
    return {
        restrict: 'A',
        templateUrl: './views/directives/myAds.html',
        scope: {
            ads: '=ads',
            crudAd:'=crudAd'
        }
    }
}]);