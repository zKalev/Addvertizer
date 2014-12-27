addApp.factory('TownsResource', ['$resource', 'baseServiceUrl', function ($resource, baseServiceUrl) {
    var TownsResource = $resource(baseServiceUrl + '/towns', null, {

        all: {method: 'GET',isArray:true}
    });
    return{

        all: function () {
            return  TownsResource.all().$promise;
        }
    }

}])
