'use strict';
/*
  |--------------------------------------------------------------------------
  | Main Store  (date_format: dd-mm-yyyy hh:mm)
  |--------------------------------------------------------------------------
  | AUTHOR: longnd@steed.vn
*/
var express = require('express');
var StoreController = require('./store.controller');
var ArticleController = require('./article/article.controller');
var ArticleCommentController = require('./article/article_comment.controller');
var MiddlewareAuth = require.main.require('./middleware/auth');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/' + req.auth._id);
  },
  filename: function (req, file, cb) {
      cb(null,  Date.now() + '-' + file.originalname );
  }
});
var upload = multer({ storage: storage });

/*
  |--------------------------------------------------------------------------
  | Store
  |--------------------------------------------------------------------------
  | GET:     api/v1/admin/store                                StoreController => index
  | PUT:     api/v1/admin/store                                StoreController => index
  | POST:    api/v1/admin/store/cover-image                    StoreController => store
  | POST:    api/v1/admin/store/logo                           StoreController => update
  |
  |--------------------------------------------------------------------------
*/
var router = express.Router();
router.get('/',MiddlewareAuth.handle,StoreController.index);
router.put('/',MiddlewareAuth.handle,StoreController.update);
router.post('/cover-image',MiddlewareAuth.handle,upload.single('cover_image'),StoreController.updateCoverImage);
router.post('/logo',MiddlewareAuth.handle,upload.single('logo'),StoreController.updateLogo);
router.get('/seed',StoreController.seed);

/*
  |--------------------------------------------------------------------------
  | Store Article
  |--------------------------------------------------------------------------
  | GET:     api/v1/admin/store/article                                ArticleController => index (limit:5)
  | POST:    api/v1/admin/store/article                                ArticleController => store
  | PUT:     api/v1/admin/store/article/:id                            ArticleController => update
  | DELETE:  api/v1/admin/store/article/:id                            ArticleController => destroy
  |
  |--------------------------------------------------------------------------
*/
router.get('/article',MiddlewareAuth.handle,ArticleController.index);
router.get('/article/:id',MiddlewareAuth.handle,ArticleController.show);
router.get('/article/more/:skip',MiddlewareAuth.handle,ArticleController.more);
router.get('/article/search/result',MiddlewareAuth.handle,ArticleController.search);
router.post('/article',MiddlewareAuth.handle,ArticleController.store);
router.put('/article/:id',MiddlewareAuth.handle,ArticleController.update);
router.put('/article/hide/:id',MiddlewareAuth.handle,ArticleController.hideThisArticle);
router.put('/article/display/:id',MiddlewareAuth.handle,ArticleController.displayThisArticle);
router.delete('/article/:id',MiddlewareAuth.handle,ArticleController.destroy);

/*
  |--------------------------------------------------------------------------
  | Store Article Comment
  |--------------------------------------------------------------------------
  | POST:    api/v1/admin/store/article/comment/:article_id                                ArticleController => store
  | PUT:     api/v1/admin/store/article/comment/:comment_id                                ArticleController => update
  | DELETE:  api/v1/admin/store/article/comment/:article_id/:comment_id                    ArticleController => destroy
  |
  |--------------------------------------------------------------------------
*/
router.post('/article/comment/:article_id',MiddlewareAuth.handle,ArticleCommentController.store);
router.put('/article/comment/:comment_id',MiddlewareAuth.handle,ArticleCommentController.update);
router.post('/article/comment/reply/:article_id/:comment_id',MiddlewareAuth.handle,ArticleCommentController.replyComment);
router.get('/article/comment/replied/:article_id/:comment_id',MiddlewareAuth.handle,ArticleCommentController.getRepliedComments);
router.get('/article/comment/more/:article_id',MiddlewareAuth.handle,ArticleCommentController.moreComments);
router.delete('/article/comment/:article_id/:comment_id',MiddlewareAuth.handle,ArticleCommentController.destroy);



module.exports = router;
