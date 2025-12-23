const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser } = require('../controllers/authController');
const auth = require('../middleware/auth');


router.post('/register', register);

// Login route
router.post('/login', login);

// Get current user (protected)
router.get('/me', auth, getCurrentUser);

module.exports = router;
