'use strict';
/*
  |--------------------------------------------------------------------------
  | Core
  |--------------------------------------------------------------------------
  | AUTHOR: longnd@steed.vn
*/
var express = require('express');
var MiddlewareAuth = require.main.require('./middleware/auth');
var CommonController = require('./common.controller');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/' + req.auth._id);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
var upload = multer({ storage: storage });
var router = express.Router();

router.post('/upload/single', MiddlewareAuth.handle, upload.single('file'), CommonController.uploadSingle);
router.post('/upload/multiple', MiddlewareAuth.handle, upload.array('files', 12), CommonController.uploadMultiple);
router.post('/file/remove/single',MiddlewareAuth.handle,CommonController.removeFile);

module.exports = router;
