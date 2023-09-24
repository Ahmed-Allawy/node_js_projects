const express = require('express');
const router = express.Router();
const User = require('../model/user');
const checkRequiredParams = require('../middleware/checkRequired')

//////////////////************************  1 : 28 *****/
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

router.post('/login',
  checkRequiredParams(['userName', 'password'])
  , async (req, res, next) => {
    try {
      const { userName, password } = req.body;
      // Find the user in the database by username and password
      const user = await User.findOne({ userName });
      if (!user) {
        // If authentication failed, return an error response
        const error = new Error('userName is wronge');
        error.statusCode = 401;
        throw error;
      } 
        const isMatch = await user.checkPassword(password);
        if (!isMatch) {
          const error = new Error('password is wronge');
          error.statusCode = 401;
          throw error;
        }
        // If login is successful, return a success response with user details
        const token = await user.generateToken();
        res.json({
          message: 'Logged in successfully',
          username: user.userName,
          token,
        });
      
    } catch (error) {

      next(error);
    }

  });


router.post('/register',
  checkRequiredParams(['userName', 'password', 'firstName', 'age']),
  async (req, res, next) => {
    try {
      const { userName, password, firstName, age } = req.body;
      // Create a new user
      const user = new User({ userName, password, firstName, age });
      // Save the user to the database
      await user.save();
      res.json({ message: 'User was registered successfully' });
    } catch (error) {
      error.message = 'this userName used before';
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