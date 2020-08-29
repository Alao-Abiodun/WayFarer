require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token)
    return res.json({
      status: 'error',
      error: 'No token authorization denied',
    });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
