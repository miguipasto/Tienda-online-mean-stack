const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const { createActivities, getActivities,consultarRol,deleteActivities,updateActivities,search } = require('../controllers/activitiesController');


// Configurar multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/'); // Directorio donde se guardarán los archivos subidos
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Nombre original del archivo
    }
  });
  
const upload = multer({storage: storage }); // Crear el middleware de multer

// Crear una actividad
router.post('/createActivities', upload.single('imagen'), createActivities);

// Obtener las actividades
router.get('/getActivities', getActivities);

// Eliminar
router.delete('/deleteActivities/:_id',deleteActivities);

//Actualizar
router.put('/updateActivities/:_id',upload.single('imagen'),updateActivities);

//Búsqueda
router.get('/searchActivities', search);

//Consulta rol
router.get('/consultarRol', consultarRol);

module.exports = router;
