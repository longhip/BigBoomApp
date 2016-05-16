(function() {
    'use strict';

    angular
      .module('BigBoomApp.Store')
      .controller('MenuController', MenuController);


    function MenuController(Core,$stateParams) {

        var vm = this;

        function __construct() {
            vm.listMenuActive = [];
            vm.listMenuNonActive = [];
            vm.menu = {};
            vm.thisMenu = {
                listFood: []
            };
            vm.food = {};
            vm.listFood = [];
            vm.query = '';
            vm.comment = {};
            vm.moduleApiMenuUrl = Core.$rootScope.serverApiUrl + 'store/menu';
            vm.moduleApiFoodUrl = Core.$rootScope.serverApiUrl + 'store/food';
            vm.defaultLimitComment = 10;
            vm.isEditMenu = false;
            vm.isCreateMenu = false;
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
                    vm.listMenuActive = response.data.data.listMenuActive;
                    vm.listMenuNonActive = response.data.data.listMenuNonActive;
                    vm.thisMenu = response.data.data.listMenuActive[0];
                    vm.thisMenu.listFood = response.data.data.listFood;
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
                        vm.listMenuActive.push(response.data.data);
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
                        vm.listMenuActive[vm.index] = response.data.data;
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
                vm.listMenuActive[vm.index] = vm.oldMenu;
            }
            vm.isCreateMenu = false;
            vm.isEditMenu = false;
        };

        vm.activeMenu = function(menu){
            var index = vm.listMenuNonActive.indexOf(menu);
            vm.menu = menu;
            vm.menu.active = 1;
            Core.apiRequest('PUT', vm.moduleApiMenuUrl + '/active/' + vm.menu._id , vm.menu, '').then(function(response) {
                if (response.data.status) {
                    vm.listMenuNonActive.splice(index,1);
                    vm.listMenuActive.push(vm.menu);
                    Core.toastyPopSuccess(response.data.message);
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.moveTrashMenu = function(menu){
            var index = vm.listMenuActive.indexOf(menu);
            vm.menu = menu;
            vm.menu.active = 0;
            Core.apiRequest('PUT', vm.moduleApiMenuUrl + '/active/' + vm.menu._id , vm.menu, '').then(function(response) {
                if (response.data.status) {
                    vm.listMenuActive.splice(index,1);
                    vm.listMenuNonActive.push(vm.menu);
                    Core.toastyPopSuccess(response.data.message);
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.deleteMenu = function(menu){
            Core.sweetAlertHandle('LABEL.DO_YOU_WANT_REMOVE_THIS_MENU').then(function(){
                var index = vm.listMenuActive.indexOf(menu);
                vm.menu = menu;
                Core.apiRequest('DELETE', vm.moduleApiMenuUrl + '/' + vm.menu._id , '', '').then(function(response) {
                    if (response.data.status) {
                        vm.listMenuNonActive.splice(index,1);
                        Core.sweetAlert.swal(Core.$translate.instant('LABEL.DELETED'), Core.$translate.instant('LABEL.THIS_MENU_HAS_DELETED'), 'success');
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            });
        }
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

        vm.createFood = function(){
            var modalInstance = Core.$uibModal.open({
                animation: true,
                templateUrl: 'modules/store/menu/food/create.view.html',
                controller: 'FoodController as vm',
                size: 'lg',
                resolve: {
                        thisMenu: function () {
                            return vm.thisMenu;
                        },
                        thisFood: function (){
                            return {};
                        }
                    }
                });
                modalInstance.result.then(function (food) {
                    vm.thisMenu.listFood.push(food);
                }, function () {
                  
            }); 
        };

        vm.editThisFood = function(food,type){
            var index = vm.thisMenu.listFood.indexOf(food);
            var modalInstance = Core.$uibModal.open({
                animation: true,
                templateUrl: 'modules/store/menu/food/edit.view.html',
                controller: 'FoodController as vm',
                size: 'lg',
                resolve: {
                        thisMenu: function () {
                            return vm.thisMenu;
                        },
                        thisFood: function (){
                            return food;
                        }
                    }
                });
                modalInstance.result.then(function (food) {
                    if(type == 'fromDetail'){
                        vm.food.name = food.name;
                        vm.food.content = food.content;
                        vm.food.sku = food.sku;
                        vm.food.description = food.description;
                        vm.food.feature_image = food.feature_image;
                        vm.food.galleries = food.galleries;
                        vm.food.price_real = food.price_real;
                        vm.food.price = food.price;
                        vm.food.tags = food.tags;
                    }else{
                        vm.thisMenu.listFood[index] = food;
                    }
                }, function () {
                  
            }); 
        }

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
                        if(type == 'fromDetail'){
                            vm.backToIndex();
                        }else{
                            vm.thisMenu.listFood.splice(index, 1);
                        }
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
          | FOOD COMMENTS
          |---------------------------------------------------------------------------------------------
        */

        vm.storeComment = function() {
            Core.apiRequest('POST', vm.moduleApiFoodUrl + '/comment/' + vm.food._id, vm.comment, '').then(function(response) {
                if (response.data.status) {
                    var comment = {
                        _id: response.data.data._id,
                        content: response.data.data.content,
                        created_at: response.data.data.created_at,
                        total_replied: 0,
                        users: [],
                    };
                    comment.users.push(Core.$rootScope.rootAuth);
                    vm.food.comments.splice(0, 0, comment);
                    vm.food.total_comment += 1;
                    vm.comment = {};
                    Core.toastyPopSuccess(response.data.message);
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.updateComment = function(comment_index, comment) {
            Core.apiRequest('PUT', vm.moduleApiFoodUrl + '/comment/' + comment._id, comment, '').then(function(response) {
                if (response.data.status) {
                    vm.food.comments[comment_index].content = comment.content;
                    Core.toastyPopSuccess(response.data.message);
                    comment.isEditComment = false;
                } else {
                    Core.toastyPopErrors(response.data.message);
                    comment.isEditComment = false;
                }
            });
        };

        vm.updateReplyComment = function(comment_index, reply_index, reply) {
            Core.apiRequest('PUT', vm.moduleApiFoodUrl + '/comment/' + reply._id, reply, '').then(function(response) {
                if (response.data.status) {
                    vm.food.comments[comment_index].replieds[reply_index].content = reply.content;
                    Core.toastyPopSuccess(response.data.message);
                    reply.isEditReplyComment = false;
                } else {
                    Core.toastyPopErrors(response.data.message);
                    reply.isEditReplyComment = false;
                }
            });
        };

        vm.getReplyComment = function(comment) {
            comment.isReply = true;
            if (comment.total_replied > 0) {
                Core.apiRequest('GET', vm.moduleApiFoodUrl + '/comment/replied/' + vm.food._id + '/' + comment._id, '', '').then(function(response) {
                    if (response.data.status) {
                        comment.replieds = response.data.data;
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            } else {
                comment.replieds = [];
            }
        };

        vm.replyComment = function(comment) {
            if(comment.reply_content != null && comment.reply_content != ''){
                var reply = {
                    content: comment.reply_content,
                    total_replied: comment.total_replied,
                    users: []
                };
                Core.apiRequest('POST', vm.moduleApiFoodUrl + '/comment/reply/' + vm.food._id + '/' + comment._id, reply, '').then(function(response) {
                    if (response.data.status) {
                        reply.users.push(Core.$rootScope.rootAuth);
                        reply.created_at = response.data.data.created_at;
                        comment.total_replied += 1;
                        reply._id = response.data.data._id;
                        comment.replieds.push(reply);
                        comment.reply_content = '';
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            }
        };

        vm.loadMoreComment = function() {
            Core.apiRequest('GET', vm.moduleApiFoodUrl + '/comment/more/' + vm.food._id, '', { limit: vm.defaultLimitComment, skip: vm.food.comments.length }).then(function(response) {
                if (response.data.status) {
                    vm.food.comments = vm.food.comments.concat(response.data.data);
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.destroyComment = function(comment_index, comment) {
            Core.sweetAlertHandle('LABEL.DO_YOU_WANT_REMOVE_THIS_COMMENT').then(function(){
                Core.apiRequest('DELETE', vm.moduleApiFoodUrl + '/comment/' + vm.food._id + '/' + comment._id, '', { type: 'comment' }).then(function(response) {
                    if (response.data.status) {
                        if (parseInt(response.data.data.ok) === 1) {
                            vm.food.comments.splice(comment_index, 1);
                            vm.food.total_comment -= 1;
                            Core.toastyPopSuccess(response.data.message);
                            Core.sweetAlert.swal(Core.$translate.instant('LABEL.DELETED'), Core.$translate.instant('LABEL.THIS_COMMENT_HAS_DELETED'), 'success');
                        } else {
                            Core.toastyPopErrors('MESSAGE.SOMETHING_WENT_WRONG');
                        }
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            },function(){

            });
        };

        vm.destroyRepliedComment = function(comment_index, comment, reply_index, reply) {
            Core.sweetAlertHandle('LABEL.DO_YOU_WANT_REMOVE_THIS_COMMENT').then(function(){
                Core.apiRequest('DELETE', vm.moduleApiFoodUrl + '/comment/' + vm.food._id + '/' + reply._id, '', { type: 'replied_comment', parent_comment_id: comment._id }).then(function(response) {
                    if (response.data.status) {
                        if (parseInt(response.data.data.ok) === 1) {
                            vm.food.comments[comment_index].replieds.splice(reply_index, 1);
                            vm.food.comments[comment_index].total_replied -= 1;
                            Core.toastyPopSuccess(response.data.message);
                            Core.sweetAlert.swal(Core.$translate.instant('LABEL.DELETED'), Core.$translate.instant('LABEL.THIS_COMMENT_HAS_DELETED'), 'success');
                        } else {
                            Core.toastyPopErrors('MESSAGE.SOMETHING_WENT_WRONG');
                        }
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            });
        };

        /*
          |--------------------------------------------------------------------------
          | Start Food
          |--------------------------------------------------------------------------
        */

        /*
          |---------------------------------------------------------------------------------------------
          | State Change
          |---------------------------------------------------------------------------------------------
        */
        vm.backToIndex = function() {
            Core.$state.go('app.store.menu.index');
        };
        vm.create = function() {
            Core.$state.go('app.store.article.create');
        };
        vm.edit = function(id) {
            Core.$state.go('app.store.article.edit', { article_id: id });
        };
        vm.detailThisFood = function(food_id) {
            Core.$state.go('app.store.menu.show_food', { food_id: food_id });
        };
    }
})();

