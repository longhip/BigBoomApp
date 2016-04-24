'use strict';

var fs                  = require('fs');
var q                   = require('q');
var Photo               = require('../store/photo/photo.model');
var ObjectId 			= require.main.require('./services/create_object_id.service');

var Common = {

	insertStorePhoto: function(photos, where, auth){
        var deferred = q.defer();
        var listPhoto = [];
        photos.forEach(function(photo){
            listPhoto.push({
                name: photo.name,
                path: photo.path,
                from: {
                    f_id: ObjectId.generate(where._id),
                    f_type: where.type
                },
                created_at: Date.now(),
                created_by: ObjectId.generate(auth._id),
                store_id: ObjectId.generate(auth.store_id)
            });
            if(photos.length === listPhoto.length){
                Photo.insertMany(listPhoto,function(err){
                    if(err){
                        deferred.reject();
                    } else {
                        deferred.resolve();
                    }
                })
            }
        })
        return deferred.promise;
    },

    removeStorePhoto: function(photos, where, auth){
    	photos.forEach(function(photo){
            Photo.findOneAndRemove({ path: photo.path },function(err){
            	if(!err){
					fs.unlink(photo.path);
            	} 
            })
        })
    },

    getComments: function(model, by_id){
        var comments = [];
        var deferred = q.defer();
        model.aggregate([
            { $match: { _id: ObjectId.generate(by_id) } },
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
        ], function(err, results) {
            results.forEach(function(result) {
                comments.push(result.comments);
            });
            deferred.resolve(comments);
        });
        return deferred.promise;
    },

    storeNewComment: function(model, by_id, data){
        var deferred = q.defer();
        model.findOne({ _id: ObjectId.generate(by_id) }, function(err, result) {
            if (result) {
                result.comments.push(data);
                result.total_comment += 1;
                result.save(function(err, result) {
                    if (result) {
                        result.save(function(err, save_result) {
                            if (result) {
                                deferred.resolve(save_result.comments[save_result.comments.length - 1]);
                            }
                        });
                    }
                });
            }
            if (err) {
                deferred.reject({err:err, message: 'MESSAGE.SOMTHING_WENT_WRONG'});
            }
            if (!result) {
                deferred.reject({err:'', message: 'MESSAGE.DATA_NOT_FOUND'});
            }
        });
        return deferred.promise;
    },

    updateComment: function(model, by_id, data){
        var deferred = q.defer();
        model.update({ 'comments._id': by_id }, {
            $set: {
                'comments.$.content': data.content,
                'comments.$.updated_at': Date.now(),
            }
        }, function(err, result) {
            if (result) {
                deferred.resolve(result);
            }
            if (err) {
                deferred.reject({err:err, message: 'MESSAGE.SOMTHING_WENT_WRONG'});
            }
            if (!result) {
                deferred.reject({err:'', message: 'MESSAGE.DATA_NOT_FOUND'});
            }
        });
        return deferred.promise;
    },

    replyComment: function(model, by_id, data){
        var deferred = q.defer();
        model.findOne({ _id: by_id }, function(err, result) {
            if (result) {
                result.comments.push(data);
                result.save(function(err, save_result) {
                    if (save_result) {
                        model.update({ 'comments._id': data.father_id }, {
                            $set: {
                                'comments.$.total_replied': data.total_replied + 1,
                            }
                        }, function(err) {
                            if (!err) {
                                deferred.resolve(save_result.comments[save_result.comments.length - 1]);
                            }
                        });
                    }
                });
            }
            if (err) {
                deferred.reject({err:err, message: 'MESSAGE.SOMTHING_WENT_WRONG'});
            }
            if (!result) {
                deferred.reject({err:'', message: 'MESSAGE.DATA_NOT_FOUND'});
            }
        });

        return deferred.promise;
    },

    getRepliedComments: function(model, by_id, comment_id){
        var comments = [];
        var deferred = q.defer(); 
        var i = 0;
        model.aggregate([
            { $match: { _id: ObjectId.generate(by_id) } },
            { $unwind: '$comments' },
            { $project: { comments: 1 } },
            { $sort: { 'comments.created_at': -1 } },
            { $match: { 'comments.father_id': ObjectId.generate(comment_id) } }, 
            {
                $lookup: {
                    from: 'users',
                    localField: 'comments.user_id',
                    foreignField: '_id',
                    as: 'comments.users'
                }
            }
        ], function(err, results) {
            results.forEach(function(result) {
                i++;
                comments.push(result.comments);
                if (i == results.length) {
                    deferred.resolve(comments);
                }
            });
            deferred.reject({err:err, message: 'MESSAGE.SOMTHING_WENT_WRONG'});
        });

        return deferred.promise;
    },

    moreComments: function(model, by_id, limit, skip){
        var comments = [];
        var i = 0;
        var deferred = q.defer(); 
        model.aggregate([
            { $match: { _id: ObjectId.generate(by_id) } },
            { $unwind: '$comments' },
            { $match: { 'comments.father_id': null } },
            { $project: { comments: 1 } },
            { $sort: { 'comments.created_at': -1 } },
            { $limit: parseInt(limit) },
            { $skip: parseInt(skip) }, {
                $lookup: {
                    from: 'users',
                    localField: 'comments.user_id',
                    foreignField: '_id',
                    as: 'comments.users'
                }
            }
        ], function(err, results) {
            if(err){
                deferred.reject({err:err, message: 'MESSAGE.SOMTHING_WENT_WRONG'});
            } else {
                results.forEach(function(result) {
                    i++;
                    comments.push(result.comments);
                    if (i == results.length) {
                        deferred.resolve(comments);
                    }
                });
            }
        });

        return deferred.promise;
    },

    destroyComment: function(model, by_id, comment_id, type, data){
        if (type === 'comment') {
            var deferred = q.defer();
            model.findOne({ _id: by_id }, function(err, result) {
                if (err) {
                    deferred.reject({err:err, message: 'MESSAGE.SOMTHING_WENT_WRONG'});
                }
                if (!result) {
                    deferred.reject({err:'', message: 'MESSAGE.DATA_NOT_FOUND'});
                }
                if (result) {
                    model.update({ _id: ObjectId.generate(by_id) }, {
                        $pull: {
                            'comments': {
                                $and: [{
                                    $or: [{
                                        '_id': ObjectId.generate(comment_id),
                                    }, {
                                        'father_id': ObjectId.generate(comment_id),
                                    }]
                                }, {
                                    'user_id': ObjectId.generate(data.auth._id),
                                }]
                            }
                        },
                        $set: {
                            'total_comment': result.total_comment - 1,
                        }
                    }, function(err, updateResult) {
                        if(err){
                            deferred.reject({err:err, message: 'MESSAGE.SOMTHING_WENT_WRONG'});
                        } else {
                            deferred.resolve(updateResult);
                        }
                    });
                }
            });
            return deferred.promise;
        }
        if (type === 'replied_comment') {
            var deferred = q.defer();
            //find this replied comment
            model.aggregate([
                { $match: { _id: ObjectId.generate(by_id) } },
                { $unwind: '$comments' },
                { $match: { 'comments._id': ObjectId.generate(comment_id) } },
            ], function(err, find_data) {
                if (err) {
                    deferred.reject({err:err, message: 'MESSAGE.SOMTHING_WENT_WRONG'});
                } else {
                    var this_replied_comment = find_data[0].comments;

                    //find father comment
                    model.aggregate([
                        { $match: { _id: ObjectId.generate(by_id) } },
                        { $unwind: '$comments' },
                        { $match: { 'comments._id': ObjectId.generate(this_replied_comment.father_id) } },
                    ], function(err, find_data) {
                        if(err){
                            deferred.reject({err:err, message: 'MESSAGE.SOMTHING_WENT_WRONG'});
                        }else{
                            var father_comment = find_data[0].comments;

                            model.update({ _id: ObjectId.generate(by_id) }, {
                                $pull: {
                                    'comments': {
                                        $and: [{
                                            '_id': ObjectId.generate(comment_id),
                                        }, {
                                            'user_id': ObjectId.generate(data.auth._id),
                                        }]
                                    }
                                },

                            }, function(err, result) {
                                if (parseInt(result.ok) === 1) {
                                    model.update({ 'comments._id': ObjectId.generate(this_replied_comment.father_id) }, {
                                        $set: {
                                            'comments.$.total_replied': father_comment.total_replied - 1,
                                        }
                                    }, function(err, data) {
                                        deferred.resolve(data);
                                    });
                                } else {
                                    deferred.reject({err:err, message: 'MESSAGE.SOMTHING_WENT_WRONG'});
                                }
                            });
                        }
                    });
                }
            });

            return deferred.promise;
        }
    }
}

module.exports = Common;