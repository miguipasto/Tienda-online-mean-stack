const Users = require('../models/users');

const createUsers = async (req, res) => {
  try {
    const { rol } = req.body;
    const user = new Users({ rol });
    const savedUser = await user.save();
    console.log("New user : " + user );
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsersRol = async (req, res) => {
  try {
    let { keyword } = req.query;  
    let users = await Users.find({ _id: keyword });
    console.log("Asked for rol ID : "+keyword);
    res.json(users);
  } catch (error) {
    console.log("No existe");
    res.json("Error: No existe");
    //res.status(500).json({ message: error.message });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const userDelete = await Users.findByIdAndRemove(req.params._id);
    console.log("Deleted user : "+req.params._id);
    res.json(userDelete);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const searchUsers = async (req, res) => {
  try {
    let { keyword } = req.query;
    let usersSearched = [];
    if (!keyword) {
      usersSearched = await Users.find();
    } else {
      usersSearched = await Users.find({ rol: keyword });

      if (usersSearched.length === 0) {
        usersSearched = await Users.find({ _id: keyword });
      }
    }
    res.json(usersSearched);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUsers,
  getUsers,
  deleteUsers,
  getUsersRol,
  searchUsers
};