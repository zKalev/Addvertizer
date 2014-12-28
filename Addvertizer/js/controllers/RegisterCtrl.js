addApp.controller('RegisterCtrl', ['$scope', '$location', 'AuthenticationService','NotificationService',
    function RegisterCtrl($scope, $location, AuthenticationService, NotificationService) {
        $scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        $scope.signUp = function(user) {
            AuthenticationService.signUp(user).then(function() {
                NotificationService.success('Registration successful! Please login!');
                $location.path('/');
            }, function (error) {
                NotificationService.error('Invalid reg!')
            })
        }
    }]);