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
                method: 'PUT', headers: headers
            },
            'getById': {method: 'GET', params: {id: '@id'}, headers: headers}

        }),
        deactivateUserAdResource = $resource(baseServiceUrl + '/user/ads/deactivate/:id', null, {

            'deactivateAd': {method: 'PUT', params: {id: '@id'}, headers: headers}
        }),

        publishAgainResource = $resource(baseServiceUrl + '/user/ads/publishagain/:id', null, {

            'publishAgain': {method: 'PUT', params: {id: '@id'}, headers: headers}
        }),
        adminAdsResource = $resource(baseServiceUrl + '/admin/Ads/:id', null, {
            getAllAds: {
                method: 'GET', isArray: false, params: {
                    Status: '@Status',
                    CategoryId: '@CategoryId',
                    TownId: '@TownId',
                    StartPage: '@StartPage',
                    PageSize: numberAdsPerPage
                }, headers: headers
            },
            delete: {method: 'DELETE', params: {id: '@id'}, headers: headers},
            getAdById: {method: 'GET', params: {id: '@id'}, headers: headers},
            update: {method: 'PUT', params: {id: '@id'}, headers: headers}
        }),
        approveAdResource = $resource(baseServiceUrl + '/admin/Ads/Approve/:id', null, {
            approveAd: {method: 'PUT', params: {id: '@id'}, headers: headers}
        }),
        rejectAdResource = $resource(baseServiceUrl + '/admin/Ads/Reject/:id', null, {
            rejectAd: {method: 'PUT', params: {id: '@id'}, headers: headers}
        })
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
                    id: ad.id
                }, ad
            ).$promise;
        },
        getById: function (adId) {
            return userAdsResource.getById({id: adId}).$promise;
        },
        getAdminAds: function (startPage, status, categoryId, townId) {
            return adminAdsResource.getAllAds({
                StartPage: startPage,
                Status: status,
                CategoryId: categoryId,
                TownId: townId

            }).$promise;
        },
        approveAd: function (id) {
            return approveAdResource.approveAd({id: id}).$promise;
        },
        rejectAd: function (id) {
            return rejectAdResource.rejectAd({id: id}).$promise;
        },
        deleteAdminAd: function (id) {
            return adminAdsResource.delete({id: id}).$promise;
        },
        getAdminAdById: function (id) {
            return adminAdsResource.getAdById({id: id}).$promise;
        },
        updateAdminAd: function (ad) {
            return adminAdsResource.update({id: ad.id}, ad).$promise;
        }
    }
}]);