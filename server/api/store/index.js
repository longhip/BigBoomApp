'use strict';
/*
  |--------------------------------------------------------------------------
  | Main Store  (date_format: dd-mm-yyyy hh:mm)
  |--------------------------------------------------------------------------
  | AUTHOR: longhip.dev@gmail.com
*/
var express = require('express');
var StoreController = require('./store.controller');
var ArticleController = require('./article/article.controller');
var ArticleCommentController = require('./article/article_comment.controller');
var MiddlewareAuth = require.main.require('./middleware/auth');
var MenuController = require('./menu/menu.controller');
var FoodController = require('./menu/food.controller');
var PhotoController = require('./photo/photo.controller');
var FoodCommentController = require('./menu/food_comment.controller');
var PhotoCommentController = require('./photo/photo_comment.controller');
var PhotoAlbumController = require('./photo/photo_album.controller');
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

/*
  |--------------------------------------------------------------------------
  | Store Photo
  |--------------------------------------------------------------------------
  | GET:     api/v1/admin/store/photo                                PhotoController => index (limit:5)
  | POST:    api/v1/admin/store/photo                                PhotoController => store
  | PUT:     api/v1/admin/store/photo/:id                            PhotoController => update
  | DELETE:  api/v1/admin/store/photo/:id                            PhotoController => destroy
  |
  |--------------------------------------------------------------------------
*/
router.get('/photo',MiddlewareAuth.handle,PhotoController.index);
router.post('/photo',MiddlewareAuth.handle,PhotoController.store);
router.put('/photo/:photo_id',MiddlewareAuth.handle,PhotoController.update);
router.get('/photo/:photo_id',MiddlewareAuth.handle,PhotoController.show);
router.put('/photo/hide/:photo_id',MiddlewareAuth.handle,PhotoController.hideThisPhoto);
router.put('/photo/display/:photo_id',MiddlewareAuth.handle,PhotoController.displayThisPhoto);
router.delete('/photo/:photo_id',MiddlewareAuth.handle,PhotoController.destroy);

/*
  |--------------------------------------------------------------------------
  | Store Photo Comment
  |--------------------------------------------------------------------------
  | POST:    api/v1/admin/store/food/comment/:food_id                                   PhotoController => store
  | PUT:     api/v1/admin/store/food/comment/:comment_id                                PhotoController => update
  | DELETE:  api/v1/admin/store/food/comment/:food_id/:comment_id                       PhotoController => destroy
  |
  |--------------------------------------------------------------------------
*/
router.post('/photo/comment/:photo_id',MiddlewareAuth.handle,PhotoCommentController.store);
router.get('/photo/comment/:photo_id',MiddlewareAuth.handle,PhotoCommentController.getComments);
router.put('/photo/comment/:comment_id',MiddlewareAuth.handle,PhotoCommentController.update);
router.post('/photo/comment/reply/:photo_id/:comment_id',MiddlewareAuth.handle,PhotoCommentController.replyComment);
router.get('/photo/comment/replied/:photo_id/:comment_id',MiddlewareAuth.handle,PhotoCommentController.getRepliedComments);
router.get('/photo/comment/more/:photo_id',MiddlewareAuth.handle,PhotoCommentController.moreComments);
router.delete('/photo/comment/:photo_id/:comment_id',MiddlewareAuth.handle,PhotoCommentController.destroy);

/*
  |--------------------------------------------------------------------------
  | Store Photo Album
  |--------------------------------------------------------------------------
  | POST:    api/v1/admin/store/food/comment/:food_id                                   PhotoController => store
  | PUT:     api/v1/admin/store/food/comment/:comment_id                                PhotoController => update
  | DELETE:  api/v1/admin/store/food/comment/:food_id/:comment_id                       PhotoController => destroy
  |
  |--------------------------------------------------------------------------
*/
router.get('/album',MiddlewareAuth.handle,PhotoAlbumController.index);
router.post('/album',MiddlewareAuth.handle,PhotoAlbumController.store);
router.get('/album/:album_id',MiddlewareAuth.handle,PhotoAlbumController.show);
router.put('/album/:album_id',MiddlewareAuth.handle,PhotoAlbumController.update);
router.put('/album/hide/:album_id',MiddlewareAuth.handle,PhotoAlbumController.hideThisAlbum);
router.put('/album/display/:album_id',MiddlewareAuth.handle,PhotoAlbumController.displayThisAlbum);
router.delete('/album/:album_id',MiddlewareAuth.handle,PhotoAlbumController.destroy);



module.exports = router;
