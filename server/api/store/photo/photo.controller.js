var Photo               = require('./photo.model');
var Album               = require('./album.model');
var ObjectId            = require.main.require('./services/create_object_id.service');
var ResponseService     = require.main.require('./services/response.service');
var Common              = require.main.require('./api/common/common');
var validator           = require('validator');

var PhotoController = {

    index: function(req, res, next){
        req.checkQuery('limit', 'MESSAGE.QUERY_REQUIRED').notEmpty();
        req.checkQuery('skip', 'MESSAGE.QUERY_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Photo.count({ store_id: ObjectId.generate(req.auth.store_id), album_id:null}, function(err, total){
                if(total > 0){
                    Photo.find({ store_id: ObjectId.generate(req.auth.store_id), album_id:null}).sort({ created_at: -1 })
                        .limit(parseInt(req.query.limit))
                        .skip(parseInt(req.query.skip))
                        .exec(function(err, photos){
                            if(err){
                                next(err);
                            } else {
                                ResponseService.json(res, true, { photos: photos, total: total }, '');
                            }
                        })
                } else {
                    ResponseService.json(res, true, { photos: [], total: 0 }, '');
                }
            });
        }
    },

    store: function(req, res, next) {
        var data = {
            name: null,
            path: req.body.path,
            from: {
                id: null,
                type: null
            },
            created_at: Date.now(),
            created_by: ObjectId.generate(req.auth._id),
            store_id: ObjectId.generate(req.auth.store_id)
        }
        var photo = new Photo(data)
        photo.save(function(err, result) {
            if (err) {
                next(err)
            } else {
                ResponseService.json(res, true, result, 'MESSAGE.CREATE_SUCCESS');
            }
        })
    },

    show: function(req, res, next){
        req.checkBody('name', 'MESSAGE.CONTENT_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors || !validator.isMongoId(req.params.photo_id)) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Photo.findById(ObjectId.generate(req.params.photo_id), function(err, photo){
                if(err){
                    next(err);
                } else {
                    var photoJson = JSON.parse(JSON.stringify(photo));
                    if(photoJson.comments.length > 0){
                        Common.getComments(Photo, req.params.photo_id).then(function(comments){
                            photoJson.comments = comments;
                        }, function(){
                            photoJson.comments = [];
                        })
                        ResponseService.json(res, true, photoJson, '');
                    }
                    
                }
            })
        }
    },

    update: function(req, res, next){
        req.checkParams('photo_id', 'MESSAGE.PARAMS_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors || !validator.isMongoId(req.params.photo_id)) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Photo.findById(ObjectId.generate(req.params.photo_id), function(err, photo){
                if(err){
                    next(err);
                } else {
                    photo.description = req.body.description;
                    photo.save(function(err, saveResult){
                        if(err){
                            next(err);
                        } else {
                            ResponseService.json(res, true, photo, 'MESSAGE.UPDATE_SUCCESS');
                        }
                    })
                }
            })
        }
    },

    hideThisPhoto: function(req, res, next){
        req.checkParams('photo_id', 'MESSAGE.CONTENT_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors || !validator.isMongoId(req.params.photo_id)) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Photo.findById(ObjectId.generate(req.params.photo_id), function(err, photo){
                if(err){
                    next(err);
                } else {
                    photo.deleted = 1;
                    photo.save(function(err, saveResult){
                        if(err){
                            next(err);
                        } else {
                            ResponseService.json(res, true, photo, 'MESSAGE.UPDATE_SUCCESS');
                        }
                    })
                }
            })
        }
    },

    displayThisPhoto: function(req, res, next){
        req.checkParams('photo_id', 'MESSAGE.CONTENT_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors || !validator.isMongoId(req.params.photo_id)) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Photo.findById(ObjectId.generate(req.params.photo_id), function(err, photo){
                if(err){
                    next(err);
                } else {
                    photo.deleted = 0;
                    photo.save(function(err, saveResult){
                        if(err){
                            next(err);
                        } else {
                            ResponseService.json(res, true, photo, 'MESSAGE.UPDATE_SUCCESS');
                        }
                    })
                }
            })
        }
    },

    destroy: function(req, res, next){
        req.checkParams('photo_id', 'MESSAGE.CONTENT_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors || !validator.isMongoId(req.params.photo_id)) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Photo.findOneAndRemove({ _id: ObjectId.generate(req.params.photo_id)}, function(err, photo){
                if(err){
                    next(err);
                } else {
                    ResponseService.json(res, true, photo, 'MESSAGE.DELETE_SUCCESS');
                }
            })
        }
    }
}

module.exports = PhotoController;
