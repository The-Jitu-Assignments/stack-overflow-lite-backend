const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const { SECRET_KEY } = process.env;

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['token'];
    if (!token) {
      return res.status(401).json({
        msg: 'You are not authorized'
      })
    }
    const decodedData = jwt.verify(token, SECRET_KEY);
    req.user = decodedData;
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
  next();
}