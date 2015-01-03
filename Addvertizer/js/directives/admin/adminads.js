'use strict'

addApp.directive('adminads', [function () {
    return {
        restrict: 'A',
        templateUrl: './views/directives/admin/ads.html',
        scope: {
            adminadsdata: '=adminadsdata',
        }
    }
}]);