var express = require('express');
var router = express.Router();
var ctrlLetras = require('../controllers/letras');

/* GET home page. */
router.get('/',ctrlLetras.listaLetras );
router.get('/detalle',ctrlLetras.MostrarLetra);
router.get('/upload',ctrlLetras.uploadLetra);

module.exports = router;
