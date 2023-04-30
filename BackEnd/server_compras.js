const express = require('express');
const comprasRoute = require('./routes/comprasRoute');
const cors = require('cors');
const bodyParser = require('body-parser');

//Base de datos
require('./bd/bd');

// Configuración de Express
const app = express();
app.use(cors());

// Configuración de BodyParser
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({})); 

// Rutas
app.use(comprasRoute);

//Imagenes
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Crea una ruta para la API
app.get('/', (req, res) => {
  res.json({ mensaje: 'Microservicio gestión de Compras' });
});

// Inicio del servidor
app.listen(5000, () => {
  console.log('MICROSERVICIO GESTION DE COMPRAS');
  console.log('Server started on port 5000');
});