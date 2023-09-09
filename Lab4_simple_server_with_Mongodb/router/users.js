const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}, 'firstName');
    const firstNames = users.map(user => user.firstName);
    res.json(firstNames);
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database by username and password
    const user = await User.findOne({ username, password }).populate('todos');
    if (!user) {
      // If authentication failed, return an error response
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      // If login is successful, return a success response with user details
      res.json({
        message: 'Logged in successfully',
        username: user.userName,
        todos: user.todos,
      });
    }
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }

});

router.post('/register', async (req, res, next) => {
  try {
    const { userName, password, firstName, age } = req.body;
    // Create a new user
    const user = new User({ userName, password, firstName, age });
    // Save the user to the database
    await user.save();

    res.json({ message: 'User was registered successfully' });
  } catch (error) {
    error.statusCode = 422;
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const str = req.params.id;
    const id = str.replace(/:/g, "");
    
    console.log(id);
    // Find the user by ID and delete it
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User was deleted successfully' });
  } catch (error) {
    error.statusCode = 422;
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const str = req.params.id;
    const id = str.replace(/:/g, "");
    const { username, password, firstName, age } = req.body;

    // Find the user by ID and update the fields
    const user = await User.findByIdAndUpdate(
      id,
      { username, password, firstName, age },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User was edited successfully', user });
  } catch (error) {
    error.statusCode = 422;
    next(error);
  }
});

module.exports = router;