const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const { getActivities, searchActivities,consultarRol,getCompras, createCompras, searchCompras, updateCompras, deleteCompras} = require('../controllers/comprasController');

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


// Obtener las actividades
router.get('/getActivities', getActivities);

// Obtener las compras
router.get('/getCompras', getCompras);

// Nueva compra
router.post('/nuevasCompras', upload.single('file'),createCompras);

//Búsqueda de actividades
router.get('/searchActivities', searchActivities);

//Búsqueda de compras
router.get('/searchCompras/:_id', searchCompras);

//Modificar compra
router.put('/updateCompras/:_id',upload.single('file'),updateCompras);

//Eliminar compra
router.delete('/deleteCompras/:_id',deleteCompras);

//Consulta rol
router.get('/consultarRol', consultarRol);


module.exports = router;
