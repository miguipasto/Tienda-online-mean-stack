const express = require('express');
const router = express.Router();
const { getUsersRol, createUsers , getUsers,searchUsers,deleteUsers} = require('../controllers/usersController');

// Crear un usuario
router.post('/createUsers',createUsers);

// Obtener los usuarios
router.get('/getUsers', getUsers);

// Eliminar un usuario
router.delete('/deleteUsers/:_id',deleteUsers);

// Obtener el rol de un usuario
router.get('/getUsersByRol', getUsersRol);

// Buscar usuarios
router.get('/searchUsers', searchUsers);

module.exports = router;    
