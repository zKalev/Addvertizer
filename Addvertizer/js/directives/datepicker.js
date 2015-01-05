'use strict';

addApp.directive('datepicker', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.datetimepicker({
                dateFormat: 'yy-mm-dd',
                minDate: new Date()
            });
        }
    }
});