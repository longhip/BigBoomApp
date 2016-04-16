'use strict';
var Article = require('./article.model');
var ResponseService = require.main.require('./services/response.service');
var mongoose = require('mongoose');
var ArticleCommentController = {

    store: function(req, res) {
        req.checkParams('article_id', 'MESSAGE.PARAMS_REQUIRED').notEmpty();
        req.checkBody('content', 'MESSAGE.CONTENT_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Article.findOne({ _id: req.params.article_id }, function(err, article) {
                if (article) {
                    var data = {
                        user_id: new mongoose.Types.ObjectId(req.auth._id),
                        content: req.body.content,
                        like: [],
                        type: parseInt(req.auth.type),
                        created_at: Date.now(),
                        updated_at: Date.now()
                    };
                    article.comments.push(data);
                    article.total_comment += 1;
                    article.save(function(err, result) {
                        if (result) {
                            article.save(function(err, result) {
                                if (result) {
                                    ResponseService.json(res, true, result.comments[result.comments.length - 1], 'MESSAGE.CREATE_SUCCESS');
                                }
                            });
                        }
                    });
                }
                if (err) {
                    ResponseService.json(res, false, '', 'MESSAGE.SOMETHING_WENT_WRONG');
                }
                if (!article) {
                    ResponseService.json(res, false, '', 'MESSAGE.DATA_NOT_FOUND');
                }
            });
        }
    },

    update: function(req, res) {
        req.checkBody('content', 'MESSAGE.CONTENT_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Article.update({ 'comments._id': req.params.comment_id }, {
                $set: {
                    'comments.$.content': req.body.content,
                    'comments.$.updated_at': Date.now(),
                    'comments.$.updated_by': new mongoose.Types.ObjectId(req.auth._id),
                }
            }, function(err, article) {
                if (article) {
                    ResponseService.json(res, true, article, 'MESSAGE.UPDATE_SUCCESS');
                }
                if (err) {
                    ResponseService.json(res, false, '', 'MESSAGE.SOMETHING_WENT_WRONG');
                }
                if (!article) {
                    ResponseService.json(res, false, '', 'MESSAGE.DATA_NOT_FOUND');
                }
            });
        }
    },

    replyComment: function(req, res) {
        req.checkParams('article_id', 'MESSAGE.PARAMS_REQUIRED').notEmpty();
        req.checkParams('comment_id', 'MESSAGE.PARAMS_REQUIRED').notEmpty();
        req.checkBody('content', 'MESSAGE.CONTENT_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Article.findOne({ _id: req.params.article_id }, function(err, article) {
                if (article) {
                    var data = {
                        user_id: new mongoose.Types.ObjectId(req.auth._id),
                        father_id: new mongoose.Types.ObjectId(req.params.comment_id),
                        content: req.body.content,
                        like: [],
                        type: parseInt(req.auth.type),
                        created_at: Date.now(),
                        updated_at: Date.now()
                    };
                    article.comments.push(data);
                    article.save(function(err, result) {
                        if (result) {
                            Article.update({ 'comments._id': req.params.comment_id }, {
                                $set: {
                                    'comments.$.total_replied': req.body.total_replied + 1,
                                }
                            }, function(err) {
                                if (!err) {
                                    ResponseService.json(res, true, result.comments[result.comments.length - 1], 'MESSAGE.CREATE_SUCCESS');
                                }
                            });
                        }
                    });
                }
                if (err) {
                    ResponseService.json(res, false, '', 'MESSAGE.SOMETHING_WENT_WRONG');
                }
                if (!article) {
                    ResponseService.json(res, false, '', 'MESSAGE.DATA_NOT_FOUND');
                }
            });
        }
    },

    getRepliedComments: function(req, res) {
        var comments = [];
        var i = 0;
        Article.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(req.params.article_id) } },
            { $unwind: '$comments' },
            { $project: { comments: 1 } },
            { $sort: { 'comments.created_at': -1 } },
            { $match: { 'comments.father_id': new mongoose.Types.ObjectId(req.params.comment_id) } }, {
                $lookup: {
                    from: 'users',
                    localField: 'comments.user_id',
                    foreignField: '_id',
                    as: 'comments.users'
                }
            }
        ], function(err, articles) {
            articles.forEach(function(article) {
                i++;
                comments.push(article.comments);
                if (i == articles.length) {
                    ResponseService.json(res, true, comments, '');
                }
            });
        });
    },

    moreComments: function(req, res) {
        var comments = [];
        var i = 0;
        Article.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(req.params.article_id) } },
            { $unwind: '$comments' },
            { $match: { 'comments.father_id': null } },
            { $project: { comments: 1 } },
            { $sort: { 'comments.created_at': -1 } },
            { $limit: parseInt(req.query.limit) },
            { $skip: parseInt(req.query.skip) }, {
                $lookup: {
                    from: 'users',
                    localField: 'comments.user_id',
                    foreignField: '_id',
                    as: 'comments.users'
                }
            }
        ], function(err, articles) {
            articles.forEach(function(article) {
                i++;
                comments.push(article.comments);
                if (i == articles.length) {
                    ResponseService.json(res, true, comments, '');
                }
            });
        });
    },

    destroy: function(req, res) {
        if (req.query.type === 'comment') {
            Article.findOne({ _id: req.params.article_id }, function(err, result) {
                if (err) {
                    ResponseService.json(res, false, '', 'MESSAGE.SOMETHING_WENT_WRONG');
                }
                if (!result) {
                    ResponseService.json(res, false, '', 'MESSAGE.DATA_NOT_FOUND');
                }
                if (result) {
                    Article.update({ _id: req.params.article_id }, {
                        $pull: {
                            'comments': {
                                $and: [{
                                    $or: [{
                                        '_id': new mongoose.Types.ObjectId(req.params.comment_id),
                                    }, {
                                        'father_id': new mongoose.Types.ObjectId(req.params.comment_id),
                                    }]
                                }, {
                                    'user_id': new mongoose.Types.ObjectId(req.auth._id),
                                }]
                            }
                        },
                        $set: {
                            'total_comment': result.total_comment - 1,
                        }
                    }, function(err, article) {
                        ResponseService.json(res, true, article, 'MESSAGE.DELELE_SUCCESS');
                    });
                }
            });
        }
        if (req.query.type === 'replied_comment') {
            Article.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(req.params.article_id) } },
                { $unwind: '$comments' },
                { $match: { 'comments._id': new mongoose.Types.ObjectId(req.params.comment_id) } },
            ], function(err, data) {
                if (err) {
                    ResponseService.json(res, false, err, 'MESSAGE.DATA_NOT_FOUND');
                } else {
                    var this_replied_comment = data[0].comments;
                    Article.aggregate([
                        { $match: { _id: new mongoose.Types.ObjectId(req.params.article_id) } },
                        { $unwind: '$comments' },
                        { $match: { 'comments._id': new mongoose.Types.ObjectId(req.query.parent_comment_id) } },
                    ], function(err, data) {
                        if(err){
                            ResponseService.json(res, false, err, 'MESSAGE.DATA_NOT_FOUND');
                        }else{
                            var total_replied = data[0].comments.total_replied;
                            Article.update({ _id: req.params.article_id }, {
                                $pull: {
                                    'comments': {
                                        $and: [{
                                            $or: [{
                                                '_id': new mongoose.Types.ObjectId(req.params.comment_id),
                                            }, {
                                                'father_id': new mongoose.Types.ObjectId(req.params.comment_id),
                                            }]
                                        }, {
                                            'user_id': new mongoose.Types.ObjectId(req.auth._id),
                                        }]
                                    }
                                },
                            }, function(err, article) {
                                if (parseInt(article.ok) === 1) {
                                    Article.update({ 'comments._id': new mongoose.Types.ObjectId(req.query.parent_comment_id) }, {
                                        $set: {
                                            'comments.$.total_replied': total_replied - 1,
                                        }
                                    }, function(err, data) {
                                        if (err || parseInt(data.ok) != 1) {
                                            Article.findOne({ _id: req.params.article_id }, function(err, article) {
                                                if (article) {
                                                    article.comments.push(this_replied_comment);
                                                    article.save(function() {
                                                        ResponseService.json(res, false, '', 'MESSAGE.SOMETHING_WENT_WRONG');
                                                    });
                                                }
                                                if (err) {
                                                    ResponseService.json(res, false, '', 'MESSAGE.SOMETHING_WENT_WRONG');
                                                }
                                            });
                                        } else {
                                            ResponseService.json(res, true, article, 'MESSAGE.DELELE_SUCCESS');
                                        }
                                    });
                                } else {
                                    ResponseService.json(res, false, '', 'MESSAGE.SOMETHING_WENT_WRONG');
                                }
                            });
                        }
                    });
                }
            });
        }
    }
};

module.exports = ArticleCommentController;
