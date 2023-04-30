const Activities = require('../models/activities');
const axios = require('axios');


const createActivities = async (req, res) => {
  try {
    const { titulo, participantes, localizacion, precio, cantidad, duracion, descripcion, edad, dificultad, categoria } = req.body;
    const imagen = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
      originalName: req.file.originalname
    };
    const activity = new Activities({ titulo, participantes, localizacion, precio, cantidad, duracion, descripcion, edad, dificultad, categoria, imagen});
    const savedActivite = await activity.save();
    console.log("New activity :" + activity);
    res.status(201).json(savedActivite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getActivities = async (req, res) => {
  try {
    const activities = await Activities.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteActivities = async (req, res) => {
    try {
        const activityDelete = await Activities.findByIdAndRemove(req.params._id);
        console.log("Activity deleted : "+req.params._id);
        res.json(activityDelete);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const updateActivities = async (req, res) => {
  try {
    const { titulo, participantes, localizacion, precio, cantidad, duracion, descripcion, edad, dificultad, categoria } = req.body;
    let imagen;
    if (req.file) {
      imagen = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        originalName: req.file.originalname
      };
    } else {
      const activity = await Activities.findById(req.params._id);
      imagen = activity.imagen;
    }
    const activityUpdated = await Activities.findByIdAndUpdate(req.params._id,{titulo, participantes, localizacion, precio, cantidad, duracion, descripcion, edad, dificultad, categoria, imagen});
    console.log("Activity updated : "+req.params._id);
    res.json(activityUpdated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const search = async (req, res) => {
  try {
    let { keyword } = req.query;
    let activitiesSearched = [];
    if (!keyword) {
      // Si no hay palabra clave, devolver todas las actividades
      activitiesSearched = await Activities.find();
    } else {
      // Buscar actividades por palabra clave
      activitiesSearched = await Activities.find({
        $or: [
          { titulo: { $regex: keyword.toString(), $options: "i" } },
          { localizacion: { $regex: keyword.toString(), $options: "i" } },
          { categoria: { $regex: keyword.toString(), $options: "i" } },
          { precio: { $regex: keyword.toString(), $options: "i" } },
          { cantidad: { $regex: keyword.toString(), $options: "i" } },
          { participantes: { $regex: keyword.toString(), $options: "i" } },
          { dificultad: { $regex: keyword.toString(), $options: "i" } },
          { edad: { $regex: keyword.toString(), $options: "i" } }
        ]
      });
      // Si no se encontraron actividades por palabra clave, buscar por ID
      if (activitiesSearched.length === 0) {
        activitiesSearched = await Activities.find({ _id: keyword });
      }
    }
    res.json(activitiesSearched);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const consultarRol = async(req,res) => {
  try {
    const { keyword} = req.query;
    let rol;
    const respuesta = await axios.get(`http://localhost:4000/getUsersByRol/?keyword=${keyword}`).then((response) => {
      rol = response.data[0].rol;
    })
    console.log("Asked for rol : "+keyword+" -> "+rol);
    res.json(rol);
  } catch (error) {
    res.json("Error: No existe");/* 
    res.status(400).json({ message: error.message }); */
  }
};

module.exports = {
  createActivities,
  getActivities,
  deleteActivities,
  updateActivities,
  search,
  consultarRol
};
