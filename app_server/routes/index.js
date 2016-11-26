var express = require('express');
var router = express.Router();
var ctrlPubli = require('../controllers/publicacion');
var ctrlLetras = require('../controllers/letras');
var ctrlComentario = require('../controllers/comentario');
var ctrlUsuario = require('../controllers/usuario');

router.get('/',ctrlPubli.home );
router.get('/detalle/:publishid',ctrlLetras.MostrarLetra);
router.get('/upload',ctrlPubli.uploadPublish);
router.post('/upload',ctrlPubli.createPublish);
router.post('/detalle/:publishid/comment',ctrlComentario.CommentCreate);

/*Vistas para el inicio y regitro de sesion*/
router.get('/login',ctrlUsuario.iniciarSesion);
router.post('/login',ctrlUsuario.doIniciarSesion);
router.get('/registro',ctrlUsuario.registrarUsuario);
router.post('/registro',ctrlUsuario.addRegistrarUsuario);

module.exports = router;
