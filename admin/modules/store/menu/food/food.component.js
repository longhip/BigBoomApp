
(function() {
    'use strict';

    angular
        .module('BigBoomApp.Store')
        .controller('FoodController', FoodController);

    function FoodController($uibModalInstance,Core, thisMenu, thisFood) {
        
        var vm = this;

        function __construct() {
            vm.thisMenu = thisMenu;
            vm.food = {
                galleries: [],
                tags: [],
                feature_image: null,
                photos: [],
                listPhotoRemoved: []
            };
            vm.foodId = thisFood._id;
            vm.moduleApiUrl = Core.$rootScope.serverApiUrl + 'store/food';  
        }
        __construct();


        /*
          |--------------------------------------------------------------------------
          | Start Food
          |--------------------------------------------------------------------------
        */

        vm.store = function(form) {
            Core.validateHandle(form).success(function() {
                Core.apiRequest('POST', vm.moduleApiUrl + '/' + vm.thisMenu._id, vm.food, '').then(function(response) {
                    if (response.data.status) {
                        $uibModalInstance.close(response.data.data);
                        Core.toastyPopSuccess(response.data.message);
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            }).error(function() {
                Core.toastyPopErrors('MESSAGE.FORM_INVALID');
            });
        };

        vm.close = function(){
            $uibModalInstance.dismiss('cancel');
        };

        vm.edit = function(){
            Core.apiRequest('GET', vm.moduleApiUrl + '/' + vm.foodId, '', '').then(function(response) {
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
                            $uibModalInstance.close(response.data.data);
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

        vm.cancelCreateFood = function(){
            var i = 0;
            if(vm.food.photos.length > 0){
                angular.forEach(vm.food.photos, function(photo){
                    i++;
                    Core.removeSingleFile(photo.path).then(function(){
                        if(i == vm.food.photos.length){
                            $uibModalInstance.dismiss('cancel');
                        }
                    });
                });
            } else {
                $uibModalInstance.dismiss('cancel');
            }
        }

        

        // for create
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

        //for edit

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
                            $uibModalInstance.dismiss('cancel');
                        }
                    });
                });
            } else {
                $uibModalInstance.dismiss('cancel');
            }
        }

    }
})();
