addApp.factory('UserResource', ['$resource', 'AuthorizationService', 'baseServiceUrl', function ($resource, AuthorizationService, baseServiceUrl) {
    var headers = AuthorizationService.getAuthorizationHeader(),
        userResource = $resource(baseServiceUrl + '/towns', null, {

            all: {method: 'GET', isArray: true}
        }),
        userProfile = $resource(baseServiceUrl + '/user/profile', null, {
            getUserProfile: {
                method: 'GET', isArray: false, headers: headers
            },
            updateUserProfile: {method: 'PUT', isArray: false, headers: headers}
        });

    return {

        all: function () {
            return userResource.all().$promise;
        },
        getUserProfile: function () {
            return userProfile.getUserProfile().$promise;
        },
        updateUserProfile: function (user) {
            return userProfile.updateUserProfile(user).$promise;
        }
    }

}])
