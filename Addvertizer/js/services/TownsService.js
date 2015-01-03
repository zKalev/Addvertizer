addApp.factory('TownsService', ['$q', '$http', 'baseServiceUrl', 'AuthorizationService', function ($q, $http, baseServiceUrl, AuthorizationService) {
    var headers = AuthorizationService.getAuthorizationHeader(),
        townsBaseUrl = baseServiceUrl + '/admin/Towns';

    return {

        updateTown: function (town) {
            var deferred = $q.defer();

            $http.put(townsBaseUrl + '/' + town.id, town, {headers: headers})
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        createTown: function (town) {
            var deferred = $q.defer();

            $http.post(townsBaseUrl, town, {headers: headers})
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        deleteTown: function (townId) {
            var deferred = $q.defer();

            $http.delete(townsBaseUrl + '/' + townId, {headers: headers})
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    }
}])