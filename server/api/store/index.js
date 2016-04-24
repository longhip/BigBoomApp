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
var MenuController = require('./menu/menu.controller');
var FoodController = require('./menu/food.controller');
var FoodCommentController = require('./menu/food_comment.controller');
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

/*
  |--------------------------------------------------------------------------
  | Store Menu
  |--------------------------------------------------------------------------
  | GET:      api/v1/admin/store/menu                                         ArticleController => store
  | POST:     api/v1/admin/store/menu                                         ArticleController => update
  | PUT:      api/v1/admin/store/menu/:menu_id                                ArticleController => update
  | GET:      api/v1/admin/store/menu/:menu_id                                ArticleController => update
  | DELETE:   api/v1/admin/store/menu/:menu_id                                ArticleController => destroy
  |
  |--------------------------------------------------------------------------
*/
router.get('/menu',MiddlewareAuth.handle,MenuController.index);
router.post('/menu',MiddlewareAuth.handle,MenuController.store);
router.put('/menu/:menu_id',MiddlewareAuth.handle,MenuController.update);
router.put('/menu/active/:menu_id',MiddlewareAuth.handle,MenuController.active);
router.get('/menu/:menu_id',MiddlewareAuth.handle,MenuController.show);
router.delete('/menu/:menu_id',MiddlewareAuth.handle,MenuController.delete);

/*
  |--------------------------------------------------------------------------
  | Store Food
  |--------------------------------------------------------------------------
  | GET:     api/v1/admin/store/food                                ArticleController => index (limit:5)
  | POST:    api/v1/admin/store/food                                ArticleController => store
  | PUT:     api/v1/admin/store/food/:id                            ArticleController => update
  | DELETE:  api/v1/admin/store/food/:id                            ArticleController => destroy
  |
  |--------------------------------------------------------------------------
*/
router.get('/food/:food_id',MiddlewareAuth.handle,FoodController.show);
router.post('/food/:menu_id',MiddlewareAuth.handle,FoodController.store);
router.put('/food/:food_id',MiddlewareAuth.handle,FoodController.update);
router.put('/food/hide/:food_id',MiddlewareAuth.handle,FoodController.hideThisFood);
router.put('/food/display/:food_id',MiddlewareAuth.handle,FoodController.displayThisFood);
router.delete('/food/:food_id',MiddlewareAuth.handle,FoodController.destroy);

/*
  |--------------------------------------------------------------------------
  | Store Food Comment
  |--------------------------------------------------------------------------
  | POST:    api/v1/admin/store/food/comment/:food_id                                ArticleController => store
  | PUT:     api/v1/admin/store/food/comment/:comment_id                                ArticleController => update
  | DELETE:  api/v1/admin/store/food/comment/:food_id/:comment_id                    ArticleController => destroy
  |
  |--------------------------------------------------------------------------
*/
router.post('/food/comment/:food_id',MiddlewareAuth.handle,FoodCommentController.store);
router.put('/food/comment/:comment_id',MiddlewareAuth.handle,FoodCommentController.update);
router.post('/food/comment/reply/:food_id/:comment_id',MiddlewareAuth.handle,FoodCommentController.replyComment);
router.get('/food/comment/replied/:food_id/:comment_id',MiddlewareAuth.handle,FoodCommentController.getRepliedComments);
router.get('/food/comment/more/:food_id',MiddlewareAuth.handle,FoodCommentController.moreComments);
router.delete('/food/comment/:food_id/:comment_id',MiddlewareAuth.handle,FoodCommentController.destroy);



module.exports = router;
