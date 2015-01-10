addApp.controller('RegisterCtrl', ['$scope', '$location', '$sanitize', '$filter', 'AuthenticationService', 'NotificationService',
    function RegisterCtrl($scope, $location, $sanitize, $filter, AuthenticationService, NotificationService) {
        $scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        $scope.signUp = function (user) {
            console.log(user)
            user.username = $sanitize(user.username);
            user.password = $sanitize(user.password);
            user.email = $sanitize(user.email);
            user.phone = $filter('number')(user.phone);

            AuthenticationService.signUp(user).then(function () {
                NotificationService.success('Registration successful! Please login!');
                $location.path('/');
            }, function (error) {
                var errorMsg='Invalid registration! ';
                if(error.message!==undefined){
                    errorMsg+=error.message;
                }
                NotificationService.error(errorMsg);

            })
        }
    }]);