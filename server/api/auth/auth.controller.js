'use strict';
var User = require('../user/user.model');
var Store = require('../store/store.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
var config = require.main.require('./config/express');
var bcrypt = require('bcrypt-nodejs');
var ResponseService = require.main.require('./services/response.service');


module.exports.login = function(req, res) {
    req.assert('email', 'VALIDATE_MESSAGE.EMAIL_INVALID').notEmpty().isEmail();
    req.assert('password', 'VALIDATE_MESSAGE.PASSWORD_TOO_SHORT').len(6, 100);
    var errors = req.validationErrors();
    if (errors) {
        ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
    } else {
        User.findOne({
            email: req.body.email
        }, function(err, user) {
            if (err) {
                ResponseService.json(res, false, err, 'MESSAGE.SOMETHING_WENT_WRONG');
            }
            if (!user) {
                res.json({ success: false, message: 'MESSAGE.USER_NOT_FOUND' });
            } else {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: '1 days'
                    });
                    Store.findOne({ _id: user.store_id }, function(err, store) {
                        if (err) res.json({ status: false });
                        res.json({
                            status: true,
                            message: 'MESSAGE.LOGIN_SUCCESS',
                            token: token,
                            user: user,
                            store: store
                        });
                    });
                } else {
                    ResponseService.json(res, false, '', 'MESSAGE.PASSWORD_INCORRECT');
                }
            }
        });
    }
};
