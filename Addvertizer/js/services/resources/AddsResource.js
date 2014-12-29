'use strict';

addApp.factory('AddsResource', ['$resource', 'AuthorizationService', 'baseServiceUrl', 'numberAdsPerPage', function ($resource, AuthorizationService, baseServiceUrl, numberAdsPerPage) {
    var headers = AuthorizationService.getAuthorizationHeader(),
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
            }
            //'byId': {method: 'GET', params: {id: '@id'}, isArray: false, headers: headers},
            //'join': {method: 'PUT', params: {id: '@id'}, isArray: false, headers: headers}

        }),
        userAddsResource = $resource(baseServiceUrl + '/user/ads:id', null, {

            'create': {method: 'POST', params: {id: '@id'}, isArray: false, headers: headers},
            'getMyAds': {
                method: 'GET', params: {
                    PageSize: numberAdsPerPage,
                    StartPage: '@StartPage'
                }, headers: headers
            }

        })
    return {
        create: function (ad) {
            return userAddsResource.create(ad).$promise;
        },
        getMyAds: function (StartPage) {
            return userAddsResource.getMyAds({StartPage: StartPage}).$promise;
        },

        getAdds: function (startPage, categoryId, townId) {
            return addsResource.getAdds({StartPage: startPage, CategoryId: categoryId, TownId: townId}).$promise;
        }



        //byId: function (id) {
        //    return addsResource.byId({id: id});
        //},
        //join: function (id) {
        //    return addsResource.join({id: id}).$promise;
        //},  public: function () {
        //    return addsResource.public();
        //}
    }
}]);