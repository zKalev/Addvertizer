'use strict'

addApp.directive('ad', [function () {
    return {
        restrict: 'A',
        templateUrl: './views/directives/ad.html'
        //scope: {
        //    publishFunc:'=publishFunc'
        //}
    }
}]);