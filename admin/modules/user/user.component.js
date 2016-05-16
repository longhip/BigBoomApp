(function() {
    'use strict';

    angular
        .module('BigBoomApp.User')
        .controller('UserController', UserController);


    function UserController(Core,USER_CONSTANT) {
        var vm = this;
        function __construct() {
            vm.user = {};
            vm.avatars = [
                'public/avatars/avatar1.jpg',
                'public/avatars/avatar2.jpg',
                'public/avatars/avatar3.jpg',
                'public/avatars/avatar4.jpg',
                'public/avatars/avatar5.jpg',
                'public/avatars/avatar6.jpg',
                'public/avatars/avatar7.jpg',
                'public/avatars/avatar8.jpg',
            ];
            vm.roles = {
                1: { value: 1, name: 'Quản trị viên' },
                2: { value: 2, name: 'Chủ cửa hàng' },
                3: { value: 3, name: 'Nhân viên' },
            };
            vm.users = [];
            vm.moduleApiUrl = Core.$rootScope.serverApiUrl + 'user';
        }

        __construct();

        vm.index = function() {
            Core.apiRequest('GET', vm.moduleApiUrl, '', '').then(function(response) {
                if (response.data.status) {
                    vm.users = response.data.data;
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.changeInformation = function(form) {
          Core.validateHandle(form).success(function() {
            Core.apiRequest('PUT', vm.moduleApiUrl + '/information', vm.user, '').then(function(response) {
                if (response.data.status) {
                    Core.$cookieStore.put('member', response.data.data);
                    Core.$rootScope.rootAuth = response.data.data;
                    Core.toastyPopSuccess(response.data.message);
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
          }).error(function(){
            Core.toastyPopErrors('MESSAGE.FORM_INVALID');
          });
        };

        vm.changePassword = function(form) {
            Core.validateHandle(form).success(function() {
                Core.apiRequest('PUT', vm.moduleApiUrl + '/password', vm.user, '').then(function(response) {
                    if (response.data.status) {
                        Core.toastyPopSuccess(response.data.message);
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
              }).error(function(){
                Core.toastyPopErrors('MESSAGE.FORM_INVALID');
              });
        };

        vm.changeAvatar = function() {
            Core.apiRequest('PUT', vm.moduleApiUrl + '/avatar', vm.user, '').then(function(response) {
                if (response.data.status) {
                    Core.$cookieStore.put('member', response.data.data);
                    Core.$rootScope.rootAuth = response.data.data;
                    Core.toastyPopSuccess(response.data.message);
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.setAvatar = function(avatar) {
            vm.user.avatar = avatar;
        };

        vm.store = function(form) {
            Core.validateHandle(form).success(function() {
                Core.apiRequest('POST', vm.moduleApiUrl, vm.user, '').then(function(response) {
                    if (response.data.status) {
                        Core.$state.go('app.user.all');
                        Core.toastyPopSuccess(response.data.message);
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            }).error(function() {
                Core.toastyPopErrors('MESSAGE.FORM_INVALID');
            });
        };

        vm.profile = function() {
            Core.apiRequest('GET', vm.moduleApiUrl + '/profile', '', '').then(function(response) {
                if (response.data.status) {
                    vm.user = response.data.data;
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        /*
          |---------------------------------------------------------------------------------------------
          | State Change
          |---------------------------------------------------------------------------------------------
        */
        vm.backToIndex = function() {
            Core.$state.go('app.user.all');
        };
        vm.create = function() {
            Core.$state.go('app.user.create');
        };
        vm.goToProfile = function() {
            Core.$state.go('app.user.profile');
        };
    }
})();
