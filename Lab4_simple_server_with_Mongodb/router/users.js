const express = require('express');
const router = express.Router();
const user = require('../model/user');

router.get('/',async (req,res,next)=>{
  try {
    const users = await user.find();
    res.send(users); 
  } catch (error) {
    console.log(err);
    next(error);
  }
  // res.send('return all users')
});
router.post('/login',async (req,res,next)=>{
  try {
    const newUser = new user({
      username:'ali'
     });
     const u = await newUser.save();

     res.status(200).send(u);
  } catch (error) {
    console.log(error);
    error.statusCode = 422;
    next(error);
  }
 
});
router.post('/register',(req,res)=>{
  res.send('register')
});
router.delete('/:id',(req,res)=>{
  res.send('delete')
});
router.patch('/:id',async (req,res)=>{
  const uu = await user.updateOne({username:'ali'},{$set:{username:'momo'}});
  res.send(uu)
});
module.exports = router;