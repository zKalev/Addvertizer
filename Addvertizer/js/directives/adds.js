'use strict'

addApp.directive('adds', [function () {
    return {
        restrict: 'A',
        templateUrl: './views/directives/adds.html',
        scope: {
            ads: '=ads',

            categories: '=categories'
        },
        link: function(scope, element, attrs) {
            scope.$watch('ads', function(newValue, oldValue) {
                if (newValue)
                    console.log("I see a data change!------------");
            }, true);
        }
    }
}]);
