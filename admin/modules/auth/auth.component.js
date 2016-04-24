(function() {
    'use strict';

    angular
        .module('BigBoomApp.Auth')
        .controller('AuthController', AuthController);

    function AuthController(Core) {

        var vm = this;
        vm.style = {};

        function __construct() {
            vm.credential = {};
            vm.isLoading = false;
            vm.isSubMitting = false;
            vm.moduleApiUrl = Core.$rootScope.serverApiUrl + 'auth/';
            vm.style.height = Core.$cookieStore.get('_height') + 'px'
        }
        __construct();

        /**
         * Login
         * @response {object} [put data to cookies and path to dashboard]
         */
        vm.login = function() {
            vm.isSubMitting = true;
            Core.$timeout(function() {
                vm.isSubMitting = false;
            }, 2000);
            Core.apiRequest('POST', vm.moduleApiUrl + 'login', vm.credential, '').then(function(response) {
                if (response.data.status) {
                    Core.$cookieStore.put('member', response.data.user);
                    Core.$cookieStore.put('token', response.data.token);
                    Core.$cookieStore.put('store', response.data.store);
                    Core.toastyPopSuccess(response.data.message);
                    Core.$state.go('app.dashboard');
                } else {
                    Core.toastPopErrors(response.data.message);
                }
            });
        };
        /**
         * Logout
         * @response {object} [put data to cookies and path to dashboard]
         */
        vm.logout = function() {
            Core.$cookieStore.remove('member');
            Core.$cookieStore.remove('token');
            Core.$cookieStore.remove('store');
            Core.toastyPopSuccess('MESSAGE.LOGOUT_SUCCESS');
            Core.$state.go('auth.login');
        };

    }
})();
