const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
      return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).populate('role');
    if (!user) return res.status(401).json({ message: 'Invalid token' });

    req.user = user; // attach user to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
