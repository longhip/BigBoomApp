(function() {
	'use strict';

	angular
	  	.module('BigBoomApp.Store')
	  	.controller('AlbumController', AlbumController);

	function AlbumController(Core) {
		

	}
})();



(function() {
	'use strict';

	angular
	  	.module('BigBoomApp.Store')
	  	.controller('AlbumModalController', AlbumModalController);

	function AlbumModalController(Core,$uibModalInstance,$scope, AlbumInstance) {
		
		var vm = this;

		function __construct(){
			vm.moduleApiUrl = Core.$rootScope.serverApiUrl + 'store/album';
			vm.modulePhotoApiUrl = Core.$rootScope.serverApiUrl + 'store/photo';

			if(AlbumInstance){
				vm.album = AlbumInstance;
				vm.album.listPhotoInserted = [];
                vm.album.listPhotoRemoved = [];
                vm.oldPhotos = JSON.parse(JSON.stringify(vm.album.photos));
			} else {
				vm.album = {
					name:'',
					description:'',
					photos:[]
				};
			}
			vm.comment = {};
		}
		__construct();

		vm.store = function(){
			Core.apiRequest('POST',vm.moduleApiUrl,vm.album,'').then(function(response){
				if(response.data.status){
					$uibModalInstance.close(response.data.data);
				} else {

				}
			})
		}

		$scope.$watch('vm.files', function () {
			angular.forEach(vm.files, function(file) {
                Core.uploadSingleFile(file).then(function(file){
                	vm.album.photos.push(file);
                },function(){
                    Core.toastyPopErrors('MESSAGE.SOMETHING_WENT_WRONG');
                })
            });
	    });

	    vm.close = function(){
			$uibModalInstance.close();
		};

		vm.removePhoto = function(index,photo){
			Core.removeSingleFile(photo).then(function(){
				vm.album.photos.splice(index,1);
			}, function(){
				Core.toastyPopErrors('MESSAGE.SOMETHING_WENT_WRONG');
			})
		}

		/*
          |--------------------------------------------------------------------------
          | EDIT ALBUM
          |--------------------------------------------------------------------------
        */

        vm.removePhotoEdit = function(index,photo){
        	vm.album.photos.splice(index,1);
        	if(photo.new){
        		Core.removeSingleFile(photo.path).then(function(){
        			angular.forEach(vm.album.listPhotoInserted, function(insertedPhoto){
        				if(photo.path == insertedPhoto.path){
        					vm.album.listPhotoInserted.splice(vm.album.listPhotoInserted.indexOf(insertedPhoto), 1);
        				}
        			});
				}, function(){
					Core.toastyPopErrors('MESSAGE.SOMETHING_WENT_WRONG');
				})
        	} else {
        		vm.album.listPhotoRemoved.push(photo);
        	}
        };

        $scope.$watch('vm.edit_files', function () {
			angular.forEach(vm.edit_files, function(file) {
                Core.uploadSingleFile(file).then(function(file){
                	file.new = true;
                	vm.album.photos.push(file);
                	vm.album.listPhotoInserted.push(file);
                },function(){
                    Core.toastyPopErrors('MESSAGE.SOMETHING_WENT_WRONG');
                })
            });
	    });

	    vm.update = function(){
	    	Core.apiRequest('PUT',vm.moduleApiUrl + '/' + vm.album._id, vm.album, '').then(function(response){
				if(response.data.status){
					$uibModalInstance.close(response.data.data);
				} else {

				}
			})
	    }

	    vm.cancelEdit = function(){
	    	vm.album.photos = vm.oldPhotos;
	    	if(vm.album.listPhotoInserted.length > 0){
	    		angular.forEach(vm.album.listPhotoInserted, function(photo){
	    			Core.removeSingleFile(photo.path).then(function(){

					}, function(){
						
					})
	    		});
	    	}
	    	$uibModalInstance.close(vm.album);
	    }

	    /*
          |--------------------------------------------------------------------------
          | VIEW ALBUM
          |--------------------------------------------------------------------------
        */

        vm.editPhoto = function(){
            vm.thisPhoto.edit = true;
        };

        vm.updatePhoto = function(){
            Core.apiRequest('PUT', vm.modulePhotoApiUrl + '/' + vm.thisPhoto._id, vm.thisPhoto, '').then(function(response) {
                if (response.data.status) {
                    vm.thisPhoto.description = response.data.data.description;
                    vm.thisPhoto.edit = false;
                    Core.toastyPopSuccess(response.data.message);
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.onloadPhoto = function(){
        	vm.photoIndex = 0;
			vm.thisPhoto = vm.album.photos[vm.photoIndex];
			vm.thisPhoto.comments = [];
			Core.$timeout(function(){
				Core.apiRequest('GET', vm.modulePhotoApiUrl + '/comment/' + vm.thisPhoto._id, '', '').then(function(response) {
	                if (response.data.status) {
	                    vm.thisPhoto.comments = response.data.data;
	                } else {
	                    Core.toastyPopErrors(response.data.message);
	                }
	            });
			},1000);
        };

        vm.nextPhoto = function(){
            if(vm.photoIndex < vm.album.photos.length){
                vm.photoIndex  += 1;
                vm.thisPhoto = vm.album.photos[vm.photoIndex];
                vm.thisPhoto.comments = [];
                Core.apiRequest('GET', vm.modulePhotoApiUrl + '/comment/' + vm.thisPhoto._id, '', '').then(function(response) {
                    if (response.data.status) {
                        vm.thisPhoto.comments = response.data.data;
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            }
        };

        vm.previusPhoto = function(){
            if(vm.photoIndex > 0){
                vm.photoIndex  -= 1;
                vm.thisPhoto = vm.album.photos[vm.photoIndex];
                vm.thisPhoto.comments = [];
                Core.apiRequest('GET', vm.modulePhotoApiUrl + '/comment/' + vm.thisPhoto._id, '', '').then(function(response) {
                    if (response.data.status) {
                        vm.thisPhoto.comments = response.data.data;
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            }
        };

        vm.storeComment = function() {
            Core.apiRequest('POST', vm.modulePhotoApiUrl + '/comment/' + vm.thisPhoto._id, vm.comment, '').then(function(response) {
                if (response.data.status) {
                    var comment = {
                        _id: response.data.data._id,
                        content: response.data.data.content,
                        created_at: response.data.data.created_at,
                        total_replied: 0,
                        users: [],
                    };
                    comment.users.push(Core.$rootScope.rootAuth);
                    vm.thisPhoto.comments.splice(0, 0, comment);
                    vm.thisPhoto.total_comment += 1;
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
                    vm.thisPhoto.comments[comment_index].content = comment.content;
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
                    vm.thisPhoto.comments[comment_index].replieds[reply_index].content = reply.content;
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
                Core.apiRequest('GET', vm.modulePhotoApiUrl + '/comment/replied/' + vm.thisPhoto._id + '/' + comment._id, '', '').then(function(response) {
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
                Core.apiRequest('POST', vm.modulePhotoApiUrl + '/comment/reply/' + vm.thisPhoto._id + '/' + comment._id, reply, '').then(function(response) {
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
            Core.apiRequest('GET', vm.modulePhotoApiUrl + '/comment/more/' + vm.thisPhoto._id, '', { limit: vm.defaultLimitComment, skip: vm.thisPhoto.comments.length }).then(function(response) {
                if (response.data.status) {
                    vm.thisPhoto.comments = vm.thisPhoto.comments.concat(response.data.data);
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.destroyComment = function(comment_index, comment) {
            Core.sweetAlertHandle('LABEL.DO_YOU_WANT_REMOVE_THIS_COMMENT').then(function(){
                Core.apiRequest('DELETE', vm.modulePhotoApiUrl + '/comment/' + vm.thisPhoto._id + '/' + comment._id, '', { type: 'comment' }).then(function(response) {
                    if (response.data.status) {
                        if (parseInt(response.data.data.ok) === 1) {
                            vm.thisPhoto.comments.splice(comment_index, 1);
                            vm.thisPhoto.total_comment -= 1;
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
                Core.apiRequest('DELETE', vm.modulePhotoApiUrl + '/comment/' + vm.thisPhoto._id + '/' + reply._id, '', { type: 'replied_comment', parent_comment_id: comment._id }).then(function(response) {
                    if (response.data.status) {
                        if (parseInt(response.data.data.ok) === 1) {
                            vm.thisPhoto.comments[comment_index].replieds.splice(reply_index, 1);
                            vm.thisPhoto.comments[comment_index].total_replied -= 1;
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