'use strict';
angular.module('BigBoomApp.Auth').controller('AuthCtrl', function($rootScope, $timeout, $window, $scope, $state, $cookieStore, $location, CommonApiRequest, Toasty) {

    function __construct() {
        $scope.credential = {};
        $scope.isLoading = false;
        $scope.isSubMitting = false;
        $scope.moduleApiUrl = $rootScope.serverApiUrl + 'auth/';
        $scope.style = {
            height: $(document).height() + 'px'
        };
    }
    __construct();

    /**
     * Login
     * @response {object} [put data to cookies and path to dashboard]
     */
    $scope.login = function() {
        $scope.isSubMitting = true;
        $timeout(function(){
          $scope.isSubMitting = false;
        },2000);
        CommonApiRequest.handle('POST', $scope.moduleApiUrl + 'login', $scope.credential, '').then(function(response) {
            if (response.data.status) {
                $cookieStore.put('member', response.data.user);
                $cookieStore.put('token', response.data.token);
                $cookieStore.put('store', response.data.store);
                Toasty.popSuccess(response.data.message);
                $state.go('app.dashboard');
            } else {
                Toasty.popErrors(response.data.message);
            }
        });
    };
    /**
     * Logout
     * @response {object} [put data to cookies and path to dashboard]
     */
    $scope.logout = function() {
        $cookieStore.remove('member');
        $cookieStore.remove('token');
        $cookieStore.remove('store');
        Toasty.popSuccess('MESSAGE.LOGOUT_SUCCESS');
        $state.go('auth.login');
    };
});
