'use strict';
var Album               = require('./album.model');
var ObjectId            = require.main.require('./services/create_object_id.service');
var ResponseService     = require.main.require('./services/response.service');
var Common              = require.main.require('./api/common/common');
var validator           = require('validator');

var PhotoAlbumController = {

    index: function(req, res, next){
        req.checkQuery('limit', 'MESSAGE.QUERY_REQUIRED').notEmpty();
        req.checkQuery('skip', 'MESSAGE.QUERY_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Album.count( { store_id: ObjectId.generate(req.auth.store_id) }, function(err, total){
                if(total > 0){
                    Common.getAlbums(Album, req.auth, req.query.limit, req.query.skip).then(function(albums){
                        ResponseService.json(res, true, {albums: albums, total: total}, '');
                    }, function(){
                        ResponseService.json(res, true, {albums: [], total: 0}, '');
                    });
                } else {
                    ResponseService.json(res, true, {albums: [], total: 0}, '');
                }
            });
        }
    },

    store: function(req, res, next) {
        req.checkBody('name', 'MESSAGE.NAME_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            var data = {
                name            : req.body.name,
                description     : req.body.description,
                created_at      : Date.now(),
                created_by      : ObjectId.generate(req.auth._id),
                store_id        : ObjectId.generate(req.auth.store_id)
            }
            var album = new Album(data)
            album.save(function(err, result) {
                if (err) {
                    next(err)
                } else {
                    Common.insertStorePhotoWithAlbum(req.body.photos, album._id, req.auth).then(function(photos){
                        var resultJson = result.toJSON();
                        resultJson.photos = photos;
                        ResponseService.json(res, true, resultJson, 'MESSAGE.CREATE_SUCCESS');
                    }, function(errors){
                        ResponseService.json(res, true, errors.err, errors.message);
                    })
                }
            })
        }
    },

    update: function(req, res, next){
        req.checkParams('album_id', 'MESSAGE.PARAMS_REQUIRED').notEmpty();
        req.checkBody('name', 'MESSAGE.CONTENT_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors || !validator.isMongoId(req.params.album_id)) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Album.findById(ObjectId.generate(req.params.album_id), function(err, album){
                if(err){
                    next(err);
                } else {
                    album.name          = req.body.name;
                    album.description   = req.body.description;
                    album.updated_by    = ObjectId.generate(req.auth._id)
                    album.save(function(err, saveResult){
                        if(err){
                            next(err);
                        } else {
                            return new Promise(function(resolve, reject){
                                if(req.body.listPhotoRemoved.length > 0 && req.body.listPhotoInserted.length === 0){
                                    Common.removeStorePhotoWithAlbum(req.body.listPhotoRemoved, album._id).then(function(){
                                        Common.getPhotoByAlbumId(saveResult._id).then(function(photos){
                                            resolve(photos);
                                        }, function(errors){
                                            reject(errors)
                                        })
                                    }, function(errors){
                                        reject(errors)
                                    });
                                }
                                if(req.body.listPhotoInserted.length > 0 && req.body.listPhotoRemoved.length === 0){
                                    Common.insertStorePhotoWithAlbum(req.body.listPhotoInserted, album._id, req.auth).then(function(photos){
                                        resolve(photos);
                                    }, function(errors){
                                        reject(errors)
                                    })
                                } 
                                if(req.body.listPhotoInserted.length > 0 && req.body.listPhotoRemoved.length > 0) {
                                    Common.removeStorePhotoWithAlbum(req.body.listPhotoRemoved, album._id).then(function(){
                                        Common.insertStorePhotoWithAlbum(req.body.listPhotoInserted, album._id, req.auth).then(function(photos){
                                            resolve(photos);
                                        }, function(errors){
                                            reject(errors)
                                        })
                                    }, function(errors){
                                        reject(errors)
                                    });
                                }
                                if(req.body.listPhotoInserted.length === 0 && req.body.listPhotoRemoved.length === 0) {
                                    Common.getPhotoByAlbumId(saveResult._id).then(function(photos){
                                        resolve(photos);
                                    }, function(errors){
                                        reject(errors)
                                    })
                                }
                            }).then(function(photos){
                                var resultJson = saveResult.toJSON();
                                resultJson.photos = photos;
                                ResponseService.json(res, true, resultJson, 'MESSAGE.UPDATE_SUCCESS');
                            }, function(errors){
                                ResponseService.json(res, true, errors.err, errors.message);
                            });
                        }
                    })
                }
            })
        }
    },

    show: function(req, res, next){
        req.checkParams('album_id', 'MESSAGE.PARAMS_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors || !validator.isMongoId(req.params.album_id)) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Album.findById(ObjectId.generate(req.params.album_id), function(err, album){
                if(err){
                    next(err);
                } else {
                    var albumJson = JSON.parse(JSON.stringify(album));
                    Common.getPhotoByAlbumId(req.params.album_id).then(function(photos){
                        albumJson.photos = photos;
                        ResponseService.json(res, true, albumJson, '');
                    }, function(errors){
                        ResponseService.json(res, true, errors.err, errors.message);
                    })
                }
            })
        }
    },

    hideThisAlbum: function(req, res, next){
        req.checkParams('album_id', 'MESSAGE.CONTENT_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors || !validator.isMongoId(req.params.album_id)) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Album.findById(ObjectId.generate(req.params.album_id), function(err, album){
                if(err){
                    next(err);
                } else {
                    album.deleted = 1;
                    album.save(function(err, saveResult){
                        if(err){
                            next(err);
                        } else {
                            ResponseService.json(res, true, album, 'MESSAGE.UPDATE_SUCCESS');
                        }
                    })
                }
            })
        }
    },

    displayThisAlbum: function(req, res, next){
        req.checkParams('album_id', 'MESSAGE.CONTENT_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors || !validator.isMongoId(req.params.album_id)) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Album.findById(ObjectId.generate(req.params.album_id), function(err, album){
                if(err){
                    next(err);
                } else {
                    album.deleted = 0;
                    album.save(function(err, saveResult){
                        if(err){
                            next(err);
                        } else {
                            ResponseService.json(res, true, saveResult, 'MESSAGE.UPDATE_SUCCESS');
                        }
                    })
                }
            })
        }
    },

    destroy: function(req, res, next){
        req.checkParams('album_id', 'MESSAGE.PARAMS_REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors || !validator.isMongoId(req.params.album_id)) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else { 
            Album.findOneAndRemove({ _id:ObjectId.generate(req.params.album_id)}, function(err, album){
                if(err){
                    next(err);
                } else {
                    var albumJson = JSON.parse(JSON.stringify(album));
                    Common.getPhotoByAlbumId(req.params.album_id).then(function(photos){
                        Common.removeStorePhoto(photos);
                        ResponseService.json(res, true, '', 'MESSAGE.DELETE_SUCCESS');
                    }, function(errors){
                        ResponseService.json(res, true, errors.err, errors.message);
                    })
                }
            })
        }
    }

}

module.exports = PhotoAlbumController;
