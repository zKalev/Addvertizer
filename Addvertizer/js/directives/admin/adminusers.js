'use strict'

addApp.directive('adminusers', [function () {
    return {
        restrict: 'A',
        templateUrl: './views/directives/admin/users.html',
        scope: {
            adminusersdata: '=adminusersdata'
        }

    }
}]);