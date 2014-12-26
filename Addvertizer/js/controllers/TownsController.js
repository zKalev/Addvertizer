addApp.controller('TownsController',['$resource', 'baseServiceUrl', function ($resource, baseServiceUrl) {
    var CategoriesResource = $resource(baseServiceUrl + '/towns', null, {
        all: {method: 'GET'}
    });


    return {

        all:function(){
            return CategoriesResource.all().$promise;
        }
    }
    }]);
