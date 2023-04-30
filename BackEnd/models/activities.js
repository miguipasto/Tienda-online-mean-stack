const mongoose = require('mongoose');

const activitiesSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    index: true
  },
  participantes: {
    type: String,
    required: true,
  },
  localizacion: {
    type: String,
    required: true,
    index: true
  },
  precio: {
    type: String,
    required: true
  },
  duracion: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  edad: {
    type: String,
    required: true
  },
  dificultad: {
    type: String,
    required : true
  },
  categoria:{
    type: String,
    required: true
  },
  imagen: {
    data: Buffer,
    contentType: String,
    originalName: String
  },
  cantidad: {
    type : String,
    required : true
  }
});


activitiesSchema.index({titulo: 1, localizacion: 1}, {unique:true});
const activities = mongoose.model('activities', activitiesSchema);

module.exports = activities;
