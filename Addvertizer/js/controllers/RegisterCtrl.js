addApp.controller('RegisterCtrl', ['$scope', '$location', 'AuthenticationService', 'notifier',
    function RegisterCtrl($scope, $location, AuthenticationService, notifier) {
        $scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        $scope.signUp = function(user) {
            AuthenticationService.signUp(user).then(function() {
                notifier.success('Registration successful!');
                $location.path('/');
            })
        }
    }]);