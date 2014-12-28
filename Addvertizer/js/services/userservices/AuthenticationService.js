addApp.factory('AuthenticationService', ['$q', '$http', 'Identity', 'baseServiceUrl', 'AuthorizationService', function ($q, $http, Identity, baseServiceUrl, AuthorizationService) {
    var userUrl = baseServiceUrl + '/user';

    return {
        signUp: function (user) {
            var deferred = $q.defer();

            $http.post(userUrl + '/register', user)
                .success(function () {
                    deferred.resolve();
                })
            .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        login: function (user) {
            var deferred = $q.defer();

            $http.post(userUrl + '/login', 'username=' + user.username + '&password=' + user.password, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .success(function (response) {
                    if (response['access_token']) {
                        Identity.setCurrentUser(response);
                        AuthorizationService.setAuthorizationHeader(response['access_token']);
                        deferred.resolve(true);
                    }
                    else {
                        deferred.resolve(false);
                    }
                }).error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        logout: function () {
            var deferred = $q.defer();

            var headers = AuthorizationService.getAuthorizationHeader();
            $http.post(userUrl + '/logout', {}, {headers: headers})
                .success(function () {
                    Identity.setCurrentUser(undefined);
                    AuthorizationService.removeAuthorizationHeader();
                    deferred.resolve();
                });

            return deferred.promise;
        },
        userInfo: function () {
           // var deferred = $q.defer();

            var userInfo = Identity.getCurrentUser();
            return userInfo;
            //if (userInfo) {
            //   deferred.resolve(userInfo);
            //}
            //else {
            //    var headers = AuthorizationService.getAuthorizationHeader();
            //    $http.get(userUrl + '/profile', {headers: headers})
            //        .success(function (response) {
            //            var currentUser = Identity.getCurrentUser();
            //            angular.extend(currentUser, {userInfo: response});
            //            Identity.setCurrentUser(currentUser);
            //            deferred.resolve(response);
            //        });
            //}

           // return deferred.promise;
        },
        isAuthenticated: function () {
            if (Identity.isAuthenticated()) {
                return true;
            }
            else {
                return false;
            }
        }
    }


}])