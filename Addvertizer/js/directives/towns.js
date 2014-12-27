'use strict'

addApp.directive('towns', [function () {
    return {
        restrict: 'A',
        templateUrl: './views/directives/towns.html',
        scope: {
            data: '=data',
            func:'=func'
        }
    }
}]);