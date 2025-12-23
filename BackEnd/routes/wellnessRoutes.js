const express = require('express');
const router = express.Router();
const { getRelaxationTips } = require('../controllers/wellnessController');

// Get relaxation tips (public)
router.get('/tips', getRelaxationTips);

module.exports = router;
