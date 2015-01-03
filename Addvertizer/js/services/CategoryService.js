addApp.factory('CategoryService', ['$q', '$http', 'baseServiceUrl', 'AuthorizationService', function ($q, $http, baseServiceUrl, AuthorizationService) {
    var headers = AuthorizationService.getAuthorizationHeader(),
        categoryUrl = baseServiceUrl + '/admin/Categories';


    return {

        updateCategory: function (category) {
            var deferred = $q.defer();

            $http.put(categoryUrl + '/' + category.id, category, {headers: headers})
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        deleteCategory: function (categoryId) {
            var deferred = $q.defer();

            $http.delete(categoryUrl + '/' + categoryId, {headers: headers})
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        createCategory: function (category) {
            var deferred = $q.defer();

            $http.post(categoryUrl, category, {headers: headers})
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