'use strict'

addApp.directive('adds', [function () {
    return {
        restrict: 'A',
        templateUrl: './views/directives/ads.html',
        scope: {
            ads: '=ads'
        }
    }
}]);
