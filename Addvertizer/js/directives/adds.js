'use strict'

addApp.directive('adds', [function () {
    return {
        restrict: 'A',
        templateUrl: './views/directives/adds.html',
        scope:{
            ads: '=ads',
            pager:'=pager'
        }
    }
}]);
