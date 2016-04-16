'use strict';
angular.module('BigBoomApp.User').controller('UserCtrl', function($rootScope, $state, $scope, $cookieStore, CommonFactory, CommonApiRequest, UserFactory, Toasty, USER_CONSTANT) {

    function __construct() {
        $scope.user = {};
        $scope.avatars = [
            USER_CONSTANT.AVATAR1,
            USER_CONSTANT.AVATAR2,
            USER_CONSTANT.AVATAR3,
            USER_CONSTANT.AVATAR4,
            USER_CONSTANT.AVATAR5,
            USER_CONSTANT.AVATAR6,
            USER_CONSTANT.AVATAR7,
            USER_CONSTANT.AVATAR8,
        ];
        $scope.roles = {
            1: { value: 1, name: 'Quản trị viên' },
            2: { value: 2, name: 'Chủ cửa hàng' },
            3: { value: 3, name: 'Nhân viên' },
        };
        $scope.users = [];
        $scope.moduleApiUrl = $rootScope.serverApiUrl + USER_CONSTANT.MODULE_URL;
    }

    __construct();

    $scope.index = function() {
        CommonApiRequest.handle('GET', $scope.moduleApiUrl, '', '').then(function(response) {
            if (response.data.status) {
                $scope.users = response.data.data;
            } else {
                Toasty.popErrors(response.data.message);
            }
        });
    };

    $scope.changeInformation = function(form) {
      CommonFactory.validateHandle(form).success(function() {
        CommonApiRequest.handle('PUT', $scope.moduleApiUrl + '/information', $scope.user, '').then(function(response) {
            if (response.data.status) {
                $cookieStore.put('member', response.data.data);
                $rootScope.rootAuth = response.data.data;
                Toasty.popSuccess(response.data.message);
            } else {
                Toasty.popErrors(response.data.message);
            }
        });
      }).error(function(){
        Toasty.popErrors('MESSAGE.FORM_INVALID');
      });
    };

    $scope.changePassword = function(form) {
        CommonFactory.validateHandle(form).success(function() {
            CommonApiRequest.handle('PUT', $scope.moduleApiUrl + '/password', $scope.user, '').then(function(response) {
                if (response.data.status) {
                    Toasty.popSuccess(response.data.message);
                } else {
                    Toasty.popErrors(response.data.message);
                }
            });
          }).error(function(){
            Toasty.popErrors('MESSAGE.FORM_INVALID');
          });
    };

    $scope.changeAvatar = function() {
        CommonApiRequest.handle('PUT', $scope.moduleApiUrl + '/avatar', $scope.user, '').then(function(response) {
            if (response.data.status) {
                $cookieStore.put('member', response.data.data);
                $rootScope.rootAuth = response.data.data;
                Toasty.popSuccess(response.data.message);
            } else {
                Toasty.popErrors(response.data.message);
            }
        });
    };

    $scope.setAvatar = function(avatar) {
        $scope.user.avatar = avatar;
    };

    $scope.store = function(form) {
        CommonFactory.validateHandle(form).success(function() {
            CommonApiRequest.handle('POST', $scope.moduleApiUrl, $scope.user, '').then(function(response) {
                if (response.data.status) {
                    $state.go('app.user.all');
                    Toasty.popSuccess(response.data.message);
                } else {
                    Toasty.popErrors(response.data.message);
                }
            });
        }).error(function() {
            Toasty.popErrors('MESSAGE.FORM_INVALID');
        });
    };

    $scope.profile = function() {
        CommonApiRequest.handle('GET', $scope.moduleApiUrl + '/profile', '', '').then(function(response) {
            if (response.data.status) {
                $scope.user = response.data.data;
            } else {
                Toasty.popErrors(response.data.message);
            }
        });
    };

});
