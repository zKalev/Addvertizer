addApp.factory('UserResource', ['$resource', 'baseServiceUrl', function ($resource, baseServiceUrl) {
    var userResource = $resource(baseServiceUrl + '/towns', null, {

        all: {method: 'GET',isArray:true}
    });
    return{

        all: function () {
            return  userResource.all().$promise;
        }
    }

}])
