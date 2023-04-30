const express = require('express');
const activitiesRoute = require('./routes/activitiesRoute');
const cors = require('cors');
const bodyParser = require('body-parser');

//Base de datos
require('./bd/bd');

// Configuración de Express
const app = express();
app.use(cors());

// Configuración de BodyParser
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

// Rutas
app.use(activitiesRoute);

//Imagenes
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Crea una ruta para la API
app.get('/', (req, res) => {
  res.json({ mensaje: 'Microservcio gestión de Actividades' });
});

// Inicio del servidor
app.listen(3000, () => {
  console.log('MICROSERVICIO GESTION DE ACTIVIDADES');
  console.log('Server started on port 3000');
});