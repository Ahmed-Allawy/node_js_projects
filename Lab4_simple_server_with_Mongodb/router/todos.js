const express = require('express');
const router = express.Router();
const Todo = require('../model/todos') 

// router.get('/:userId',async(req,res,next)=>{
//   try {
//     const str = req.params.userId;
//     const id = str.replace(/:/g, "");
//     console.log(id);
//     const todos = await Todo.find({userId:id}, {title:1,status:1,tags:1,_id:0});
//     res.json(todos);
//   } catch (error) {
//     error.statusCode = 401;
//     next(error);
//   }
// });
router.post('/',async (req,res, next)=>{
  try {
    const {userId, title, status, tags} = req.body;
    // Create a new todo
    const todo = new Todo({userId, title, status, tags});
    // Save the todo to the database
    await todo.save();

    res.json({ message: 'Tod was created successfully' });
  } catch (error) {
    error.statusCode = 422;
    next(error);
  }
});
router.delete('/:id',async (req,res, next)=>{
  try {
    const str = req.params.id;
    const id = str.replace(/:/g, "");
    // Find the todo by ID and delete it
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ message: 'todo was deleted successfully' });
  } catch (error) {
    error.statusCode = 422;
    next(error);
  }
});
router.patch('/:id',async (req,res, next)=>{
  try {
    const str = req.params.id;
    const id = str.replace(/:/g, "");
    const { title, status, tags,} = req.body;

    // Find the todo by ID and update the fields
    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, status, tags,},
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ error: 'todo not found' });
    }

    res.json({ message: 'todo was edited successfully', todo });
  } catch (error) {
    error.statusCode = 422;
    next(error);
  }
});


router.get('/:userId',async(req,res,next)=>{
  try {
    const str = req.params.userId;
    const id = str.replace(/:/g, "");

    const { limit = 10, skip = 0 } = req.query;
    const limitNum = parseInt(limit, 10);
    const skipNum = parseInt(skip, 10);
    const todos = await Todo.find({userId:id}, {title:1,status:1,tags:1,_id:0})
    .limit(limitNum)
    .skip(skipNum);;
    res.json(todos);
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
});
module.exports = router;