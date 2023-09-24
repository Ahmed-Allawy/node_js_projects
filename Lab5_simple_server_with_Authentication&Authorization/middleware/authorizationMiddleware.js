const User = require('../model/user');
module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
     throw new Error('authorization required');
    }
    const id = await User.getIdFromToken(authorization);
    req.id = id;
    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
}