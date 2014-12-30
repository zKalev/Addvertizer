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
        }),
        userAdsResource = $resource(baseServiceUrl + '/user/ads/:id', null, {

            'create': {method: 'POST', params: {id: '@id'}, isArray: false, headers: headers},
            'getMyAds': {
                method: 'GET', params: {
                    PageSize: numberAdsPerPage,
                    StartPage: '@StartPage',
                    status: '@status'
                }, headers: headers
            },
            'delete': {method: 'DELETE', params: {id: '@id'}, headers: headers},

            'update': {
                method: 'PUT', params: {
                    id: '@id',
                    changeImage: '@changeImage',
                    title: '@title',
                    text: '@text',
                    imageDataUrl: '@imageDataUrl',
                    categoryId: '@categoryId',
                    townId: '@townId'

                }, headers: headers
            },
            'getById': {method: 'GET', params: {id: '@id'}, headers: headers}

        }),
        deactivateUserAdResource = $resource(baseServiceUrl + '/user/ads/deactivate/:id', null, {

            'deactivateAd': {method: 'PUT', params: {id: '@id'}, headers: headers}
        }),

        publishAgainResource = $resource(baseServiceUrl + '/user/ads/publishagain/:id', null, {

            'publishAgain': {method: 'PUT', params: {id: '@id'}, headers: headers}
        });

    return {
        create: function (ad) {
            return userAdsResource.create(ad).$promise;
        },
        getMyAds: function (startPage, status) {
            return userAdsResource.getMyAds({StartPage: startPage, status: status}).$promise;
        },

        getAdds: function (startPage, categoryId, townId) {
            return addsResource.getAdds({StartPage: startPage, CategoryId: categoryId, TownId: townId}).$promise;
        },
        deactivateAd: function (adId) {
            return deactivateUserAdResource.deactivateAd({id: adId}).$promise;
        },
        deleteAd: function (adId) {
            return userAdsResource.delete({id: adId}).$promise
        },
        publishAgain: function (adId) {
            return publishAgainResource.publishAgain({id: adId}).$promise;
        },
        update: function (ad) {
            return userAdsResource.update({
                id: ad.id,
                changeImage: true,
                title: ad.title,
                text: ad.text,
                imageDataUrl: ad.imageDataUrl,
                categoryId: ad.categoryId,
                townId: ad.townId
            }).$promise;
        },
        getById: function (adId) {
            return userAdsResource.getById({id: adId}).$promise;
        }
    }
}]);