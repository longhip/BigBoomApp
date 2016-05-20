(function() {
    'use strict';

    angular
      .module('BigBoomApp.Store')
      .controller('MenuController', MenuController);


    function MenuController(Core,$stateParams, MenuFactory) {

        var vm = this;

        function __construct() {
            vm.listMenuActive = [];
            vm.listMenuNonActive = [];
            vm.menu = {};
            vm.thisFood = [];
            vm.food = {};
            vm.listFood = [];
            vm.query = '';
            vm.comment = {};
            vm.moduleApiMenuUrl = Core.$rootScope.serverApiUrl + 'store/menu';
            vm.moduleApiFoodUrl = Core.$rootScope.serverApiUrl + 'store/food';
            vm.defaultLimitComment = 10;
            vm.isEditMenu = false;
            vm.isCreateMenu = false;
            vm.oldMenuSelectedIndex = -1;
        }
        __construct();

        /*
          |--------------------------------------------------------------------------
          | Start Menu
          |--------------------------------------------------------------------------
        */

        vm.index = function() {
            Core.apiRequest('GET', vm.moduleApiMenuUrl, '', '').then(function(response) {
                if (response.data.status) {
                    vm.listMenu = response.data.data.listMenu;
                    vm.listFood = response.data.data.listFood;
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.createMenu = function(){
            vm.isCreateMenu = true;
        }

        vm.storeMenu = function(form){
            Core.validateHandle(form).success(function(){
                Core.apiRequest('POST', vm.moduleApiMenuUrl, vm.menu, '').then(function(response) {
                    if (response.data.status) {
                        vm.listMenu.push(response.data.data);
                        vm.isCreateMenu = false;
                        vm.isEditMenu = false;
                        vm.menu = {};
                        Core.toastyPopSuccess(response.data.message);
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            }).error(function() {
                Core.toastyPopErrors('MESSAGE.FORM_INVALID');
            });
        };

        vm.editMenu = function(menu){
            vm.oldMenu = JSON.parse(JSON.stringify(menu));
            vm.menu = menu;
            vm.index = vm.listMenuActive.indexOf(menu);
            vm.isEditMenu = true;
        };

        vm.updateMenu = function(form){
            Core.validateHandle(form).success(function(){
                Core.apiRequest('PUT', vm.moduleApiMenuUrl + '/' + vm.menu._id , vm.menu, '').then(function(response) {
                    if (response.data.status) {
                        vm.listMenu[vm.index] = response.data.data;
                        Core.toastyPopSuccess(response.data.message);
                        vm.isCreateMenu = false;
                        vm.isEditMenu = false;
                        vm.menu = {};
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            }).error(function() {
                Core.toastyPopErrors('MESSAGE.FORM_INVALID');
            });
        }

        vm.cancelMenu = function(menu){
            if(vm.isEditMenu){
                vm.listMenu[vm.index] = vm.oldMenu;
            }
            vm.isCreateMenu = false;
            vm.isEditMenu = false;
        };

        vm.deleteMenu = function(menu){
            Core.sweetAlertHandle('LABEL.DO_YOU_WANT_REMOVE_THIS_MENU').then(function(){
                var index = vm.listMenu.indexOf(menu);
                vm.menu = menu;
                Core.apiRequest('DELETE', vm.moduleApiMenuUrl + '/' + vm.menu._id , '', '').then(function(response) {
                    if (response.data.status) {
                        vm.listMenu.splice(index,1);
                        Core.sweetAlert.swal(Core.$translate.instant('LABEL.DELETED'), Core.$translate.instant('LABEL.THIS_MENU_HAS_DELETED'), 'success');
                        vm.viewFoodByMenu(vm.listMenu[0]);
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            });
        };

        vm.viewFoodByMenu = function(menu){
            if(vm.oldMenuSelectedIndex != -1){
                if(vm.oldMenuSelectedIndex != vm.listMenu.indexOf(menu)){
                    vm.listMenu[vm.oldMenuSelectedIndex].selected = false;
                    menu.selected = true;
                    vm.oldMenuSelectedIndex = vm.listMenu.indexOf(menu);
                    MenuFactory.getFoodByMenuId(vm.moduleApiMenuUrl + '/food-by-menu/' + menu._id).then(function(listFood){
                        vm.listFood = listFood;
                    }, function(message){
                        Core.toastyPopErrors(message);
                    });
                }
            } else {
                menu.selected = true;
                vm.oldMenuSelectedIndex = vm.listMenu.indexOf(menu);
                MenuFactory.getFoodByMenuId(vm.moduleApiMenuUrl + '/food-by-menu/' + menu._id).then(function(listFood){
                    vm.listFood = listFood;
                }, function(message){
                    Core.toastyPopErrors(message);
                });
            }
        };
        /*
          |--------------------------------------------------------------------------
          | End Menu
          |--------------------------------------------------------------------------
        */



        /*
          |--------------------------------------------------------------------------
          | Start Food
          |--------------------------------------------------------------------------
        */
        vm.hideThisFood = function(food) {
            Core.apiRequest('PUT', vm.moduleApiFoodUrl + '/hide/' + food._id, '', '').then(function(response) {
                if (response.data.status) {
                    food.active = 0;
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.showThisFood = function() {
            Core.apiRequest('GET', vm.moduleApiFoodUrl + '/' + $stateParams.food_id, '', '').then(function(response) {
                if (response.data.status) {
                    vm.food = response.data.data.food;
                    vm.foods = response.data.data.foods;
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.destroyThisFood = function(food,type) {
            var index = vm.thisMenu.listFood.indexOf(food);
            Core.sweetAlertHandle('LABEL.DO_YOU_WANT_REMOVE_THIS_FOOD').then(function(){
                Core.apiRequest('DELETE', vm.moduleApiFoodUrl + '/' + food._id, '', '').then(function(response) {
                    if (response.data.status) {
                        Core.sweetAlert.swal(Core.$translate.instant('LABEL.DELETED'), Core.$translate.instant('LABEL.THIS_FOOD_HAS_DELETED'), 'success');
                        vm.thisMenu.listFood.splice(index, 1);
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            });
        };

        vm.displayThisFood = function(food) {
            Core.apiRequest('PUT', vm.moduleApiFoodUrl + '/display/' + food._id, '', '').then(function(response) {
                if (response.data.status) {
                    food.active = 1;
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
        vm.createFood = function(){
            Core.$state.go('app.store.food.create');
        };
        vm.editThisFood = function(food){
            Core.$state.go('app.store.food.edit', { food_id: food._id });
        };
        vm.backToIndex = function() {
            Core.$state.go('app.store.menu.index');
        };
        vm.detailThisFood = function(food_id) {
            Core.$state.go('app.store.food.detail', { food_id: food_id });
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('BigBoomApp.Store')
        .factory('MenuFactory', MenuFactory);

    function MenuFactory(Core) {
        return {
            getFoodByMenuId: function(path){
                var deferred = Core.$q.defer();
                Core.apiRequest('GET', path , '', '').then(function(response) {
                    if (response.data.status) {
                        deferred.resolve(response.data.data);
                    } else {
                        deferred.reject(response.data.message);
                    }
                });
                return deferred.promise;
            }
        }
    }
})();

