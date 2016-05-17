(function() {
	'use strict';

	angular
	  	.module('BigBoomApp.Store')
	  	.controller('PhotoController', PhotoController);


	function PhotoController(Core, $scope) {

		var vm = this;

        function __construct(){
            vm.albums               = [];
            vm.photos               = [];
            vm.moduleApiUrl         = Core.$rootScope.serverApiUrl + 'store/photo';
            vm.moduleAlbumApiUrl    = Core.$rootScope.serverApiUrl + 'store/album';
            vm.total_photo          = 0;
            vm.total_album          = 0;
        }
        __construct();

        vm.index = function(){
            Core.apiRequest('GET', vm.moduleApiUrl,'',{limit: 20, skip: 0}).then(function(response){
                if(response.data.status){
                    vm.photos       = response.data.data.photos;
                    vm.total_photo  = response.data.data.total;
                } else {

                }
            });
            Core.apiRequest('GET', vm.moduleAlbumApiUrl,'',{limit: 3, skip: 0}).then(function(response){
                if(response.data.status){
                    vm.albums       = response.data.data.albums;
                    vm.total_album  = response.data.data.total;
                } else {

                }
            });
        };

        $scope.$watch('vm.files', function () {
            angular.forEach(vm.files, function(file) {
                Core.uploadSingleFile(file).then(function(file){
                    Core.apiRequest('POST', vm.moduleApiUrl,file,'').then(function(response){
                        if(response.data.status){
                            vm.photos.push(response.data.data);
                        } else {
                            Core.toastyPopErrors(response.data.message);
                        }
                    });
                },function(){
                    Core.toastyPopErrors('MESSAGE.SOMETHING_WENT_WRONG');
                })
            });
        });

        vm.morePhoto = function(){
            Core.apiRequest('GET', vm.moduleApiUrl,'',{limit: 20, skip: vm.photos.length}).then(function(response){
                if(response.data.status){
                    vm.photos       = vm.photos.concat(response.data.data.photos);
                    vm.total_photo  = response.data.data.total;
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.moreAlbum = function(){
            Core.apiRequest('GET', vm.moduleAlbumApiUrl,'',{limit: 3, skip: vm.albums.length}).then(function(response){
                if(response.data.status){
                    vm.albums       = vm.albums.concat(response.data.data.albums);
                    vm.total_photo  = response.data.data.total;
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        /*
          |--------------------------------------------------------------------------
          | ACTION OF PHOTO
          |--------------------------------------------------------------------------
        */
        vm.hideThisPhoto = function(photo){
            Core.apiRequest('PUT', vm.moduleApiUrl + '/hide/' + photo._id,'','').then(function(response){
                if(response.data.status){
                    photo.deleted = 1;
                    Core.toastyPopSuccess(response.data.message);
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.displayThisPhoto = function(photo){
            Core.apiRequest('PUT', vm.moduleApiUrl + '/display/' + photo._id,'','').then(function(response){
                if(response.data.status){
                    photo.deleted = 0;
                    Core.toastyPopSuccess(response.data.message);
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.removeThisPhoto = function(photo){
            Core.sweetAlertHandle('LABEL.DO_YOU_WANT_REMOVE_THIS_PHOTO').then(function(){
                Core.apiRequest('DELETE', vm.moduleApiUrl + '/' + photo._id,'','').then(function(response){
                    if(response.data.status){
                        vm.photos.splice(vm.photos.indexOf(photo), 1);
                        Core.toastyPopSuccess(response.data.message);
                        Core.sweetAlert.swal(Core.$translate.instant('LABEL.DELETED'), Core.$translate.instant('LABEL.THIS_PHOTO_HAS_DELETED'), 'success');
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            }, function(){

            })
        };


        /*
          |--------------------------------------------------------------------------
          | ACTION OF ALBUM
          |--------------------------------------------------------------------------
        */
        vm.hideThisAlbum = function(album){
            Core.apiRequest('PUT', vm.moduleAlbumApiUrl + '/hide/' + album._id,'','').then(function(response){
                if(response.data.status){
                    album.deleted = 1;
                    Core.toastyPopSuccess(response.data.message);
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.displayThisAlbum = function(album){
            Core.apiRequest('PUT', vm.moduleAlbumApiUrl + '/display/' + album._id,'','').then(function(response){
                if(response.data.status){
                    album.deleted = 0;
                    Core.toastyPopSuccess(response.data.message);
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.removeThisAlbum = function(album){
            Core.sweetAlertHandle('LABEL.DO_YOU_WANT_REMOVE_THIS_ALBUM').then(function(){
                Core.apiRequest('DELETE', vm.moduleAlbumApiUrl + '/' + album._id,'','').then(function(response){
                    if(response.data.status){
                        vm.albums.splice(vm.albums.indexOf(album), 1);
                        Core.toastyPopSuccess(response.data.message);
                        Core.sweetAlert.swal(Core.$translate.instant('LABEL.DELETED'), Core.$translate.instant('LABEL.THIS_ALBUM_HAS_DELETED'), 'success');
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            }, function(){

            })
        };

        vm.detailPhoto = function(photo){
            var modalInstance = Core.$uibModal.open({
                animation: true,
                templateUrl     : 'modules/store/photo/detail.view.html',
                controller      : 'PhotoModalController as vm',
                windowClass     : 'app-modal-full-width',
                resolve: {
                        PhotoInstance: function () {
                                return photo;
                        },
                        PhotosInstance: function () {
                            return vm.photos;
                        }
                    }
                });
                modalInstance.result.then(function () {
                    
                }, function () {
                  
            }); 
        };

		/*
          |--------------------------------------------------------------------------
          | GET CREATE NEW ALBUM (OPEN MODAL)
          |--------------------------------------------------------------------------
        */

		vm.createAlbum = function(){
            var modalInstance = Core.$uibModal.open({
                animation: true,
                templateUrl		: 'modules/store/photo/album/create.view.html',
                controller 		: 'AlbumModalController as vm',
                windowClass 	: 'app-modal-full-width',
                resolve: {
                        AlbumInstance: function () {
                            return null;
                        }
                    }
                });
                modalInstance.result.then(function (album) {
                    if(album){
                        vm.albums.push(album);
                    }
                }, function () {
                  
            }); 
        };

        vm.editAlbum = function(album){
            var index = vm.albums.indexOf(album);
            var modalInstance = Core.$uibModal.open({
                animation: true,
                templateUrl     : 'modules/store/photo/album/edit.view.html',
                controller      : 'AlbumModalController as vm',
                windowClass     : 'app-modal-full-width',
                resolve: {
                        AlbumInstance: function () {
                            return album;
                        }
                    }
                });
                modalInstance.result.then(function (album) {
                    if(album){
                        vm.albums[index] = album;
                    }
                }, function () {
                  
            }); 
        },

        vm.detailAlbum = function(album){
            var index = vm.albums.indexOf(album);
            var modalInstance = Core.$uibModal.open({
                animation: true,
                templateUrl     : 'modules/store/photo/album/detail.view.html',
                controller      : 'AlbumModalController as vm',
                windowClass     : 'app-modal-full-width',
                resolve: {
                        AlbumInstance: function () {
                            return album;
                        }
                    }
                });
                modalInstance.result.then(function (album) {
                    if(album){
                        vm.albums[index] = album;
                    }
                }, function () {
                  
            }); 
        }
	}
})();


(function() {
    'use strict';

    angular
        .module('BigBoomApp.Store')
        .controller('PhotoModalController', PhotoModalController);


    function PhotoModalController(Core,$uibModalInstance, PhotoInstance, PhotosInstance) {
        var vm = this;

        function __construct(){
            vm.photo                =   PhotoInstance;
            vm.photos               =   PhotosInstance;
            vm.photoIndex           =   vm.photos.indexOf(vm.photo);
            vm.modulePhotoApiUrl    =   Core.$rootScope.serverApiUrl + 'store/photo';
        }
        __construct();



        vm.close = function(){
            $uibModalInstance.close();
        };

        vm.editPhoto = function(){
            vm.photo.edit = true;
        };

        vm.updatePhoto = function(){
            Core.apiRequest('PUT', vm.modulePhotoApiUrl + '/' + vm.photo._id, vm.photo, '').then(function(response) {
                if (response.data.status) {
                    vm.photo.description = response.data.data.description;
                    vm.photo.edit = false;
                    Core.toastyPopSuccess(response.data.message);
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.onloadPhoto = function(){
            vm.photo.comments = [];
            Core.$timeout(function(){
                Core.apiRequest('GET', vm.modulePhotoApiUrl + '/comment/' + vm.photo._id, '', '').then(function(response) {
                    if (response.data.status) {
                        vm.photo.comments = response.data.data;
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            },1000);
        };

        vm.nextPhoto = function(){
            if(vm.photoIndex < vm.photos.length){
                vm.photoIndex       += 1;
                vm.photo            = vm.photos[vm.photoIndex];
                vm.photo.comments   = [];
                Core.apiRequest('GET', vm.modulePhotoApiUrl + '/comment/' + vm.photo._id, '', '').then(function(response) {
                    if (response.data.status) {
                        vm.photo.comments = response.data.data;
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            }
        };

        vm.previusPhoto = function(){
            if(vm.photoIndex > 0){
                vm.photoIndex  -= 1;
                vm.photo = vm.photos[vm.photoIndex];
                vm.photo.comments = [];
                Core.apiRequest('GET', vm.modulePhotoApiUrl + '/comment/' + vm.photo._id, '', '').then(function(response) {
                    if (response.data.status) {
                        vm.photo.comments = response.data.data;
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            }
        };



        vm.storeComment = function() {
            Core.apiRequest('POST', vm.modulePhotoApiUrl + '/comment/' + vm.photo._id, vm.comment, '').then(function(response) {
                if (response.data.status) {
                    var comment = {
                        _id: response.data.data._id,
                        content: response.data.data.content,
                        created_at: response.data.data.created_at,
                        total_replied: 0,
                        users: [],
                    };
                    comment.users.push(Core.$rootScope.rootAuth);
                    vm.photo.comments.splice(0, 0, comment);
                    vm.photo.total_comment += 1;
                    vm.comment = {};
                    Core.toastyPopSuccess(response.data.message);
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.updateComment = function(comment_index, comment) {
            Core.apiRequest('PUT', vm.modulePhotoApiUrl + '/comment/' + comment._id, comment, '').then(function(response) {
                if (response.data.status) {
                    vm.photo.comments[comment_index].content = comment.content;
                    Core.toastyPopSuccess(response.data.message);
                    comment.isEditComment = false;
                } else {
                    Core.toastyPopErrors(response.data.message);
                    comment.isEditComment = false;
                }
            });
        };

        vm.updateReplyComment = function(comment_index, reply_index, reply) {
            Core.apiRequest('PUT', vm.modulePhotoApiUrl + '/comment/' + reply._id, reply, '').then(function(response) {
                if (response.data.status) {
                    vm.photo.comments[comment_index].replieds[reply_index].content = reply.content;
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
                Core.apiRequest('GET', vm.modulePhotoApiUrl + '/comment/replied/' + vm.photo._id + '/' + comment._id, '', '').then(function(response) {
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
                Core.apiRequest('POST', vm.modulePhotoApiUrl + '/comment/reply/' + vm.photo._id + '/' + comment._id, reply, '').then(function(response) {
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
            Core.apiRequest('GET', vm.modulePhotoApiUrl + '/comment/more/' + vm.photo._id, '', { limit: vm.defaultLimitComment, skip: vm.photo.comments.length }).then(function(response) {
                if (response.data.status) {
                    vm.photo.comments = vm.photo.comments.concat(response.data.data);
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.destroyComment = function(comment_index, comment) {
            Core.sweetAlertHandle('LABEL.DO_YOU_WANT_REMOVE_THIS_COMMENT').then(function(){
                Core.apiRequest('DELETE', vm.modulePhotoApiUrl + '/comment/' + vm.photo._id + '/' + comment._id, '', { type: 'comment' }).then(function(response) {
                    if (response.data.status) {
                        if (parseInt(response.data.data.ok) === 1) {
                            vm.photo.comments.splice(comment_index, 1);
                            vm.photo.total_comment -= 1;
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
                Core.apiRequest('DELETE', vm.modulePhotoApiUrl + '/comment/' + vm.photo._id + '/' + reply._id, '', { type: 'replied_comment', parent_comment_id: comment._id }).then(function(response) {
                    if (response.data.status) {
                        if (parseInt(response.data.data.ok) === 1) {
                            vm.photo.comments[comment_index].replieds.splice(reply_index, 1);
                            vm.photo.comments[comment_index].total_replied -= 1;
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
    }
})();