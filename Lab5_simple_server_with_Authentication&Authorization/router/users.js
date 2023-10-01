const express = require('express');
const router = express.Router();
const User = require('../model/user');
const checkRequiredParams = require('../middleware/checkRequired');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');
/**
 * 
 * @param {*} asyncRouter 
 */
const asyncRounterWrapper = (asyncRouter) => async (req, res, next) => {
  try {
    await asyncRouter(req,res);
  } catch (error) {
    next(error)
  }
}

router.get('/',
  authorizationMiddleware
  ,
  asyncRounterWrapper(async (req, res) => {
    const user = await User.findById(req.id);
    if (!user) {
      throw new Error('user not found')
    }
    res.send(user);
  }),
);

router.post('/login',
  checkRequiredParams(['userName', 'password'])
  , async (req, res, next) => {
    try {
      const { userName, password } = req.body;
      // Find the user in the database by username and password
      const user = await User.findOne({ userName });
      if (!user) {
        // If authentication failed, return an error response
        throw new Error('userName is wronge');
      }
      const isMatch = await user.checkPassword(password);
      if (!isMatch) {
        throw new Error('password is wronge');
      }
      // If login is successful, return a success response with user details
      const token = await user.generateToken();
      res.json({
        message: 'Logged in successfully',
        username: user.userName,
        token,
      });

    } catch (error) {
      error.statusCode = 401;
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

router.delete('/',
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      const id = req.id;
      console.log(id);
      // Find the user by ID and delete it
      const user = await User.findByIdAndDelete(id);

      if (!user) {
        throw new Error('user not found')
      }

      res.json({ message: 'User was deleted successfully' });
    } catch (error) {
      error.statusCode = 422;
      next(error);
    }
  });

router.patch('/',
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      const id = req.id;
      const { username, password, firstName, age } = req.body;
      console.log(id);
      // Find the user by ID and update the fields
      const user = await User.findByIdAndUpdate(
        id,
        { username, password, firstName, age },
        { new: true }
      );

      if (!user) {
        throw new Error('user not found')
      }

      res.json({ message: 'User was edited successfully', user });
    } catch (error) {
      error.statusCode = 422;
      next(error);
    }
  });

module.exports = router;