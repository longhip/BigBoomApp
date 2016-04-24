
(function() {
    'use strict';

    angular
        .module('BigBoomApp.Store')
        .controller('ArticleController', ArticleController);

    function ArticleController(Core,ARTICLE_CONSTANT,$stateParams) {

        var vm = this;
        
        function __construct() {
             vm.article = {
                tags: [],
                photos: [],
                listPhotoRemoved: []
            };
            vm.isSearch = false;
            vm.articles = [];
            vm.query = '';
            vm.comment = {};
            vm.moduleApiUrl = Core.$rootScope.serverApiUrl + ARTICLE_CONSTANT.MODULE_URL;
            vm.defaultLimitComment = 10;
        }
        __construct();

        vm.index = function() {
            Core.apiRequest('GET', vm.moduleApiUrl, '', '').then(function(response) {
                if (response.data.status) {
                    vm.articles = response.data.data.articles;
                    vm.total = response.data.data.total;
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.store = function(form) {
            Core.validateHandle(form).success(function() {
                Core.apiRequest('POST', vm.moduleApiUrl, vm.article, '').then(function(response) {
                    if (response.data.status) {
                        Core.$state.go('app.store.article.index');
                        Core.toastyPopSuccess(response.data.message);
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            }).error(function() {
                Core.toastyPopErrors('MESSAGE.FORM_INVALID');
            });
        };

        vm.show = function() {
            Core.apiRequest('GET', vm.moduleApiUrl + '/' + $stateParams.article_id, '', '').then(function(response) {
                if (response.data.status) {
                    vm.article = response.data.data.article;
                    vm.articles = response.data.data.articles;
                    vm.article.listPhotoInserted = [];
                    vm.article.listPhotoRemoved = [];
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.update = function(form) {
            new Promise(function(resolve){
                angular.forEach(vm.article.photos, function(photo){
                    photo.new = false;
                })
                resolve();
            }).then(function(){
                Core.validateHandle(form).success(function() {
                    Core.apiRequest('PUT', vm.moduleApiUrl + '/' + vm.article._id, vm.article, '').then(function(response) {
                        if (response.data.status) {
                            vm.article.listPhotoInserted = [];
                            vm.article.listPhotoRemoved = [];
                            Core.toastyPopSuccess(response.data.message);
                        } else {
                            Core.toastyPopErrors(response.data.message);
                        }
                    });
                }).error(function() {
                    Core.toastyPopErrors('MESSAGE.FORM_INVALID');
                });
            });
        };

        vm.hideThisArticle = function(article) {
            Core.apiRequest('PUT', vm.moduleApiUrl + '/hide/' + article._id, '', '').then(function(response) {
                if (response.data.status) {
                    article.active = 0;
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.destroy = function(article,type) {
            Core.sweetAlertHandle(ARTICLE_CONSTANT.DO_YOU_WANT_REMOVE_THIS_ARTICLE).then(function(){
                Core.apiRequest('DELETE', vm.moduleApiUrl + '/' + article._id, '', '').then(function(response) {
                    if (response.data.status) {
                        if(type === 'FROM_DETAIL'){
                            vm.backToIndex();
                        } else {
                            vm.articles.splice(vm.articles.indexOf(article), 1);
                            vm.total -= 1;
                        }
                        Core.sweetAlert.swal(Core.$translate.instant('LABEL.DELETED'), Core.$translate.instant('LABEL.THIS_ARTICLE_HAS_DELETED'), 'success');
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            });
        };

        vm.displayThisArticle = function(article) {
            Core.apiRequest('PUT', vm.moduleApiUrl + '/display/' + article._id, '', '').then(function(response) {
                if (response.data.status) {
                    article.active = 1;
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.more = function() {
            if (vm.isSearch) {
                Core.apiRequest('GET', vm.moduleApiUrl + '/more/' + vm.articles.length, '', { query: vm.query }).then(function(response) {
                    if (response.data.status) {
                        vm.articles = vm.articles.concat(response.data.data);
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            } else {
                Core.apiRequest('GET', vm.moduleApiUrl + '/more/' + vm.articles.length, '', '').then(function(response) {
                    if (response.data.status) {
                        vm.articles = vm.articles.concat(response.data.data);
                    } else {
                        Core.toastyPopErrors(response.data.message);
                    }
                });
            }
        };

        vm.search = function() {
            vm.isSearch = true;
            Core.apiRequest('GET', vm.moduleApiUrl + '/search/result', '', { query: vm.query }).then(function(response) {
                if (response.data.status) {
                    vm.articles = response.data.data.articles;
                    vm.searchTotal = response.data.data.total;
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.cancelSearch = function() {
            vm.isSearch = false;
            vm.index();
        };

        vm.onSelectFeatureImage = function(file) {
            if (file) {
                Core.uploadSingleFile(file).then(function(file){
                    vm.article.photos.push(file);
                    var feature_image = file.path;
                    if (vm.article.feature_image != null) {
                        vm.food.photos.forEach(function(photo){
                            if(vm.article.feature_image == photo.path){
                                vm.article.photos.splice(vm.article.photos.indexOf(photo),1);
                            }
                        })
                        Core.removeSingleFile(vm.article.feature_image).then(function(){
                            vm.article.feature_image = feature_image;
                        });
                    }
                    vm.article.feature_image = feature_image;
                },function(){
                    Core.toastyPopErrors('MESSAGE.SOMETHING_WENT_WRONG');
                })
            }
        };

        vm.onSelectFeatureImageEdit = function(file) {
            if (file) {
                Core.uploadSingleFile(file).then(function(file){
                    new Promise(function(resolve){
                        vm.article.photos.forEach(function(photo){
                            if(vm.article.feature_image == photo.path){
                                vm.article.photos.splice(vm.article.photos.indexOf(photo),1);
                                vm.article.listPhotoRemoved.push(photo);
                                resolve();
                            }
                        })
                    }).then(function(){
                        vm.article.photos.push(file);
                        vm.article.listPhotoInserted.push(file);
                        var feature_image = file.path;
                        vm.article.feature_image = feature_image;
                    })
                },function(){
                    Core.toastyPopErrors('MESSAGE.SOMETHING_WENT_WRONG');
                })
            }
        };

        vm.removeFeatureImage = function(type) {
            if(type == 'FROM_EDIT'){
                vm.article.photos.forEach(function(photo){
                    if(vm.article.feature_image == photo.path){
                        vm.article.photos.splice(vm.article.photos.indexOf(photo),1);
                        vm.article.listPhotoRemoved.push(photo);
                        vm.article.feature_image = null;
                    }
                })
            } else {
                if (vm.article.feature_image != null) {
                    Core.removeSingleFile(vm.article.feature_image).then(function(){
                        vm.article.photos.forEach(function(photo){
                            if(vm.article.feature_image == photo.path){
                                vm.article.photos.splice(vm.article.photos.indexOf(photo),1);
                                vm.article.feature_image = null;
                            }
                        })
                    });
                }
            }
        };

        vm.onEditorMediaDelete = function(target) {
            vm.article.photos.forEach(function(photo){
                if(target.attrs.src == (Core.$rootScope.serverUrl + photo.path)){
                    vm.article.photos.splice(vm.article.photos.indexOf(photo),1);
                    Core.removeSingleFile(photo.path);
                }
            });
        };

        vm.uploadImageForEditor = function(files) {
            Core.uploadSingleFile(files[0]).then(function(file){
                vm.editor.summernote('editor.insertImage', Core.$rootScope.serverUrl + file.path);
                vm.article.photos.push(file);
            },function(){
                Core.toastyPopErrors('MESSAGE.SOMETHING_WENT_WRONG');
            })
        };

        vm.cancelCreateArticle = function(){
            var i = 0;
            if(vm.article.photos.length > 0){
                angular.forEach(vm.article.photos, function(photo){
                    i++;
                    Core.removeSingleFile(photo.path).then(function(){
                        if(i == vm.article.photos.length){
                            vm.backToIndex();
                        }
                    });
                });
            } else {
                vm.backToIndex();
            }
        }

        vm.onEditorMediaDeleteEdit = function(target) {
            vm.article.photos.forEach(function(photo){
                if(target.attrs.src == (Core.$rootScope.serverUrl + photo.path)){
                    vm.article.photos.splice(vm.article.photos.indexOf(photo),1);
                    if(photo.new){
                        vm.article.listPhotoInserted.splice(vm.article.listPhotoInserted.indexOf(photo),1);
                        Core.removeSingleFile(photo.path);
                    } else {
                        vm.article.listPhotoRemoved.push(photo);
                    }
                }
            });
        };

        vm.uploadImageForEditorEdit = function(files) {
            Core.uploadSingleFile(files[0]).then(function(file){
                vm.editor.summernote('editor.insertImage', Core.$rootScope.serverUrl + file.path);
                file.new = true;
                vm.article.photos.push(file);
                vm.article.listPhotoInserted.push(file);
            },function(){
                Core.toastyPopErrors('MESSAGE.SOMETHING_WENT_WRONG');
            })
        };

        vm.cancelEditArticle = function(){
            var i = 0;
            if(vm.article.listPhotoInserted.length > 0){
                angular.forEach(vm.article.listPhotoInserted, function(photo){
                    i++;
                    Core.removeSingleFile(photo.path).then(function(){
                        if(i == vm.article.listPhotoInserted.length){
                            vm.backToIndex();
                        }
                    });
                });
            } else {
                vm.backToIndex();
            }
        }

        /*
          |---------------------------------------------------------------------------------------------
          | ARTICLE COMMENTS
          |---------------------------------------------------------------------------------------------
        */

        vm.storeComment = function() {
            Core.apiRequest('POST', vm.moduleApiUrl + '/comment/' + vm.article._id, vm.comment, '').then(function(response) {
                if (response.data.status) {
                    var comment = {
                        _id: response.data.data._id,
                        content: response.data.data.content,
                        created_at: response.data.data.created_at,
                        total_replied: 0,
                        users: [],
                    };
                    comment.users.push(Core.$rootScope.rootAuth);
                    vm.article.comments.splice(0, 0, comment);
                    vm.article.total_comment += 1;
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
                    vm.article.comments[comment_index].content = comment.content;
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
                    vm.article.comments[comment_index].replieds[reply_index].content = reply.content;
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
                Core.apiRequest('GET', vm.moduleApiUrl + '/comment/replied/' + vm.article._id + '/' + comment._id, '', '').then(function(response) {
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
                Core.apiRequest('POST', vm.moduleApiUrl + '/comment/reply/' + vm.article._id + '/' + comment._id, reply, '').then(function(response) {
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
            Core.apiRequest('GET', vm.moduleApiUrl + '/comment/more/' + vm.article._id, '', { limit: vm.defaultLimitComment, skip: vm.article.comments.length }).then(function(response) {
                if (response.data.status) {
                    vm.article.comments = vm.article.comments.concat(response.data.data);
                } else {
                    Core.toastyPopErrors(response.data.message);
                }
            });
        };

        vm.destroyComment = function(comment_index, comment) {
            Core.sweetAlertHandle(ARTICLE_CONSTANT.DO_YOU_WANT_REMOVE_THIS_COMMENT).then(function(){
                Core.apiRequest('DELETE', vm.moduleApiUrl + '/comment/' + vm.article._id + '/' + comment._id, '', { type: 'comment' }).then(function(response) {
                    if (response.data.status) {
                        if (parseInt(response.data.data.ok) === 1) {
                            vm.article.comments.splice(comment_index, 1);
                            vm.article.total_comment -= 1;
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
            Core.sweetAlertHandle(ARTICLE_CONSTANT.DO_YOU_WANT_REMOVE_THIS_COMMENT).then(function(){
                Core.apiRequest('DELETE', vm.moduleApiUrl + '/comment/' + vm.article._id + '/' + reply._id, '', { type: 'replied_comment', parent_comment_id: comment._id }).then(function(response) {
                    if (response.data.status) {
                        if (parseInt(response.data.data.ok) === 1) {
                            vm.article.comments[comment_index].replieds.splice(reply_index, 1);
                            vm.article.comments[comment_index].total_replied -= 1;
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
          |---------------------------------------------------------------------------------------------
          | State Change
          |---------------------------------------------------------------------------------------------
        */
        vm.backToIndex = function() {
            Core.$state.go('app.store.article.index');
        };
        vm.create = function() {
            Core.$state.go('app.store.article.create');
        };
        vm.edit = function(id) {
            Core.$state.go('app.store.article.edit', { article_id: id });
        };
        vm.detail = function(id) {
            Core.$state.go('app.store.article.show', { article_id: id });
        };
    }
})();

