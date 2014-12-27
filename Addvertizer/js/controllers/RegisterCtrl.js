addApp.controller('SignUpCtrl', ['$scope', '$location', 'authentication', 'notifier',
    function SignUpCtrl($scope, $location, auth, notifier) {
        $scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        $scope.signUp = function(user) {
            auth.signUp(user).then(function() {
                notifier.success('Registration successful!');
                $location.path('/');
            })
        }
    }]);