'use strict';
var Food = require('./food.model');
var ResponseService = require.main.require('./services/response.service');
var getSlug = require('speakingurl');
var q = require('q');
var CreateObjectIdService = require.main.require('./services/create_object_id.service');


var FoodController = {

    store: function(req, res) {
        req.assert('name', 'VALIDATE_MESSAGE.REQUIRED').notEmpty();
        req.assert('content', 'VALIDATE_MESSAGE.REQUIRED').notEmpty();
        req.assert('price', 'VALIDATE_MESSAGE.REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            var data = {
                name: req.body.name,
                slug: getSlug(req.body.name) + '-' + Date.now(),
                menu_id: CreateObjectIdService.generate(req.params.menu_id),
                content: req.body.content,
                price: req.body.price,
                price_real: req.body.price_real,
                description: req.body.description,
                seo_title: req.body.seo_title,
                seo_description: req.body.seo_description,
                feature_image: req.body.feature_image,
                galleries: req.body.galleries,
                tags: req.body.tags,
                comments: [],
                created_at: Date.now(),
                created_by: CreateObjectIdService.generate(req.auth._id),
                updated_by: CreateObjectIdService.generate(req.auth._id),
                store_id: CreateObjectIdService.generate(req.auth.store_id)
            };
            var food = new Food(data);
            food.save(function(err, result) {
                if (err) {
                    ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                } else {
                    ResponseService.json(res, true, result, 'MESSAGE.CREATE_SUCCESS');
                }
            });
        }
    },  



    show: function(req, res) {
        req.checkParams('food_id', 'VALIDATE_MESSAGE.PARAMS_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Food.findOne({ _id: req.params.food_id, store_id: req.auth.store_id }, function(err, food) {
                if (err) {
                    ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                }
                if (food) {
                    var foodJson = food.toJSON();
                    FoodController.getComments(req.params.food_id).then(function(comments) {
                        if(foodJson.comments.length > 0){
                            foodJson.comments = comments;
                        }
                        Food.find({ store_id: req.auth.store_id, menu_id: CreateObjectIdService.generate(foodJson.menu_id) }).sort({ created_at: -1 }).exec(function(err, listFood) {
                            if (err) {
                                ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                            }
                            if (listFood.length > 0) {
                                ResponseService.json(res, true, { food: articleJson, listFood: listFood }, '');
                            }
                            if (listFood.length === 0) {
                                ResponseService.json(res, true, { food: articleJson, listFood: [] }, '');
                            }
                        });
                    });
                }
                if (!food) {
                    ResponseService.json(res, false, '', 'MESSAGE.DATA_NOT_FOUND');
                }
            });
        }
    },

    update: function(req, res) {
        req.assert('name', 'VALIDATE_MESSAGE.REQUIRED').notEmpty();
        req.assert('content', 'VALIDATE_MESSAGE.REQUIRED').notEmpty();
        req.checkParams('food_id', 'VALIDATE_MESSAGE.PARAMS_REQUIRED').notEmpty();
        req.assert('price', 'VALIDATE_MESSAGE.REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Food.findOne({ _id: req.params.food_id}, function(err, food) {
                if (food) {
                    food.name = req.body.name;
                    food.slug = getSlug(req.body.name) + '-' + Date.now(),
                    food.price = req.body.price,
                    food.description = req.body.description,
                    food.price_real = req.body.price_real,
                    food.content = req.body.content;
                    food.galleries = req.body.galleries;
                    food.seo_title = req.body.seo_title;
                    food.seo_description = req.body.seo_description;
                    food.feature_image = req.body.feature_image;
                    food.tags = req.body.tags;
                    food.updated_by = CreateObjectIdService.generate(req.auth._id);
                    food.save(function(err, result) {
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
                if (!food) {
                    ResponseService.json(res, false, '', 'MESSAGE.DATA_NOT_FOUND');
                }
            });
        }
    },

    hideThisFood: function(req, res) {
        req.checkParams('food_id', 'VALIDATE_MESSAGE.PARAMS_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Food.findOne({ _id: req.params.food_id, created_by: req.auth._id }, function(err, food) {
                if (food) {
                    food.active = 0;
                    food.updated_by = CreateObjectIdService.generate(req.auth._id);
                    food.save(function(err, result) {
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
                if (!food) {
                    ResponseService.json(res, false, '', 'MESSAGE.DATA_NOT_FOUND');
                }
            });
        }
    },

    displayThisFood: function(req, res) {
        req.checkParams('food_id', 'VALIDATE_MESSAGE.PARAMS_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Food.findOne({ _id: CreateObjectIdService.generate(req.params.food_id), created_by: req.auth._id }, function(err, food) {
                if (food) {
                    food.active = 1;
                    food.updated_by = CreateObjectIdService.generate(req.auth._id);
                    food.save(function(err, result) {
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
                if (!food) {
                    ResponseService.json(res, false, '', 'MESSAGE.DATA_NOT_FOUND');
                }
            });
        }
    },

    destroy: function(req, res) {
        req.checkParams('food_id', 'VALIDATE_MESSAGE.PARAMS_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Food.remove({ _id: CreateObjectIdService.generate(req.params.food_id), created_by: CreateObjectIdService.generate(req.auth._id) }, function(err, result) {
                if (err) {
                    ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                }
                if (result) {
                    ResponseService.json(res, true, result, 'MESSAGE.DELETE_SUCCESS');
                }
                if (!result) {
                    ResponseService.json(res, false, err, 'MESSAGE.DATA_NOT_FOUND');
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

    getComments: function(food_id) {
        var comments = [];
        var deferred = q.defer();
        Food.aggregate([
            { $match: { _id: CreateObjectIdService.generate(food_id) } },
            { $unwind: '$comments' },
            { $match: { 'comments.father_id': null } },
            { $sort: { 'comments.created_at': -1 } },
            { $limit: 5 },
            { $project: { comments: 1 } }, {
                $lookup: {
                    from: 'users',
                    localField: 'comments.user_id',
                    foreignField: '_id',
                    as: 'comments.users'
                }
            }
        ], function(err, listFood) {
            listFood.forEach(function(food) {
                comments.push(food.comments);
            });
            deferred.resolve(comments);
        });
        return deferred.promise;
    },

};

module.exports = FoodController;
