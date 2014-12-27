'use strict'

addApp.directive('categories', [function () {
    return {
        restrict: 'A',
        templateUrl: './views/directives/categories.html',
        scope: {
            data: '=data',
            func:'=func'
        }
    }
}]);