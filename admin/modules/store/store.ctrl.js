(function() {
    'use strict';

    angular
      .module('BigBoomApp.Store')
      .controller('StoreController', StoreController);

    function StoreController(Core,STORE_CONSTANT,StoreFactory) {
        var vm = this;
        function __construct() {
            vm.store = {};
            vm.cities = StoreFactory.cities();
            vm.regions = StoreFactory.regions();
            vm.times = StoreFactory.times();
            vm.optionsEditor = StoreFactory.optionsEditor();
            vm.moduleApiUrl = Core.$rootScope.serverApiUrl + STORE_CONSTANT.MODULE_URL;
            vm.articles = [];
        }
        __construct();

        vm.index = function() {
            Core.apiRequest('GET', vm.moduleApiUrl, '', '').success(function(response) {
                if (response.status) {
                    vm.store = response.data.store;
                    vm.articles = response.data.articles;
                }
            });
        };

        vm.update = function(form) {
            Core.validateHandle(form).success(function(){
                Core.apiRequest('PUT', vm.moduleApiUrl, vm.store, '').success(function(response) {
                    if (response.status) {
                        vm.store = response.data.store;
                        Core.toastyPopSuccess(response.message);
                    }
                });
            }).error(function(){
                Core.toastyPopErrors('MESSAGE.FORM_INVALID');
            });
        };

        vm.changeCoverImage = function(file) {
            if (file) {
                file.upload = Core.Upload.upload({
                    url: vm.moduleApiUrl + '/cover-image',
                    data: { cover_image: file },
                    headers: { 'x-access-token': Core.$cookieStore.get('token') }
                });

                file.upload.then(function(response) {
                    Core.$timeout(function() {
                        vm.store = response.data.data.store;
                        Core.toastyPopSuccess(response.data.message);
                    });
                }, function(response) {
                    if (response.status > 0) {
                        Toasty.popErrors('MESSAGE.SOMETHING_WENT_WRONG');
                    }
                }, function(evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        };

        vm.changeLogo = function(dataUrl, name) {
            Core.Upload.upload({
                url: vm.moduleApiUrl + '/logo',
                data: {
                    logo: Core.Upload.dataUrltoBlob(dataUrl, name)
                },
                headers: { 'x-access-token': Core.$cookieStore.get('token') }
            }).then(function(response) {
                Core.$timeout(function() {
                    vm.store = response.data.data.store;
                    Core.toastyPopSuccess(response.data.message);
                });
            }, function(response) {
                Toasty.popErrors('MESSAGE.SOMETHING_WENT_WRONG');
            }, function(evt) {
                vm.progress = parseInt(100.0 * evt.loaded / evt.total);
            });
        };
    }
})();
