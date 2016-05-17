'use strict';
var Article             = require('./article.model');
var ResponseService     = require.main.require('./services/response.service');
var Common              = require.main.require('./api/common/common');
var getSlug             = require('speakingurl');
var mongoose            = require('mongoose');
var q                   = require('q');
var limit               = 10;


var ArticleController = {

    index: function(req, res) {
        Article.count({ store_id: req.auth.store_id }, function(err, count) {
            if (count > 0) {
                Article.find({ store_id: req.auth.store_id }).sort({ created_at: -1 }).limit(limit).exec(function(err, results) {
                    if (err) {
                        ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                    } else {
                        ResponseService.json(res, true, { articles: results, total: count }, '');
                    }
                });
            } else {
                ResponseService.json(res, true, { articles: [], total: 0 }, '');
            }
        });
    },

    store: function(req, res) {
        req.assert('name', 'VALIDATE_MESSAGE.REQUIRED').notEmpty();
        req.assert('content', 'VALIDATE_MESSAGE.REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            var data = {
                name: req.body.name,
                slug: getSlug(req.body.name) + '-' + Date.now(),
                content: req.body.content,
                description: req.body.description,
                seo_title: req.body.seo_title,
                seo_description: req.body.seo_description,
                feature_image: req.body.feature_image,
                photos: req.body.photos,
                tags: req.body.tags,
                active: 1,
                created_at: Date.now(),
                created_by: new mongoose.Types.ObjectId(req.auth._id),
                updated_by: new mongoose.Types.ObjectId(req.auth._id),
                store_id: new mongoose.Types.ObjectId(req.auth.store_id)
            };
            var article = new Article(data);
            article.save(function(err, result) {
                if (err) {
                    ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                } else {
                    ResponseService.json(res, true, result, 'MESSAGE.CREATE_SUCCESS');
                }
            });
        }
    },



    show: function(req, res) {
        req.checkParams('id', 'VALIDATE_MESSAGE.PARAMS_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Article.findOne({ _id: req.params.id, store_id: req.auth.store_id }, function(err, article) {
                if (err) {
                    ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                }
                if (article) {
                    var articleJson = article.toJSON();
                    Common.getComments(Article,req.params.id).then(function(comments) {
                        if (articleJson.comments.length > 0) {
                            articleJson.comments = comments;
                        }
                        Article.find({ store_id: req.auth.store_id }).sort({ created_at: -1 }).limit(limit).exec(function(err, articles) {
                            if (err) {
                                ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                            }
                            if (articles.length > 0) {
                                ResponseService.json(res, true, { article: articleJson, articles: articles }, '');
                            }
                            if (articles.length === 0) {
                                ResponseService.json(res, true, { article: articleJson, articles: [] }, '');
                            }
                        });
                    });
                }
                if (!article) {
                    ResponseService.json(res, false, '', 'MESSAGE.DATA_NOT_FOUND');
                }
            });
        }
    },

    update: function(req, res) {
        req.assert('name', 'VALIDATE_MESSAGE.REQUIRED').notEmpty();
        req.assert('content', 'VALIDATE_MESSAGE.REQUIRED').notEmpty();
        req.checkParams('id', 'VALIDATE_MESSAGE.PARAMS_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Article.findOne({ _id: req.params.id, created_by: req.auth._id }, function(err, article) {
                if (article) {
                    article.name = req.body.name;
                    article.slug = getSlug(req.body.name) + '-' + Date.now(),
                    article.content = req.body.content;
                    article.seo_title = req.body.seo_title;
                    article.seo_description = req.body.seo_description;
                    article.feature_image = req.body.feature_image;
                    article.tags = req.body.tags;
                    article.photos = req.body.photos;
                    article.active = req.body.active;
                    article.updated_by = new mongoose.Types.ObjectId(req.auth._id);
                    article.save(function(err, result) {
                        if (err) {
                            ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                        } else {
                            ResponseService.json(res, true, result, 'MESSAGE.UPDATE_SUCCESS');
                        }
                    });
                }
                if (err) {
                    ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                }
                if (!article) {
                    ResponseService.json(res, false, '', 'MESSAGE.DATA_NOT_FOUND');
                }
            });
        }
    },

    hideThisArticle: function(req, res) {
        req.checkParams('id', 'VALIDATE_MESSAGE.PARAMS_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Article.findOne({ _id: req.params.id, created_by: req.auth._id }, function(err, article) {
                if (article) {
                    article.active = 0;
                    article.updated_by = new mongoose.Types.ObjectId(req.auth._id);
                    article.save(function(err, result) {
                        if (err) {
                            ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                        } else {
                            ResponseService.json(res, true, result, 'MESSAGE.UPDATE_SUCCESS');
                        }
                    });
                }
                if (err) {
                    ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                }
                if (!article) {
                    ResponseService.json(res, false, '', 'MESSAGE.DATA_NOT_FOUND');
                }
            });
        }
    },

    displayThisArticle: function(req, res) {
        req.checkParams('id', 'VALIDATE_MESSAGE.PARAMS_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Article.findOne({ _id: req.params.id, created_by: req.auth._id }, function(err, article) {
                if (article) {
                    article.active = 1;
                    article.updated_by = new mongoose.Types.ObjectId(req.auth._id);
                    article.save(function(err, result) {
                        if (err) {
                            ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                        } else {
                            ResponseService.json(res, true, result, 'MESSAGE.UPDATE_SUCCESS');
                        }
                    });
                }
                if (err) {
                    ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                }
                if (!article) {
                    ResponseService.json(res, false, '', 'MESSAGE.DATA_NOT_FOUND');
                }
            });
        }
    },

    likeThisArticle: function(req, res) {
        if (parseInt(req.auth.type) === 0) {
            ResponseService.json(res, false, '', 'MESSAGE.DONT_CANT_LIKE_THIS_ARTICLE');
        } else {
            req.checkParams('id', 'VALIDATE_MESSAGE.PARAMS_REQUIRED').notEmpty();
            var errors = req.validationErrors();
            if (errors) {
                ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
            } else {
                return new Promise(function(resolve, reject) {
                    Article.findOne({ _id: req.params.id, created_by: req.auth._id }, function(err, article) {
                        if (article) {
                            if (article.likes.indexOf(new mongoose.Types.ObjectId(req.auth._id)) === -1) {
                                article.likes.push(new mongoose.Types.ObjectId(req.auth._id));
                                article.total_like += 1;
                                resolve(article);
                            } else {
                                reject({ err: err, message: 'MESSAGE.YOU_HAS_LIKE_THIS_ARTICLE' });
                            }
                        } else {
                            reject({ err: err, message: 'MESSAGE.DATA_NOT_FOUND' });
                        }
                    });
                }).then(function(article) {
                    article.save(function(err, result) {
                        if (result) {
                            ResponseService.json(res, true, result, 'MESSAGE.LIKED');
                        } else {
                            ResponseService.json(res, false, result, 'MESSAGE.CANT_LIKE');
                        }
                    });
                }, function(rejected) {
                    ResponseService.json(res, false, rejected.err, rejected.message);
                });
            }
        }
    },

    unLikeThisArticle: function(req, res) {
        if (parseInt(req.auth.type) === 0) {
            ResponseService.json(res, false, '', 'MESSAGE.DONT_CANT_LIKE_THIS_ARTICLE');
        } else {
            req.checkParams('id', 'VALIDATE_MESSAGE.PARAMS_REQUIRED').notEmpty();
            var errors = req.validationErrors();
            if (errors) {
                ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
            } else {
                return new Promise(function(resolve, reject) {
                    Article.findOne({ _id: req.params.id, created_by: req.auth._id }, function(err, article) {
                        if (article) {
                            var index = article.likes.indexOf(new mongoose.Types.ObjectId(req.auth._id));
                            if (index > -1) {
                                article.likes.splice(index, 1);
                                article.total_like -= 1;
                                resolve(article);
                            } else {
                                reject({
                                    err: err,
                                    message: 'MESSAGE.YOU_HAS_LIKE_THIS_ARTICLE'
                                });
                            }
                        } else {
                            reject({
                                err: err,
                                message: 'MESSAGE.DATA_NOT_FOUND'
                            });
                        }
                    });
                }).then(function(article) {
                    article.save(function(err, result) {
                        if (result) {
                            ResponseService.json(res, true, result, 'MESSAGE.LIKED');
                        } else {
                            ResponseService.json(res, false, result, 'MESSAGE.CANT_LIKE');
                        }
                    });
                }, function(rejected) {
                    ResponseService.json(res, false, rejected.err, rejected.message);
                });
            }
        }
    },

    destroy: function(req, res) {
        req.checkParams('id', 'VALIDATE_MESSAGE.PARAMS_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Article.findOneAndRemove({ _id: req.params.id, created_by: req.auth._id }, function(err, result) {
                if (err) {
                    ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                }
                if (result) {
                    Common.removeStorePhoto(result.photos);
                    ResponseService.json(res, true, result, 'MESSAGE.DELETE_SUCCESS');
                }
                if (!result) {
                    ResponseService.json(res, false, err, 'MESSAGE.DATA_NOT_FOUND');
                }
            });
        }
    },

    more: function(req, res) {
        var skip = parseInt(req.params.skip);
        if (req.query.query) {
            var query = { store_id: req.auth.store_id, 'name': { '$regex': req.query.query } };
            Article.find(query).sort({ created_at: -1 }).limit(limit).skip(skip).exec(function(err, articles) {
                if (err) {
                    ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                } else {
                    ResponseService.json(res, true, articles, '');
                }
            });
        } else {
            Article.find({ store_id: req.auth.store_id }).sort({ created_at: -1 }).limit(limit).skip(skip).exec(function(err, results) {
                if (err) {
                    ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                } else {
                    ResponseService.json(res, true, results, '');
                }
            });
        }
    },


    search: function(req, res) {
        var query = { store_id: req.auth.store_id, 'name': { '$regex': req.query.query } };
        Article.count(query, function(err, count) {
            if (count > 0) {
                Article.find(query).sort({ created_at: -1 }).limit(limit).exec(function(err, articles) {
                    if (err) {
                        ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                    } else {
                        ResponseService.json(res, true, { articles: articles, total: count }, '');
                    }
                });
            }
            if (count === 0) {
                ResponseService.json(res, true, { articles: [], total: 0 }, 'MESSAGE.DATA_NOT_FOUND');
            }
            if (err) {
                ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
            }
        });
    },

};

module.exports = ArticleController;
