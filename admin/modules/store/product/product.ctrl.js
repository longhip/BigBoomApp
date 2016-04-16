'use strict';
angular.module('BigBoomApp.Store').controller('ProductCtrl', function($rootScope, $timeout, $translate, $stateParams, $state, $scope, $cookieStore, CommonApiRequest,CommonFactory, ProductFactory, SweetAlert, Upload, Toasty, PRODUCT_CONSTANT) {
    function __construct() {
        $scope.categories = [];
        $scope.product = {};
        $scope.products = [];
        $scope.query = '';
        $scope.comment = {};
        $scope.moduleApiUrl = $rootScope.serverApiUrl + PRODUCT_CONSTANT.MODULE_URL;
        $scope.defaultLimitComment = 10;
    }
    __construct();

    $scope.index = function() {
        CommonApiRequest.handle('GET', $scope.moduleApiUrl, '', '').then(function(response) {
            if (response.data.status) {
                $scope.articles = response.data.data.articles;
                $scope.total = response.data.data.total;
            } else {
                Toasty.popErrors(response.data.message);
            }
        });
    };

    $scope.store = function(form) {
        CommonFactory.validateHandle(form).success(function() {
            CommonApiRequest.handle('POST', $scope.moduleApiUrl, $scope.article, '').then(function(response) {
                if (response.data.status) {
                    $state.go('app.store.article.index');
                    Toasty.popSuccess(response.data.message);
                } else {
                    Toasty.popErrors(response.data.message);
                }
            });
        }).error(function() {
            Toasty.popErrors('MESSAGE.FORM_INVALID');
        });
    };

    $scope.show = function() {
        CommonApiRequest.handle('GET', $scope.moduleApiUrl + '/' + $stateParams.article_id, '', '').then(function(response) {
            if (response.data.status) {
                $scope.article = response.data.data.article;
                $scope.articles = response.data.data.articles;
            } else {
                Toasty.popErrors(response.data.message);
            }
        });
    };

    $scope.update = function(form) {
        CommonFactory.validateHandle(form).success(function() {
            CommonApiRequest.handle('PUT', $scope.moduleApiUrl + '/' + $scope.article._id, $scope.article, '').then(function(response) {
                if (response.data.status) {
                    Toasty.popSuccess(response.data.message);
                } else {
                    Toasty.popErrors(response.data.message);
                }
            });
        }).error(function() {
            Toasty.popErrors('MESSAGE.FORM_INVALID');
        });
    };

    $scope.hideThisArticle = function(article) {
        CommonApiRequest.handle('PUT', $scope.moduleApiUrl + '/hide/' + article._id, '', '').then(function(response) {
            if (response.data.status) {
                article.active = 0;
            } else {
                Toasty.popErrors(response.data.message);
            }
        });
    };

    $scope.destroy = function(article) {
        CommonFactory.sweetAlertHandle(PRODUCT_CONSTANT.DO_YOU_WANT_REMOVE_THIS_ARTICLE).then(function(){
            CommonApiRequest.handle('DELETE', $scope.moduleApiUrl + '/' + article._id, '', '').then(function(response) {
                if (response.data.status) {
                    $scope.articles.splice($scope.articles.indexOf(article), 1);
                    $scope.total -= 1;
                    SweetAlert.swal($translate.instant('LABEL.DELETED'), $translate.instant('LABEL.THIS_ARTICLE_HAS_DELETED'), 'success');
                } else {
                    Toasty.popErrors(response.data.message);
                }
            });
        });
    };

    $scope.displayThisArticle = function(article) {
        CommonApiRequest.handle('PUT', $scope.moduleApiUrl + '/display/' + article._id, '', '').then(function(response) {
            if (response.data.status) {
                article.active = 1;
            } else {
                Toasty.popErrors(response.data.message);
            }
        });
    };

    $scope.more = function() {
        if ($scope.isSearch) {
            CommonApiRequest.handle('GET', $scope.moduleApiUrl + '/more/' + $scope.articles.length, '', { query: $scope.query }).then(function(response) {
                if (response.data.status) {
                    $scope.articles = $scope.articles.concat(response.data.data);
                } else {
                    Toasty.popErrors(response.data.message);
                }
            });
        } else {
            CommonApiRequest.handle('GET', $scope.moduleApiUrl + '/more/' + $scope.articles.length, '', '').then(function(response) {
                if (response.data.status) {
                    $scope.articles = $scope.articles.concat(response.data.data);
                } else {
                    Toasty.popErrors(response.data.message);
                }
            });
        }
    };

    $scope.search = function() {
        $scope.isSearch = true;
        CommonApiRequest.handle('GET', $scope.moduleApiUrl + '/search/result', '', { query: $scope.query }).then(function(response) {
            if (response.data.status) {
                $scope.articles = response.data.data.articles;
                $scope.searchTotal = response.data.data.total;
            } else {
                Toasty.popErrors(response.data.message);
            }
        });
    };

    $scope.cancelSearch = function() {
        $scope.isSearch = false;
        $scope.index();
    };

    $scope.onSelectFeatureImage = function(file) {
        if (file) {
            Upload.upload({
                url: $rootScope.singleUploadUrl,
                data: {
                    file: file,
                },
                headers: { 'x-access-token': $cookieStore.get('token') }
            }).then(function(response) {
                var feature_image = response.data.data.path;
                if ($scope.article.feature_image != null) {
                    CommonFactory.removeSingleFile($scope.article.feature_image).then(function(){
                        $scope.article.feature_image = feature_image;
                    });
                }
                $scope.article.feature_image = feature_image;
            }, function() {
                Toasty.popErrors('MESSAGE.SOMETHING_WENT_WRONG');
            });
        }
    };

    $scope.removeFeatureImage = function() {
        if ($scope.article.feature_image != null) {
            CommonFactory.removeSingleFile($scope.article.feature_image).then(function(){
                $scope.article.feature_image = null;
            });
        }
    };


    $scope.updateImageForEditor = function(files) {
        Upload.upload({
            url: $rootScope.singleUploadUrl,
            data: {
                file: files[0]
            },
            headers: { 'x-access-token': $cookieStore.get('token') }
        }).then(function(response) {
            $scope.editor.summernote('editor.insertImage', $rootScope.serverUrl + response.data.data.path);
        }, function() {
            Toasty.popErrors('MESSAGE.SOMETHING_WENT_WRONG');
        });
    };

    /*
      |---------------------------------------------------------------------------------------------
      | ARTICLE COMMENTS
      |---------------------------------------------------------------------------------------------
    */

    $scope.storeComment = function() {
        CommonApiRequest.handle('POST', $scope.moduleApiUrl + '/comment/' + $scope.article._id, $scope.comment, '').then(function(response) {
            if (response.data.status) {
                var comment = {
                    _id: response.data.data._id,
                    content: response.data.data.content,
                    created_at: response.data.data.created_at,
                    total_replied: 0,
                    users: [],
                };
                comment.users.push($rootScope.rootAuth);
                $scope.article.comments.splice(0, 0, comment);
                $scope.article.total_comment += 1;
                $scope.comment = {};
                Toasty.popSuccess(response.data.message);
            } else {
                Toasty.popErrors(response.data.message);
            }
        });
    };

    $scope.updateComment = function(comment_index, comment) {
        CommonApiRequest.handle('PUT', $scope.moduleApiUrl + '/comment/' + comment._id, comment, '').then(function(response) {
            if (response.data.status) {
                $scope.article.comments[comment_index].content = comment.content;
                Toasty.popSuccess(response.data.message);
                comment.isEditComment = false;
            } else {
                Toasty.popErrors(response.data.message);
                comment.isEditComment = false;
            }
        });
    };

    $scope.updateReplyComment = function(comment_index, reply_index, reply) {
        CommonApiRequest.handle('PUT', $scope.moduleApiUrl + '/comment/' + reply._id, reply, '').then(function(response) {
            if (response.data.status) {
                $scope.article.comments[comment_index].replieds[reply_index].content = reply.content;
                Toasty.popSuccess(response.data.message);
                reply.isEditReplyComment = false;
            } else {
                Toasty.popErrors(response.data.message);
                reply.isEditReplyComment = false;
            }
        });
    };

    $scope.getReplyComment = function(comment) {
        comment.isReply = true;
        if (comment.total_replied > 0) {
            CommonApiRequest.handle('GET', $scope.moduleApiUrl + '/comment/replied/' + $scope.article._id + '/' + comment._id, '', '').then(function(response) {
                if (response.data.status) {
                    comment.replieds = response.data.data;
                } else {
                    Toasty.popErrors(response.data.message);
                }
            });
        } else {
            comment.replieds = [];
        }
    };

    $scope.replyComment = function(comment) {
        if(comment.reply_content != null && comment.reply_content != ''){
            var reply = {
                content: comment.reply_content,
                total_replied: comment.total_replied,
                users: []
            };
            CommonApiRequest.handle('POST', $scope.moduleApiUrl + '/comment/reply/' + $scope.article._id + '/' + comment._id, reply, '').then(function(response) {
                if (response.data.status) {
                    reply.users.push($rootScope.rootAuth);
                    reply.created_at = response.data.data.created_at;
                    comment.total_replied += 1;
                    reply._id = response.data.data._id;
                    comment.replieds.push(reply);
                    comment.reply_content = '';
                } else {
                    Toasty.popErrors(response.data.message);
                }
            });
        }
    };

    $scope.loadMoreComment = function() {
        CommonApiRequest.handle('GET', $scope.moduleApiUrl + '/comment/more/' + $scope.article._id, '', { limit: $scope.defaultLimitComment, skip: $scope.article.comments.length }).then(function(response) {
            if (response.data.status) {
                $scope.article.comments = $scope.article.comments.concat(response.data.data);
            } else {
                Toasty.popErrors(response.data.message);
            }
        });
    };

    $scope.destroyComment = function(comment_index, comment) {
        CommonFactory.sweetAlertHandle(PRODUCT_CONSTANT.DO_YOU_WANT_REMOVE_THIS_COMMENT).then(function(){
            CommonApiRequest.handle('DELETE', $scope.moduleApiUrl + '/comment/' + $scope.article._id + '/' + comment._id, '', { type: 'comment' }).then(function(response) {
                if (response.data.status) {
                    if (parseInt(response.data.data.ok) === 1) {
                        $scope.article.comments.splice(comment_index, 1);
                        $scope.article.total_comment -= 1;
                        Toasty.popSuccess(response.data.message);
                        SweetAlert.swal($translate.instant('LABEL.DELETED'), $translate.instant('LABEL.THIS_COMMENT_HAS_DELETED'), 'success');
                    } else {
                        Toasty.popErrors('MESSAGE.SOMETHING_WENT_WRONG');
                    }
                } else {
                    Toasty.popErrors(response.data.message);
                }
            });
        },function(){

        });
    };

    $scope.destroyRepliedComment = function(comment_index, comment, reply_index, reply) {
        CommonFactory.sweetAlertHandle(PRODUCT_CONSTANT.DO_YOU_WANT_REMOVE_THIS_COMMENT).then(function(){
            CommonApiRequest.handle('DELETE', $scope.moduleApiUrl + '/comment/' + $scope.article._id + '/' + reply._id, '', { type: 'replied_comment', parent_comment_id: comment._id }).then(function(response) {
                if (response.data.status) {
                    if (parseInt(response.data.data.ok) === 1) {
                        $scope.article.comments[comment_index].replieds.splice(reply_index, 1);
                        $scope.article.comments[comment_index].total_replied -= 1;
                        Toasty.popSuccess(response.data.message);

                    } else {
                        Toasty.popErrors('MESSAGE.SOMETHING_WENT_WRONG');
                    }
                } else {
                    Toasty.popErrors(response.data.message);
                }
            });
        });
    };



    /*
      |---------------------------------------------------------------------------------------------
      | State Change
      |---------------------------------------------------------------------------------------------
    */
    $scope.backToIndex = function() {
        $state.go('app.store.article.index');
    };
    $scope.create = function() {
        $state.go('app.store.article.create');
    };
    $scope.edit = function(id) {
        $state.go('app.store.article.edit', { article_id: id });
    };
    $scope.detail = function(id) {
        $state.go('app.store.article.show', { article_id: id });
    };



});
