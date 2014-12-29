'use strict';

addApp.factory('AddsResource', ['$resource', 'AuthorizationService', 'baseServiceUrl', 'numberAdsPerPage', function ($resource, AuthorizationService, baseServiceUrl, numberAdsPerPage) {
    var headers =AuthorizationService.getAuthorizationHeader(),
        addsResource = $resource(baseServiceUrl + '/ads:id', null, {

            'public': {method: 'GET', isArray: true},
            'getAdds': {
                method: 'GET',
                params: {
                    PageSize: numberAdsPerPage,
                    StartPage: '@StartPage',
                    CategoryId: '@CategoryId',
                    TownId: '@TownId'
                }
            },
            'byId': {method: 'GET', params: {id: '@id'}, isArray: false, headers: headers},
            'join': {method: 'PUT', params: {id: '@id'}, isArray: false, headers: headers}

        }),
        createAddsResource = $resource(baseServiceUrl + '/user/ads:id', null, {

            'create': {method: 'POST', params: {id: '@id'}, isArray: false, headers: headers}

        })
    return {
        create: function (ad) {
            return createAddsResource.create(ad).$promise;
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