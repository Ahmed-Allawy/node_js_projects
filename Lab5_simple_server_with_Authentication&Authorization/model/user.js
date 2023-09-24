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

schema.methods.checkPassword = async function (password){
  const currentDocument = this;
  return bcrypt.compare(password,currentDocument.password);
}

const secret = 'vkfjvkfjkjdfjfdvjfvjfjfljvfd';
schema.methods.generateToken = async function() {
  const currentDocument = this;
  return signJWT({id:currentDocument.id},secret,{expiresIn:'2h'});
}

verifyJWT( "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MGZhNzg0MWViNzc3OTVkZWE2NDk4OSIsImlhdCI6MTY5NTUyODkwNSwiZXhwIjoxNjk1NTI5MDI1fQ.7AAFuquJv-pGrIdGhn-YBtdFfK8xh40viOy9HLqE_vI",
secret).then((payload)=>{console.log(payload);}).catch(err=>console.log(err));

const User = mongoose.model('User', schema);


module.exports = User;