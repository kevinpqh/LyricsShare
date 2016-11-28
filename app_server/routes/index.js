var express = require('express');
var router = express.Router();

//var ctrlPubli = require('../controllers/publicacion');
var ctrlLetras = require('../controllers/letras');
var ctrlUsuario = require('../controllers/usuario');
var ctrlComentario = require('../controllers/comentario');

var ctrlOthers = require('../controllers/others');

/* GET home page. */
router.get('/',ctrlOthers.angularApp );
router.get('/detalle/:publishid',ctrlLetras.MostrarLetra);
//router.get('/detalle/:publishid/comment',ctrlLetras.CrearComentario);
router.get('/upload',ctrlLetras.uploadLetra);
router.post('/upload',ctrlLetras.createPublish);

router.post('/detalle/:publishid/comment',ctrlComentario.CommentCreate);




/*Vistas para el inicio y regitro de sesion*/
router.get('/login',ctrlUsuario.iniciarSesion);
router.post('/login',ctrlUsuario.doIniciarSesion);
router.get('/registro',ctrlUsuario.registrarUsuario);
router.post('/registro',ctrlUsuario.addRegistrarUsuario);

module.exports = router;
