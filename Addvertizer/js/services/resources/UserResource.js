addApp.factory('UserResource', ['$resource', 'AuthorizationService', 'baseServiceUrl', 'numberUsersPerPAge', function ($resource, AuthorizationService, baseServiceUrl, numberUsersPerPAge) {
    var headers = AuthorizationService.getAuthorizationHeader(),
        adminUsersResource = $resource(baseServiceUrl + '/admin/Users', null, {

            all: {
                method: 'GET', params: {
                    StartPage: '@StartPage',
                    PageSize: numberUsersPerPAge
                }, headers: headers
            }

        }),
        adminUpdateUsersResource = $resource(baseServiceUrl + '/admin/User', null, {
            updateUser: {method: 'PUT', params: {username: '@username'}, headers: headers}
        }),

        loggedUserProfile = $resource(baseServiceUrl + '/user/profile', null, {
            getLoggedUserProfile: {
                method: 'GET', isArray: false, headers: headers
            },
            updateLoggedUserProfile: {method: 'PUT', isArray: false, headers: headers}
        });

    return {

        all: function (startPage) {
            return adminUsersResource.all({StartPage: startPage}).$promise;
        },
        updateUser: function (user) {
            return adminUpdateUsersResource.updateUser({username: user.username}, user).$promise;
        },


        getLoggedUserProfile: function () {
            return loggedUserProfile.getLoggedUserProfile().$promise;
        },
        updateLoggedUserProfile: function (user) {
            return loggedUserProfile.updateLoggedUserProfile(user).$promise;
        }
    }

}])
