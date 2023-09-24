const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const util = require('util')

const signJWT = util.promisify(jwt.sign);
const verifyJWT = util.promisify(jwt.verify);

const schema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15
  },
  age: {
    type: Number,
    min: 13
  },
  // todos: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Todo',
  //   },
  // ],
});
const saltOrRounds = 10;
schema.pre('save',async function() {
  const currentDocument = this;
  if(currentDocument.isModified('password')){
    currentDocument.password = await bcrypt.hash(currentDocument.password, saltOrRounds);
  }
});

schema.pre('findOneAndUpdate', async function(next) {
  const currentDocument = this._update;
  
  currentDocument.password = bcrypt.hashSync(currentDocument.password, saltOrRounds)
    next();
});

schema.methods.checkPassword = async function (password){
  const currentDocument = this;
  return bcrypt.compare(password,currentDocument.password);
}

const secret = 'vkfjvkfjkjdfjfdvjfvjfjfljvfd';
schema.methods.generateToken = async function() {
  const currentDocument = this;
  return signJWT({id:currentDocument.id},secret,{expiresIn:'2d'});
}

schema.statics.getIdFromToken = async function (token) {
  const currentDocument = this;
  const {id} = await verifyJWT(token, secret);
  return id;
  
}

const User = mongoose.model('User', schema);


module.exports = User;