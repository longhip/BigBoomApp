'use strict';

var express = require('express');
var controller = require('./user.controller');
var MiddlewareAuth = require.main.require('./middleware/auth');

var router = express.Router();
router.get('/', MiddlewareAuth.handle, controller.index);
router.get('/profile', MiddlewareAuth.handle, controller.profile);
router.put('/information', MiddlewareAuth.handle, controller.information);
router.put('/password', MiddlewareAuth.handle, controller.password);
router.put('/avatar', MiddlewareAuth.handle, controller.avatar);
router.post('/', MiddlewareAuth.handle, controller.store);
router.post('/register', controller.register);

module.exports = router;