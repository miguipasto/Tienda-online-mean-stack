const mongoose = require('mongoose');

const comprasSchema = new mongoose.Schema({
  ID_articulo: {
    type: String,
    required: true
  },
  ID_cliente: {
    type: String,
    required: true
  },
  cantidad: {
    type: String,
    required: true
  },
  nombre_comprador: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  titulo_actividad: {
    type: String,
    required: true
  }
});

const Compras = mongoose.model('Compras', comprasSchema);

module.exports = Compras;