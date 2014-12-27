'use strict';

addApp.factory('AddsResource', ['$resource', 'baseServiceUrl', 'numberAdsPerPage', function ($resource, baseServiceUrl, numberAdsPerPage) {
    var headers = {}
    var addsResource = $resource(baseServiceUrl + '/ads:id', null, {
        'create': {method: 'POST', params: {id: '@id'}, isArray: false, headers: headers},
        'public': {method: 'GET', isArray: true},
        'getAdds': {
            method: 'GET',
            params: {PageSize: numberAdsPerPage, StartPage: '@StartPage', CategoryId: '@CategoryId', TownId: '@TownId'}
        },
        'byId': {method: 'GET', params: {id: '@id'}, isArray: false, headers: headers},
        'join': {method: 'PUT', params: {id: '@id'}, isArray: false, headers: headers}
    });
    return {
        create: function (trip) {
            return addsResource.create(trip).$promise;
        },
        public: function () {
            return addsResource.public();
        },
        getAdds: function (startPage, categoryId, townId) {
            return addsResource.getAdds({StartPage: startPage, CategoryId: categoryId, TownId: townId}).$promise;
        },
        byId: function (id) {
            return addsResource.byId({id: id});
        },
        join: function (id) {
            return addsResource.join({id: id}).$promise;
        }
    }
}]);