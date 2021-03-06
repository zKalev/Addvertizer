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
                        deferred.resolve(response);
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
            var deferred = $q.defer(),
                headers = AuthorizationService.getAuthorizationHeader();

            $http.post(userUrl + '/logout', {}, {headers: headers})
                .success(function () {
                    Identity.setCurrentUser(undefined);
                    AuthorizationService.removeAuthorizationHeader();
                    deferred.resolve();
                });

            return deferred.promise;
        },
        userInfo: function () {
            var userInfo = Identity.getCurrentUser();
            return userInfo;
        },
        changePassword: function (pass) {
            var deferred = $q.defer(),
                headers = AuthorizationService.getAuthorizationHeader();
            var url = baseServiceUrl + '/user/changePassword';
            $http.put(url, pass, {headers: headers}).success(function (data) {
                deferred.resolve(data);

            }).error(function (error) {
                deferred.reject(error);
                console.log(error);
            });
            return deferred.promise;
        },

        isAuthenticated: function () {
            if (Identity.isAuthenticated()) {
                return true;
            }
            else {
                return false;
            }
        },
        isAuthorizedAsUser: function () {
            if (Identity.isAuthenticated()) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        },
        isAuthorizedAsAdmin: function () {
            if (Identity.isAuthenticated()) {
                var currUser = Identity.getCurrentUser();
                if (currUser.isAdmin) {

                    return true;
                }
                else {
                    return $q.reject('not admin');
                }
            }
            else {
                return $q.reject('not authorized');
            }
        }
    }

}])