addApp.factory('UserResource', ['$resource', 'AuthorizationService', 'baseServiceUrl','numberUsersPerPAge', function ($resource, AuthorizationService, baseServiceUrl,numberUsersPerPAge) {
    var headers = AuthorizationService.getAuthorizationHeader(),
        userResource = $resource(baseServiceUrl + '/admin/Users', null, {

            all: {
                method: 'GET', params: {
                    StartPage: '@StartPage',
                    PageSize: numberUsersPerPAge
                }, headers: headers
            }
        }),
        userProfile = $resource(baseServiceUrl + '/user/profile', null, {
            getUserProfile: {
                method: 'GET', isArray: false, headers: headers
            },
            updateUserProfile: {method: 'PUT', isArray: false, headers: headers}
        });

    return {

        all: function (startPage) {
            return userResource.all({StartPage: startPage}).$promise;
        },
        getUserProfile: function () {
            return userProfile.getUserProfile().$promise;
        },
        updateUserProfile: function (user) {
            return userProfile.updateUserProfile(user).$promise;
        }
    }

}])
