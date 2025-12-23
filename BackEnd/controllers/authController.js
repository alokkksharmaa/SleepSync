const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// =========================
// REGISTER CONTROLLER
// =========================
exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    // Validation
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create user (password hashed by pre-save hook)
    const user = new User({
      username,
      email: email.toLowerCase(),
      password,
    });

    await user.save();

    // Do NOT auto-login or return token
    return res.status(201).json({
      success: true,
      message: 'Account created successfully. Please log in.',
    });
  } catch (error) {
    console.error('REGISTER ERROR:', error);

    // Handle duplicate key (unique) errors explicitly
    if (error.code === 11000) {
      if (error.keyPattern?.email) {
        return res.status(400).json({ message: 'Email already registered' });
      }
      if (error.keyPattern?.username) {
        return res.status(400).json({ message: 'Username already taken' });
      }
      return res.status(400).json({ message: 'User already exists' });
    }

    // Mongoose validation errors
    if (error.name === 'ValidationError') {
      const firstError = Object.values(error.errors)[0]?.message || 'Validation error';
      return res.status(400).json({ message: firstError });
    }

    return res.status(500).json({ message: 'Server error' });
  }
};

// =========================
// LOGIN CONTROLLER
// =========================
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token (fallback secret for dev)
    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key';
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' });

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// =========================
// GET CURRENT USER (OPTIONAL)
// =========================
exports.getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error('GET CURRENT USER ERROR:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
