var express = require('express');
var router = express.Router();

var ctrlUser = require('../controllers/usuario');


/*USUARIO API*/
router.get('/user', ctrlUser.UserListById);//obtenemos la lista de ususrios
router.post('/user', ctrlUser.UserCreate);//creaar ususrios
router.get('/user/login/:userid', ctrlUser.UserLogin);//login de un usuario
router.get('/user/:userid', ctrlUser.UserReadOne);//motrar un ususrios en especifico
router.put('/user/:userid', ctrlUser.UserUpdateOne);// actualizar un ususrios en especifico
router.delete('/user/:userid', ctrlUser.UserDeleteOne); //deliminar  un ususrios en especifico

module.exports = router;