const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
});

const user = mongoose.model('users',schema);

module.exports = user;