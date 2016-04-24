'use strict';
var Food                    = require('./food.model');
var ResponseService         = require.main.require('./services/response.service');
var mongoose                = require('mongoose');
var Common                  = require.main.require('./api/common/common');

var FoodCommentController = {

    store: function(req, res) {
        req.checkParams('food_id', 'MESSAGE.PARAMS_REQUIRED').notEmpty();
        req.checkBody('content', 'MESSAGE.CONTENT_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            var data = {
                user_id: new mongoose.Types.ObjectId(req.auth._id),
                content: req.body.content,
                like: [],
                type: parseInt(req.auth.type),
                created_at: Date.now(),
                updated_at: Date.now()
            };
            Common.storeNewComment(Food, req.params.food_id, data).then(function(comment){
                ResponseService.json(res, true, comment, 'MESSAGE.CREATE_SUCCESS');
            }, function(errors){
                ResponseService.json(res, false, errors.err, errors.message);
            })
        }
    },

    update: function(req, res) {
        req.checkBody('content', 'MESSAGE.CONTENT_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            var data = {
                content: req.body.content,
            };
            Common.updateComment(Food, req.params.comment_id, data).then(function(food){
                ResponseService.json(res, true, food, 'MESSAGE.UPDATE_SUCCESS');
            }, function(errors){
                ResponseService.json(res, false, errors.err, errors.message);
            });
        }
    },

    replyComment: function(req, res) {
        req.checkParams('food_id', 'MESSAGE.PARAMS_REQUIRED').notEmpty();
        req.checkParams('comment_id', 'MESSAGE.PARAMS_REQUIRED').notEmpty();
        req.checkBody('content', 'MESSAGE.CONTENT_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
             var data = {
                user_id         : new mongoose.Types.ObjectId(req.auth._id),
                father_id       : new mongoose.Types.ObjectId(req.params.comment_id),
                total_replied   : req.body.total_replied,
                content         : req.body.content,
                type            : parseInt(req.auth.type),
                created_at      : Date.now(),
            };
            Common.replyComment(Food, req.params.food_id, data).then(function(comment){
                ResponseService.json(res, true, comment, 'MESSAGE.CREATE_SUCCESS');
            }, function(errors){
                ResponseService.json(res, false, errors.err, errors.message);
            });
        }
    },

    getRepliedComments: function(req, res) {
        req.checkParams('food_id', 'MESSAGE.PARAMS_REQUIRED').notEmpty();
        req.checkParams('comment_id', 'MESSAGE.PARAMS_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Common.getRepliedComments(Food, req.params.food_id, req.params.comment_id).then(function(comments){
                ResponseService.json(res, true, comments, '');
            }, function(errors){
                ResponseService.json(res, false, errors.err, errors.message);
            })
        }
    },

    moreComments: function(req, res) {
        req.checkParams('food_id', 'MESSAGE.PARAMS_REQUIRED').notEmpty();
        req.checkQuery('limit', 'MESSAGE.QUERY_REQUIRED').notEmpty();
        req.checkQuery('skip', 'MESSAGE.QUERY_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Common.moreComments(Food, req.params.food_id, req.query.limit, req.query.skip).then(function(comments){
                 ResponseService.json(res, true, comments, '');
            }, function(errors){
                ResponseService.json(res, false, errors.err, errors.message);
            });
        }
    },

    destroy: function(req, res) {
        req.checkParams('food_id', 'MESSAGE.PARAMS_REQUIRED').notEmpty();
        req.checkParams('comment_id', 'MESSAGE.PARAMS_REQUIRED').notEmpty();
        req.checkQuery('type', 'MESSAGE.QUERY_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Common.destroyComment(Food, req.params.food_id, req.params.comment_id, req.query.type, {auth: req.auth}).then(function(data){
                ResponseService.json(res, true, data, 'MESSAGE.DELELE_SUCCESS');
            }, function(errors){
                ResponseService.json(res, false, errors.err, errors.message);
            });
        }
    }
};

module.exports = FoodCommentController;
