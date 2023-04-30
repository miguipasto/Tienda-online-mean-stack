const express = require('express');
const usersRoute = require('./routes/usersRoute');
const cors = require('cors');

//Base de datos
require('./bd/bd');

// Configuración de Express
const app = express();
app.use(express.json());
app.use(cors());

// Rutas
app.use(usersRoute);

//Imagenes
const path = require('path');

// Crea una ruta para la API
app.get('/', (req, res) => {
  res.json({ mensaje: 'Microservcio gestión de Usuarios' });
});

// Inicio del servidor
app.listen(4000, () => {
  console.log('MICROSERVICIO GESTION DE USUARIOS');
  console.log('Server started on port 4000');
});