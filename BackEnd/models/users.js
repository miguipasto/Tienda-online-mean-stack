const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  rol: {
    type: String,
    required: true
  }
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;