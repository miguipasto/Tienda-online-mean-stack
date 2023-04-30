const Compras = require('../models/compras');
const Activities = require('../models/activities');
const Users = require('../models/users')
const axios = require('axios');

const getActivities = async (req, res) => {
  try {
    const activities = await Activities.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchActivities = async (req, res) => {
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

const getCompras = async (req, res) => {
  try {
    let { keyword } = req.query;
    let comprasSearched = [];
    if (keyword) {
      // Buscar las compras por palabra clave
      comprasSearched = await Compras.find({
        ID_cliente: { $regex: keyword.toString(), $options: "i" }
      });
    }
    console.log("Asked for compras : ID " + keyword);
    res.json(comprasSearched);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCompras = async (req, res) => {
  try {
    let rol;
    let cantidadActividad;
    let { ID_articulo, ID_cliente, cantidad, nombre_comprador, direccion, titulo_actividad } = req.body;
    const respuesta = await axios.get(`http://localhost:4000/getUsersByRol/?keyword=${ID_cliente}`).then((response) => {
      rol = response.data[0].rol;
    })
    if (rol == 'Cliente') {
      const actividad = await Activities.findById(ID_articulo);
      cantidadActividad = parseInt(actividad.cantidad);
      cantidadActividad = cantidadActividad - parseInt(cantidad);
      //Si hay cantidad
      if (cantidadActividad >= 0) {
        const cantidad_update = await Activities.findByIdAndUpdate(ID_articulo, { cantidad: cantidadActividad.toString() });
        //const titulo_actividad = actividad.titulo;w
        const compra = new Compras({ ID_articulo, ID_cliente, cantidad, nombre_comprador, direccion, titulo_actividad });
        const savedCompra = await compra.save();
        console.log("New buy : "+compra);
        res.status(201).json(savedCompra);
      } else {
        console.log("Error buying : No hay cantidad suficiente");
        res.status(400).json({ message: "No hay cantidad suficiente" });
      }
    } else {
      console.log("Error : El comprador no es un cliente");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const consultarRol = async (req, res) => {
  try {
    const { keyword } = req.query;
    let rol;
    const respuesta = await axios.get(`http://localhost:4000/getUsersByRol/?keyword=${keyword}`).then((response) => {
      rol = response.data[0].rol;
    })
    console.log("Asked for rol : "+keyword+" -> "+rol);
    res.json(rol);
  } catch (error) {
    res.json("Error: No existe");
    /* res.status(400).json({ message: error.message }); */
  }
};

const searchCompras = async (req, res) => {
  try {
    let { keyword } = req.query;
    const ID_cliente = req.params._id;
    let comprasSearched = [];
    if (!keyword) {
      // Si no hay palabra clave, devolver todas las compras
      comprasSearched = await Compras.find( { ID_cliente: ID_cliente });
    } else {
      // Buscar compras por palabra clave
      comprasSearched = await Compras.find({
        $and: [
          { ID_cliente: ID_cliente },
          {
            $or: [
              { cantidad: { $regex: keyword.toString(), $options: "i" } },
              { nombre_comprador: { $regex: keyword.toString(), $options: "i" } },
              { ID_articulo: { $regex: keyword.toString(), $options: "i" } },
              { direccion: { $regex: keyword.toString(), $options: "i" } },
              { ID_cliente: { $regex: keyword.toString(), $options: "i" } },
              { titulo_actividad: { $regex: keyword.toString(), $options: "i" } }
            ]
          }
        ]
      });
      // Si no se encontraron compras por palabra clave, buscar por ID_compra
      if (comprasSearched.length === 0) {
        comprasSearched = await Compras.find({
          $and: [
            { ID_cliente: ID_cliente },
            { _id: keyword }
          ]
        });
      }
    }
    res.json(comprasSearched);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCompras = async (req, res) => {
  try {
    const compra = await Compras.findById(req.params._id);
    const comprasDelete = await Compras.findByIdAndRemove(req.params._id);

    //Actualizamos cantidad
    const ID_articulo = compra.ID_articulo;
    const actividad = await Activities.findById(ID_articulo);
    cantidadActividad = parseInt(compra.cantidad);
    cantidadActividad = cantidadActividad + parseInt(actividad.cantidad);
    const cantidad_update = await Activities.findByIdAndUpdate(ID_articulo, { cantidad: cantidadActividad.toString() });

    console.log("Compra deleted : " +req.params._id);
    res.json(comprasDelete);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCompras = async (req, res) => {
  try {
    const { nombre_comprador, direccion } = req.body;
    const compra_update = await Compras.findByIdAndUpdate(req.params._id, { nombre_comprador, direccion });
    console.log("Compra updated : "+req.params._id);
    res.json(compra_update);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getActivities,
  searchActivities,
  getCompras,
  searchCompras,
  updateCompras,
  deleteCompras,
  createCompras,
  consultarRol
};


