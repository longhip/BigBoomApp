'use strict';
var User = require('./user.model.js');
var ResponseService = require.main.require('./services/response.service');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var uploadPath = 'public/uploads/';
var mongoose = require('mongoose');
var feilds = {
  password:0,
};
var UserController = {

    index: function(req, res) {
        User.find({ store_id: req.auth.store_id },feilds, function(err, results) {
            if (err) {
                ResponseService.json(res, false, '', 'MESSAGE.SOMETHING_WENT_WRONG');
            } else {
                ResponseService.json(res, true, results, '');
            }
        });
    },


    store: function(req, res) {
        req.assert('name.firstname', 'VALIDATE_MESSAGE.REQUIRED').notEmpty();
        req.assert('name.lastname', 'VALIDATE_MESSAGE.REQUIRED').notEmpty();
        req.assert('email', 'VALIDATE_MESSAGE.EMAIL_INVALID').notEmpty().isEmail();
        req.assert('phone', 'VALIDATE_MESSAGE.NOT_NUMBER').len(6, 13);
        req.assert('password', 'VALIDATE_MESSAGE.PASSWORD_TOO_SHORT').len(6, 100);
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            User.findOne({ email: req.body.email }, function(err, result) {
                if (err) {
                    ResponseService.json(res, false, '', 'MESSAGE.SOMETHING_WENT_WRONG');
                }
                if (result) {
                    ResponseService.json(res, false, '', 'MESSAGE.YOUR_EMAIL_ALREADY_EXISTS');
                }
                if (!result) {
                    var data = {
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        gender: req.body.gender,
                        password: bcrypt.hashSync(req.body.password),
                        address: req.body.address,
                        avatar: req.body.avatar,
                        role_id:req.body.role_id,
                        active: 1,
                        status: 1,
                        feeds: [],
                        friends: [],
                        store_likes: [],
                        store_follows: [],
                        type: 0,
                        permissions:[],
                        created_at: Date.now(),
                        updated_at: Date.now(),
                        created_by: new mongoose.Types.ObjectId(req.auth._id),
                        updated_by: new mongoose.Types.ObjectId(req.auth._id),
                        store_id: new mongoose.Types.ObjectId(req.auth.store_id),
                    };
                    var user = new User(data);
                    user.save(function(err, result) {
                        if (err) {
                            ResponseService.json(res, false, err, 'MESSAGE.CREATE_FAILED');
                        }else{
                          if (!fs.existsSync(uploadPath + user._id)){
                              fs.mkdirSync(uploadPath + user._id);
                          }
                          ResponseService.json(res, true, result, 'MESSAGE.CREATE_SUCCESS');
                        }
                    });
                }
            });
        }
    },

    information: function(req, res) {
        req.assert('name.firstname', 'VALIDATE_MESSAGE.REQUIRED').notEmpty();
        req.assert('name.lastname', 'VALIDATE_MESSAGE.REQUIRED').notEmpty();
        req.assert('email', 'VALIDATE_MESSAGE.EMAIL_INVALID').notEmpty().isEmail();
        req.assert('phone', 'VALIDATE_MESSAGE.NOT_NUMBER').len(6, 13);
        req.assert('password', 'VALIDATE_MESSAGE.PASSWORD_TOO_SHORT').len(6, 100);
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            User.findOne({ _id: req.auth._id }, function(err, result) {
                if (err) {
                    ResponseService.json(res, false, '', 'MESSAGE.SOMETHING_WENT_WRONG');
                }
                if (!result) {
                    ResponseService.json(res, false, '', 'MESSAGE.NOT_FOUND');
                }
                if (result) {
                    var email = req.body.email;
                    User.findOne({ email: email }, function(err, user) {
                        if (err) {
                            ResponseService.json(res, false, '', 'MESSAGE.SOMETHING_WENT_WRONG');
                        }
                        if (user) {
                            if (user.email == result.email) {
                                result.name = req.body.name;
                                result.phone = req.body.phone;
                                result.address = req.body.address;
                                result.save(function(err, data) {
                                    if (err) {
                                        ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                                    } else {
                                        ResponseService.json(res, true, data, 'MESSAGE.UPDATE_SUCCESS');
                                    }
                                });
                            } else {
                                ResponseService.json(res, false, '', 'MESSAGE.YOUR_EMAIL_ALREADY_EXISTS');
                            }
                        }
                        if (!user) {
                            result.name = req.body.name;
                            result.phone = req.body.phone;
                            result.address = req.body.address;
                            result.email = email;
                            result.save(function(err, data) {
                                if (err) {
                                    ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                                } else {
                                    ResponseService.json(res, true, data, 'MESSAGE.UPDATE_SUCCESS');
                                }
                            });
                        }
                    });
                }
            });
        }
    },

    password: function(req, res) {
        req.assert('old_password', 'VALIDATE_MESSAGE.PASSWORD_TOO_SHORT').len(6, 100);
        req.assert('new_password', 'VALIDATE_MESSAGE.PASSWORD_TOO_SHORT').len(6, 100);
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            User.findOne({ _id: req.auth._id }, function(err, user) {
                if (err) {
                    ResponseService.json(res, false, '', 'MESSAGE.SOMETHING_WENT_WRONG');
                }
                if (!user) {
                    ResponseService.json(res, false, '', 'MESSAGE.NOT_FOUND');
                }
                if (user) {
                    if (bcrypt.compareSync(req.body.old_password, user.password)) {
                        user.password = bcrypt.hashSync(req.body.new_password);
                        user.save(function(err, data) {
                            if (err) {
                                ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                            } else {
                                ResponseService.json(res, true, '', 'MESSAGE.UPDATE_SUCCESS');
                            }
                        });
                    } else {
                        ResponseService.json(res, false, err, 'MESSAGE.PASSWORD_OLD_INCORRECT');
                    }
                }
            });
        }
    },

    avatar: function(req, res) {
        req.assert('avatar', 'VALIDATE_MESSAGE.REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            User.findOne({ _id: req.auth._id }, function(err, user) {
                if (err) {
                    ResponseService.json(res, false, '', 'MESSAGE.SOMETHING_WENT_WRONG');
                }
                if (!user) {
                    ResponseService.json(res, false, '', 'MESSAGE.NOT_FOUND');
                }
                if (user) {
                    user.avatar = req.body.avatar;
                    user.save(function(err) {
                        if (err) {
                            ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
                        } else {
                            ResponseService.json(res, true, user, 'MESSAGE.UPDATE_SUCCESS');
                        }
                    });
                }
            });
        }
    },

    profile: function(req, res) {
        User.findOne({ _id: req.auth._id }, function(err, result) {
            if (err) {
                ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
            } else {
                ResponseService.json(res, true, result, '');
            }
        });
    }
};



module.exports = UserController;
