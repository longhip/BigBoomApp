'use strict';
angular.module('BigBoomApp.Store').controller('StoreCtrl', function($rootScope, $timeout, $http, $state, $scope, $cookieStore,CommonFactory, CommonApiRequest, StoreFactory, Upload, Toasty, STORE_CONSTANT) {
    function __construct() {
        $scope.store = {};
        $scope.cities = StoreFactory.cities();
        $scope.regions = StoreFactory.regions();
        $scope.times = StoreFactory.times();
        $scope.optionsEditor = StoreFactory.optionsEditor();
        $scope.moduleApiUrl = $rootScope.serverApiUrl + STORE_CONSTANT.MODULE_URL;
        $scope.articles = [];
    }
    __construct();

    $scope.index = function() {
        CommonApiRequest.handle('GET', $scope.moduleApiUrl, '', '').success(function(response) {
            if (response.status) {
                $scope.store = response.data.store;
                $scope.articles = response.data.articles;
            }
        });
    };

    $scope.update = function(form) {
      CommonFactory.validateHandle(form).success(function(){
        CommonApiRequest.handle('PUT', $scope.moduleApiUrl, $scope.store, '').success(function(response) {
            if (response.status) {
                $scope.store = response.data.store;
                Toasty.popSuccess(response.message);
            }
        });
      }).error(function(){
        Toasty.popErrors('MESSAGE.FORM_INVALID');
      });
    };

    $scope.changeCoverImage = function(file) {
        if (file) {
            file.upload = Upload.upload({
                url: $scope.moduleApiUrl + '/cover-image',
                data: { cover_image: file },
                headers: { 'x-access-token': $cookieStore.get('token') }
            });

            file.upload.then(function(response) {
                $timeout(function() {
                    $scope.store = response.data.data.store;
                    $scope.$digest();
                });
            }, function(response) {
                if (response.status > 0) {
                    console.log('upload errors');
                }
            }, function(evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        }
    };

    $scope.changeLogo = function(dataUrl, name) {
        Upload.upload({
            url: $scope.moduleApiUrl + '/logo',
            data: {
                logo: Upload.dataUrltoBlob(dataUrl, name)
            },
            headers: { 'x-access-token': $cookieStore.get('token') }
        }).then(function(response) {
            $timeout(function() {
                $scope.store = response.data.data.store;
                $scope.$digest();
                Toasty.popSuccess(response.data.message);
            });
        }, function(response) {
            Toasty.popErrors('MESSAGE.SOMETHING_WENT_WRONG');
        }, function(evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    };

});
