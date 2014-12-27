'use strict'

addApp.directive('pager', [function () {
    return {
        restrict: 'A',
        templateUrl: './views/directives/pager.html',
        scope: {
            data: '=data'
        }
    }
}]);