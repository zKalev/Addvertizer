addApp.factory('UserService', ['$q', '$http', 'baseServiceUrl', 'AuthorizationService', function ($q, $http, baseServiceUrl, AuthorizationService) {
    var headers = AuthorizationService.getAuthorizationHeader(),
        userBaseUrl = baseServiceUrl + '/admin/User';

    return {

        updateUser: function (user) {
            var deferred = $q.defer();

            $http.put(userBaseUrl + '/' + user.username, user, {headers: headers})
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        deleteUser: function (username) {
            var deferred = $q.defer();

            $http.delete(userBaseUrl + '/' + username, {headers: headers})
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },

        setPassword: function (credentials) {
            var deferred = $q.defer();

            $http.put(baseServiceUrl + '/admin/SetPassword',credentials, {headers: headers})
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

    }
}]);

