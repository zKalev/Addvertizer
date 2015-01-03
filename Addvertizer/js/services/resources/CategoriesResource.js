addApp.factory('CategoriesResource', ['$resource', 'baseServiceUrl', function ($resource, baseServiceUrl) {
   // var headers = AuthorizationService.getAuthorizationHeader(),
       var categoriesResource = $resource(baseServiceUrl + '/categories', null, {

            all: {method: 'GET', isArray: true}
            //create: {method: 'POST', headers: headers}
        });
    return {

        all: function () {
            return categoriesResource.all().$promise;
        },
        createCategory: function (category) {
            return categoriesResource.create(category).$promise;
        }
    }
}])

