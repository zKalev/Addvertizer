'use strict';

addApp.factory('AuthorizationService', ['Identity', function(Identity) {
    var headers = {};

    return {
        getAuthorizationHeader: function() {
            var currentUser = Identity.getCurrentUser();
            if (currentUser) {
                this.setAuthorizationHeader(currentUser['access_token']);
            }

            return headers;
        },
        setAuthorizationHeader: function(auth) {
            headers['Authorization'] = 'Bearer ' + auth;
        },
        removeAuthorizationHeader: function() {
            delete headers['Authorization'];
        }
    }
}]);