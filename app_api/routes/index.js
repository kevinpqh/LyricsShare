var express = require('express');
var router = express.Router();

var ctrlUser = require('../controllers/usuario');
var ctrlPublish= require('../controllers/publicacion');
var ctrlComment = require('../controllers/comentario');


/*USUARIO API*/
router.get('/user', ctrlUser.UserListById);//obtenemos la lista de ususrios
router.post('/user', ctrlUser.UserCreate);//creaar ususrios
router.get('/user/login/', ctrlUser.UserReadOne);//motrar un ususrios en especifico
router.put('/user/:userid', ctrlUser.UserUpdateOne);// actualizar un ususrios en especifico
router.delete('/user/:userid', ctrlUser.UserDeleteOne); //deliminar  un ususrios en especifico

/*Publicacion api*/
router.get('/publish', ctrlPublish.PublishListById);//obtenemos la lista de ususrios
router.post('/publish', ctrlPublish.PublishCreate);//creaar ususrios
router.get('/publish/:publishid', ctrlPublish.PublishReadOne);//motrar un ususrios en especifico
router.put('/publish/:publishid', ctrlPublish.PublishUpdateOne);// actualizar un ususrios en especifico
router.delete('/publish/:publishid', ctrlPublish.PublishDeleteOne); //deliminar  un ususrios en especifico



/*Comentarios api*/
//router.get('/publish/:publishid/comment', ctrlComment.CommentListById);//obtenemos la lista de ususrios
router.post('/publish/:publishid/comment', ctrlComment.CommentCreate);//creaar ususrios
router.get('/publish/:publishid/comment/:commentid', ctrlComment.CommentReadOne);//motrar un ususrios en especifico
router.put('/publish/:publishid/comment/:commentid', ctrlComment.CommentUpdateOne);// actualizar un ususrios en especifico
router.delete('/publish/:publishid/comment/:commentid', ctrlComment.CommentDeleteOne); //deliminar  un ususrios en especifico


module.exports = router;
