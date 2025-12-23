const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Auth middleware - Token present:', !!token);

    if (!token) {
      console.log('Auth middleware - No token provided');
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    console.log('Auth middleware - Decoded token:', decoded);

    // Token payload uses `id` (see authController)
    const user = await User.findById(decoded.id);
    console.log('Auth middleware - User found:', !!user, user?._id);

    if (!user) {
      console.log('Auth middleware - Token valid but user not found');
      return res.status(401).json({ message: 'Token is valid but user not found.' });
    }

    req.user = user;
    console.log('Auth middleware - Authenticated user:', req.user._id, req.user.username);
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.name, error.message);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token.' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired.' });
    }

    res.status(500).json({ message: 'Server error in authentication.' });
  }
};

module.exports = auth;
