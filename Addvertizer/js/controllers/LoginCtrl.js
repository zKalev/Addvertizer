addApp.controller('LoginCtrl', ['$scope', '$location', 'AuthenticationService', 'NotificationService', function ($scope, $location, AuthenticationService, NotificationService) {


    $scope.login = function (user) {
        AuthenticationService.login(user).then(
            function (data) {
                console.log(data);
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


