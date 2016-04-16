'use strict';
var Store = require('./store.model');
var Category = require('./category/category.model');
var Article = require('./article/article.model');
var User = require('../user/user.model');
var bcrypt = require('bcrypt-nodejs');
var ResponseService = require.main.require('./services/response.service');
var mongoose = require('mongoose');
var fs = require('fs');
var uploadPath = 'public/uploads/';



var StoreController = {

    index: function(req, res) {
        Store.findOne({ _id: req.auth.store_id }, function(err, store) {
          if(store){
              Article.find({ store_id: req.auth.store_id }).limit(10).sort({created_at:-1}).exec(function(err,articles){
              if (err) {
                ResponseService.json(res, false, '', 'MESSAGE.SOMETHING_WENT_WRONG');
              }else{
                ResponseService.json(res, true, { store: store,articles:articles }, '');
              }
            });
          }
          if(err){
            if (err) {
              ResponseService.json(res, false, '', 'MESSAGE.SOMETHING_WENT_WRONG');
            }
          }
          if(!store){
            ResponseService.json(res, false, '', 'MESSAGE.DATA_NOT_FOUND');
          }
        });
    },

    update: function(req, res) {
        req.assert('name', 'VALIDATE_MESSAGE.REQUIRED').notEmpty();
        req.assert('email', 'VALIDATE_MESSAGE.EMAIL_INVALID').notEmpty().isEmail();
        req.assert('phone', 'VALIDATE_MESSAGE.NOT_NUMBER').len(8, 30);
        req.assert('address', 'VALIDATE_MESSAGE.NOT_NUMBER').len(0, 255).notEmpty();
        req.assert('region', 'VALIDATE_MESSAGE.PASSWORD_TOO_SHORT').notEmpty();
        req.assert('city', 'VALIDATE_MESSAGE.REQUIRED').notEmpty();
        req.assert('wifi_name', 'VALIDATE_MESSAGE.REQUIRED').notEmpty();
        req.assert('wifi_pass', 'VALIDATE_MESSAGE.REQUIRED').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            ResponseService.json(res, false, errors, 'MESSAGE.VALIDATOR_FAILED');
        } else {
            Store.findOne({ _id: req.auth.store_id }, function(err, store) {
                store.name = req.body.name;
                store.email = req.body.email;
                store.phone = req.body.phone;
                store.address = req.body.address;
                store.region = req.body.region;
                store.city = req.body.city;
                store.wifi_name = req.body.wifi_name;
                store.wifi_pass = req.body.wifi_pass;
                store.open = req.body.open;
                store.close = req.body.close;
                store.price_from = req.body.price_from;
                store.to_price = req.body.to_price;
                store.save(function(err, result) {
                    if (err) {
                        ResponseService.json(res, false, '', 'MESSAGE.SOMETHING_WENT_WRONG');
                    }
                    if (result) {
                        ResponseService.json(res, true, { store: result }, 'MESSAGE.UPDATE_SUCCESS');
                    }
                    if (!result) {
                        ResponseService.json(res, false, '', 'MESSAGE.DATA_NOT_FOUND');
                    }
                });
            });
        }
    },

    updateCoverImage: function(req, res) {
        Store.findOne({ _id: req.auth.store_id }, function(err, store) {
            if(req.file){
              store.cover_image = req.file.path;
              store.save(function(err, result) {
                  if (err) {
                      ResponseService.json(res, false, '', 'MESSAGE.SOMETHING_WENT_WRONG');
                  }
                  if (result) {
                      ResponseService.json(res, true, { store: result }, 'MESSAGE.UPDATE_SUCCESS');
                  }
                  if (!result) {
                      ResponseService.json(res, false, '', 'MESSAGE.DATA_NOT_FOUND');
                  }
              });
            }else{
              ResponseService.json(res, false, '', 'MESSAGE.FILE_NOT_FOUND');
            }
        });
    },

    updateLogo: function(req, res) {
        Store.findOne({ _id: req.auth.store_id }, function(err, store) {
            if(req.file){
              store.logo = req.file.path;
              store.save(function(err, result) {
                  if (err) {
                      ResponseService.json(res, false, '', 'MESSAGE.SOMETHING_WENT_WRONG');
                  }
                  if (result) {
                      ResponseService.json(res, true, { store: result }, 'MESSAGE.UPDATE_SUCCESS');
                  }
                  if (!result) {
                      ResponseService.json(res, false, '', 'MESSAGE.DATA_NOT_FOUND');
                  }
              });
            }else{
              ResponseService.json(res, false, '', 'MESSAGE.FILE_NOT_FOUND');
            }
        });
    },




    seed: function(req, res) {
        var category = new Category({
            name: 'Quán ăn'
        });
        category.save(function(err, category) {
            if (category) {
                var store = new Store({
                    store_category_id: new mongoose.Types.ObjectId(category._id),
                    store_admin_id: new mongoose.Types.ObjectId(category._id),
                    name: 'Quán ăn BigBoom',
                    email: 'contact@bigboom.vn',
                    phone: '01673064113',
                    logo: '',
                    cover_image: '',
                    address: '154 Đường Cổ Nhuế',
                    city: 'Hà Nội',
                    region: 1,
                    open: '09:00',
                    close: '19:00',
                    wifi_name: 'BigBoom',
                    wifi_pass: 'bigboom',
                    ip: '42.112.71.201',
                    feeds: [],
                    likes: [],
                    follows: [],
                    comments: [],
                    price_from: '50000',
                    to_price: '2000000',
                    rates: []
                });
                store.save(function(err, store) {
                    if (store) {
                        var user = new User({
                            name: {
                              firstname:'Long',
                              lastname:'Híp'
                            },
                            email: 'longhip.dev@gmail.com',
                            password: bcrypt.hashSync('bboylongkon'),
                            avatar: '',
                            phone: '034343434',
                            permissions: [],
                            gender: 1,
                            active: 1,
                            deleted: 0,
                            status: 1,
                            feeds: [],
                            friends: [],
                            store_likes: [],
                            store_follows: [],
                            type: 0,
                            created_at: Date.now(),
                            updated_at: Date.now(),
                            store_id: store._id
                        });
                        user.save(function(err, result) {
                            if (err) {
                                res.json(err);
                            } else {
                                if (!fs.existsSync(uploadPath + result._id)){
                                    fs.mkdirSync(uploadPath + result._id);
                                }
                                store.store_admin_id = new mongoose.Types.ObjectId(result._id);
                                store.save(function(err,store_result){
                                  res.json({ status: true, data: result,store:store_result });
                                });
                            }
                        });
                    }
                });
            }
        });
    }
};

module.exports = StoreController;
