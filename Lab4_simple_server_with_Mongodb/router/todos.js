const express = require('express');
const router = express.Router();

router.get('/:userId',(req,res)=>{
  res.send('return all dotos')
});
router.post('/',(req,res)=>{
  res.send('add todo')
});
router.delete('/:id',(req,res)=>{
  res.send('delete')
});
router.patch('/:id',(req,res)=>{
  res.send('edit')
});
module.exports = router;