const express = require('express');
const router = express.Router();
const { createSleepLog, getSleepLogs, deleteSleepLog, getSleepInsights } = require('../controllers/sleepLogController');
const auth = require('../middleware/auth');

// Create sleep log (protected)
router.post('/', auth, createSleepLog);

// Get all sleep logs (protected)
router.get('/', auth, getSleepLogs);

// Delete sleep log (protected)
router.delete('/:id', auth, deleteSleepLog);

// Get sleep insights (protected)
router.get('/insights', auth, getSleepInsights);

module.exports = router;
