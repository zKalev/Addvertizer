addApp.controller('LoginCtrl', ['$scope','$sanitize', '$location', 'AuthenticationService', 'NotificationService',
    function ($scope,$sanitize, $location, AuthenticationService, NotificationService) {


    $scope.login = function (user) {
        AuthenticationService.login(user).then(
            function (data) {
                user.username=$sanitize(user.username)
                NotificationService.success('Logged in successfully!');
                if (data.isAdmin) {
                    $location.path('/admin/ads');
                } else {
                    $location.path('/user/home');
                }
            },
            function (error) {
                console.log(error);
                NotificationService.error('Invalid login!')
            })
    }

}])


