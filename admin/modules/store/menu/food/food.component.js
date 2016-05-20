
(function() {
    'use strict';

    angular
        .module('BigBoomApp.Store')
        .controller('FoodController', FoodController);

    function FoodController(Core, $stateParams) {
        
        var vm = this;

        function __construct() {
            vm.food = {
                galleries: [],
                tags: [],
                feature_image: null,
                photos: [],
                listPhotoRemoved: []
            };
            vm.listMenu = [];
            vm.moduleApiUrl         = Core.$rootScope.serverApiUrl + 'store/food';
            vm.moduleApiMenuUrl     = Core.$rootScope.serverApiUrl + 'store/menu';
  
        }
        __construct();


        /*
          |--------------------------------------------------------------------------
          | BEGIN STORE FOOD
          |--------------------------------------------------------------------------
        */

        vm.onload = function(){
            Core.apiRequest('GET', vm.moduleApiMenuUrl, '', '').then(function(response) {
                if (response.data.status) {
                    vm.listMenu = response.data.data.listMenu;
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.store = function(form) {
            Core.validateHandle(form).success(function() {
                Core.apiRequest('POST', vm.moduleApiUrl, vm.food, '').then(function(response) {
                    if (response.data.status) {
                        Core.toastyPopSuccess(response.data.message);
                        vm.food = {
                            galleries: [],
                            tags: [],
                            feature_image: null,
                            photos: [],
                            listPhotoRemoved: []
                        };
                        Core.resetValidateHandle(form);
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            }).error(function() {
                Core.toastyPopErrors('MESSAGE.FORM_INVALID');
            });
        };

        vm.storeAndBackToList = function(form){
            Core.validateHandle(form).success(function() {
                Core.apiRequest('POST', vm.moduleApiUrl, vm.food, '').then(function(response) {
                    if (response.data.status) {
                        Core.toastyPopSuccess(response.data.message);
                        Core.$state.go('app.store.menu.index');
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            }).error(function() {
                Core.toastyPopErrors('MESSAGE.FORM_INVALID');
            });
        };

        vm.cancelCreateFood = function(){
            var i = 0;
            if(vm.food.photos.length > 0){
                angular.forEach(vm.food.photos, function(photo){
                    i++;
                    Core.removeSingleFile(photo.path).then(function(){
                        if(i == vm.food.photos.length){
                            vm.backToIndex();
                        }
                    });
                });
            } else {
                vm.backToIndex();
            }
        };

        vm.onSelectFeatureImage = function(file) {
            if (file) {
                Core.uploadSingleFile(file).then(function(file){
                    vm.food.photos.push(file);
                    var feature_image = file.path;
                    if (vm.food.feature_image != null) {
                        vm.food.photos.forEach(function(photo){
                            if(vm.food.feature_image == photo.path){
                                vm.food.photos.splice(vm.food.photos.indexOf(photo),1);
                            }
                        })
                        Core.removeSingleFile(vm.food.feature_image).then(function(){
                            vm.food.feature_image = feature_image;
                        });
                    }
                    vm.food.feature_image = feature_image;
                },function(){
                    Core.toastyPopErrors('MESSAGE.SOMETHING_WENT_WRONG');
                })
            }
        };

        vm.removeFeatureImage = function(type) {
            if(type == 'FROM_EDIT'){
                vm.food.photos.forEach(function(photo){
                    if(vm.food.feature_image == photo.path){
                        vm.food.photos.splice(vm.food.photos.indexOf(photo),1);
                        vm.food.listPhotoRemoved.push(photo);
                        vm.food.feature_image = null;
                    }
                })
            } else {
                if (vm.food.feature_image != null) {
                    Core.removeSingleFile(vm.food.feature_image).then(function(){
                        vm.food.photos.forEach(function(photo){
                            if(vm.food.feature_image == photo.path){
                                vm.food.photos.splice(vm.food.photos.indexOf(photo),1);
                                vm.food.feature_image = null;
                            }
                        })
                    });
                }
            }
        };

        vm.uploadImageForEditor = function(files) {
            Core.uploadSingleFile(files[0]).then(function(file){
                vm.food.photos.push(file);
                vm.editor.summernote('editor.insertImage', Core.$rootScope.serverUrl + file.path);
            },function(){
                Core.toastyPopErrors('MESSAGE.SOMETHING_WENT_WRONG');
            })
        };

        vm.onEditorMediaDelete = function(target) {
            vm.food.photos.forEach(function(photo){
                if(target.attrs.src == (Core.$rootScope.serverUrl + photo.path)){
                    vm.food.photos.splice(vm.food.photos.indexOf(photo),1);
                    Core.removeSingleFile(photo.path);
                }
            });
        };

        vm.onSelectGalleries = function(files){
            vm.files = files;
            angular.forEach(files, function(file) {
                Core.uploadSingleFile(file).then(function(file){
                    vm.food.galleries.push(file.path);
                    vm.food.photos.push(file);
                },function(){
                    Core.toastyPopErrors('MESSAGE.SOMETHING_WENT_WRONG');
                })
            });
        };

        /*
          |--------------------------------------------------------------------------
          | END STORE FOOD
          |--------------------------------------------------------------------------
        */


        /*
          |--------------------------------------------------------------------------
          | BEGIN EDIT STORE FOOD
          |--------------------------------------------------------------------------
        */
        vm.edit = function(){
            vm.onload();
            Core.apiRequest('GET', vm.moduleApiUrl + '/' + $stateParams.food_id, '', '').then(function(response) {
                if (response.data.status) {
                    vm.food = response.data.data.food;
                    vm.food.listPhotoRemoved = [];
                    vm.food.listPhotoInserted = [];
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.update = function(form) {
            new Promise(function(resolve){
                angular.forEach(vm.food.photos, function(photo){
                    photo.new = false;
                })
                resolve();
            }).then(function(){
                Core.validateHandle(form).success(function() {
                    Core.apiRequest('PUT', vm.moduleApiUrl + '/' + vm.food._id, vm.food, '').then(function(response) {
                        if (response.data.status) {
                            Core.toastyPopSuccess(response.data.message);
                        } else {
                            Core.toastyPopErrors(response.data.message);
                        }
                    });
                }).error(function() {
                    Core.toastyPopErrors('MESSAGE.FORM_INVALID');
                });
            })
        };

        vm.updateAndBackToList = function(form) {
            new Promise(function(resolve){
                angular.forEach(vm.food.photos, function(photo){
                    photo.new = false;
                })
                resolve();
            }).then(function(){
                Core.validateHandle(form).success(function() {
                    Core.apiRequest('PUT', vm.moduleApiUrl + '/' + vm.food._id, vm.food, '').then(function(response) {
                        if (response.data.status) {
                            Core.toastyPopSuccess(response.data.message);
                            Core.$state.go('app.store.menu.index');
                        } else {
                            Core.toastyPopErrors(response.data.message);
                        }
                    });
                }).error(function() {
                    Core.toastyPopErrors('MESSAGE.FORM_INVALID');
                });
            })
        };
        vm.onSelectFeatureImageEdit = function(file) {
            if (file) {
                Core.uploadSingleFile(file).then(function(file){
                    new Promise(function(resolve){
                        vm.food.photos.forEach(function(photo){
                            if(vm.food.feature_image == photo.path){
                                vm.food.photos.splice(vm.food.photos.indexOf(photo),1);
                                vm.food.listPhotoRemoved.push(photo);
                                resolve();
                            }
                        })
                    }).then(function(){
                        vm.food.photos.push(file);
                        vm.food.listPhotoInserted.push(file);
                        var feature_image = file.path;
                        vm.food.feature_image = feature_image;
                    })
                },function(){
                    Core.toastyPopErrors('MESSAGE.SOMETHING_WENT_WRONG');
                })
            }
        };

        vm.onEditorMediaDeleteEdit = function(target) {
            vm.food.photos.forEach(function(photo){
                if(target.attrs.src == (Core.$rootScope.serverUrl + photo.path)){
                    vm.food.photos.splice(vm.food.photos.indexOf(photo),1);
                    if(photo.new){
                        vm.food.listPhotoInserted.splice(vm.food.listPhotoInserted.indexOf(photo),1);
                        Core.removeSingleFile(photo.path);
                    } else {
                        vm.food.listPhotoRemoved.push(photo);
                    }
                }
            });
        };

        vm.uploadImageForEditorEdit = function(files) {
            Core.uploadSingleFile(files[0]).then(function(file){
                vm.editor.summernote('editor.insertImage', Core.$rootScope.serverUrl + file.path);
                file.new = true;
                vm.food.photos.push(file);
                vm.food.listPhotoInserted.push(file);
            },function(){
                Core.toastyPopErrors('MESSAGE.SOMETHING_WENT_WRONG');
            })
        };

        vm.onSelectGalleriesEdit = function(files){
            vm.files = files;
            angular.forEach(files, function(file) {
                Core.uploadSingleFile(file).then(function(file){
                    file.new = true;
                    vm.food.galleries.push(file.path);
                    vm.food.photos.push(file);
                    vm.food.listPhotoInserted.push(file);
                },function(){
                    Core.toastyPopErrors('MESSAGE.SOMETHING_WENT_WRONG');
                })
            });
        };

        vm.removeGallery = function(gallery, type){
            if(type == 'FROM_EDIT'){
                vm.food.photos.forEach(function(photo){
                    if(photo.path == gallery){
                        if(photo.new){
                            vm.food.galleries.splice(vm.food.galleries.indexOf(gallery),1);
                            vm.food.photos.splice(vm.food.photos.indexOf(photo),1);
                            vm.food.listPhotoInserted.splice(vm.food.listPhotoInserted.indexOf(photo),1);
                            Core.removeSingleFile(photo.path);
                        } else {
                            vm.food.galleries.splice(vm.food.galleries.indexOf(gallery),1);
                            vm.food.photos.splice(vm.food.photos.indexOf(photo),1);
                            vm.food.listPhotoRemoved.push(photo);
                        }
                    }
                })
            } else {
                Core.removeSingleFile(gallery).then(function(){
                    vm.food.galleries.splice(vm.food.galleries.indexOf(gallery),1);
                    vm.food.photos.splice(vm.food.photos.indexOf(gallery),1);
                });
            }
        };

        vm.cancelEditFood = function(){
            var i = 0;
            if(vm.food.listPhotoInserted.length > 0){
                angular.forEach(vm.food.listPhotoInserted, function(photo){
                    i++;
                    Core.removeSingleFile(photo.path).then(function(){
                        if(i == vm.food.listPhotoInserted.length){
                            Core.$state.go('app.store.menu.index');
                        }
                    });
                });
            } else {
                Core.$state.go('app.store.menu.index');
            }
        };

        /*
          |--------------------------------------------------------------------------
          | END EDIT STORE FOOD
          |--------------------------------------------------------------------------
        */


        /*
          |--------------------------------------------------------------------------
          | BEGIN SHOW DETAIL STORE FOOD
          |--------------------------------------------------------------------------
        */
        vm.show = function() {
            Core.apiRequest('GET', vm.moduleApiUrl + '/' + $stateParams.food_id, '', '').then(function(response) {
                if (response.data.status) {
                    vm.food = response.data.data.food;
                    vm.foods = response.data.data.foods;
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.destroy = function(food) {
            Core.sweetAlertHandle('LABEL.DO_YOU_WANT_REMOVE_THIS_FOOD').then(function(){
                Core.apiRequest('DELETE', vm.moduleApiUrl + '/' + food._id, '', '').then(function(response) {
                    if (response.data.status) {
                        Core.sweetAlert.swal(Core.$translate.instant('LABEL.DELETED'), Core.$translate.instant('LABEL.THIS_FOOD_HAS_DELETED'), 'success');
                        vm.backToIndex();
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            });
        };

        vm.hideThisFood = function(food) {
            Core.apiRequest('PUT', vm.moduleApiUrl + '/hide/' + food._id, '', '').then(function(response) {
                if (response.data.status) {
                    food.active = 0;
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.displayThisFood = function(food) {
            Core.apiRequest('PUT', vm.moduleApiUrl + '/display/' + food._id, '', '').then(function(response) {
                if (response.data.status) {
                    food.active = 1;
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.storeComment = function() {
            Core.apiRequest('POST', vm.moduleApiUrl + '/comment/' + vm.food._id, vm.comment, '').then(function(response) {
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
            Core.apiRequest('PUT', vm.moduleApiUrl + '/comment/' + comment._id, comment, '').then(function(response) {
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
            Core.apiRequest('PUT', vm.moduleApiUrl + '/comment/' + reply._id, reply, '').then(function(response) {
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
                Core.apiRequest('GET', vm.moduleApiUrl + '/comment/replied/' + vm.food._id + '/' + comment._id, '', '').then(function(response) {
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
                Core.apiRequest('POST', vm.moduleApiUrl + '/comment/reply/' + vm.food._id + '/' + comment._id, reply, '').then(function(response) {
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
            Core.apiRequest('GET', vm.moduleApiUrl + '/comment/more/' + vm.food._id, '', { limit: vm.defaultLimitComment, skip: vm.food.comments.length }).then(function(response) {
                if (response.data.status) {
                    vm.food.comments = vm.food.comments.concat(response.data.data);
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.destroyComment = function(comment_index, comment) {
            Core.sweetAlertHandle('LABEL.DO_YOU_WANT_REMOVE_THIS_COMMENT').then(function(){
                Core.apiRequest('DELETE', vm.moduleApiUrl + '/comment/' + vm.food._id + '/' + comment._id, '', { type: 'comment' }).then(function(response) {
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
                Core.apiRequest('DELETE', vm.moduleApiUrl + '/comment/' + vm.food._id + '/' + reply._id, '', { type: 'replied_comment', parent_comment_id: comment._id }).then(function(response) {
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
          | END SHOW DETAIL STORE FOOD
          |--------------------------------------------------------------------------
        */


        /*
          |--------------------------------------------------------------------------
          | BEGIN STATE MANAGEMENT STORE FOOD
          |--------------------------------------------------------------------------
        */
        vm.create = function(){
            Core.$state.go('app.store.food.create');
        };
        vm.editThisFood = function(food){
            Core.$state.go('app.store.food.edit', { food_id: food._id });
        };
        vm.backToIndex = function() {
            Core.$state.go('app.store.menu.index');
        };
        /*
          |--------------------------------------------------------------------------
          | END STATE MANAGEMENT STORE FOOD
          |--------------------------------------------------------------------------
        */


    }
})();
