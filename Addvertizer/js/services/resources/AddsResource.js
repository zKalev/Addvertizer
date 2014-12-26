'use strict';

addApp.factory('AddsResource', ['$resource',  'baseServiceUrl', function($resource, baseServiceUrl) {
  var headers = {}
    var AddsResource = $resource(baseServiceUrl+'/ads:id' , null, {
        'create': { method: 'POST', params: { id: '@id' }, isArray: false, headers: headers },
        'public': {  method: 'GET', isArray: true },
        'all': {  method: 'GET',params:{PageSize:5} },
        'byId': { method: 'GET', params: { id: '@id' }, isArray: false, headers: headers },
        'join': { method:'PUT', params: { id: '@id' }, isArray: false, headers: headers }
    });

    return {
        create: function(trip) {
            return AddsResource.create(trip).$promise;
        },
        public: function() {
            return AddsResource.public();
        },
        all: function(request) {
            return AddsResource.all(request).$promise;
        },
        byId: function(id) {
            return AddsResource.byId({id: id});
        },
        join: function(id) {
            return AddsResource.join({id: id}).$promise;
        }
    }
}]);