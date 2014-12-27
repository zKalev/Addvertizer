addApp.factory('CategoriesResource', ['$resource', 'baseServiceUrl', function ($resource, baseServiceUrl) {
    var CategoriesResource = $resource(baseServiceUrl + '/categories', null, {

        all: {method: 'GET', isArray: true}
    });
    return {

        all: function () {
            return CategoriesResource.all().$promise;
        }
    }
}])

