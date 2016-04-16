'use strict';

var express = require('express');
var controller = require('./chat.controller');
var MiddlewareAuth = require.main.require('./middleware/auth');
var router = express.Router();


router.get('/messages/private/:user_receive_id',MiddlewareAuth.handle,controller.getMessagePrivate);
router.get('/messages/private/more-message/:user_receive_id/:skip',MiddlewareAuth.handle,controller.getMoreMessagePrivate);
router.get('/messages/recent-message',MiddlewareAuth.handle,controller.getRecentMessage);
router.get('/messages/unread-message-count',MiddlewareAuth.handle,controller.getUnreadMessageCount);
router.put('/messages/read-message/:user_send_id/:user_receive_id',MiddlewareAuth.handle,controller.putReadMessage);
router.post('/messages/group',MiddlewareAuth.handle,controller.postCreateGroupChat);
router.get('/messages/group',MiddlewareAuth.handle,controller.getListGroupChat);
router.get('/messages/group/:group_id',MiddlewareAuth.handle,controller.getDetailGroupChat);
router.get('/messages/group/more-message/:group_id/:skip',MiddlewareAuth.handle,controller.getMoreGroupMessage);
router.put('/messages/group/update-name/:group_id',MiddlewareAuth.handle,controller.putUpdateGroupName);
router.put('/messages/group/update-user/:group_id',MiddlewareAuth.handle,controller.putUpdateGroupUser);

module.exports = router;
