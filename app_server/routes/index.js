var express = require('express');
var router = express.Router();
var ctrlLetras = require('../controllers/letras');
var ctrlUsuario = require('../controllers/usuario');

/* GET home page. */
router.get('/',ctrlLetras.listaLetras );
router.get('/detalle',ctrlLetras.MostrarLetra);
router.get('/upload',ctrlLetras.uploadLetra);

/*Vistas para el inicio y regitro de sesion*/
router.get('/login',ctrlUsuario.iniciarSesion);
router.get('/registro',ctrlUsuario.registrarUsuario);
module.exports = router;
