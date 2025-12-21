const express = require('express');
const SleepLog = require('../models/SleepLog');

const router = express.Router();

// Create log (POST)
router.post('/', async (req, res) => {
  try {
    const log = new SleepLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all logs for user (GET)
router.get('/:userId', async (req, res) => {
  const logs = await SleepLog.find({ userId: req.params.userId });
  res.json(logs);
});

// Update log (PUT)
router.put('/:id', async (req, res) => {
  const log = await SleepLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(log);
});

// Delete log (DELETE)
router.delete('/:id', async (req, res) => {
  await SleepLog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;


// Get insights (custom logic, using arrays/objects from Unit I)
router.get('/insights/:userId', async (req, res) => {
  const logs = await SleepLog.find({ userId: req.params.userId });
  if (logs.length === 0) return res.json({ average: 0, suggestion: 'Log some sleep data!' });

  const totalHours = logs.reduce((sum, log) => sum + log.hours, 0); // Array methods (React Unit I, but applicable)
  const average = totalHours / logs.length;

  let suggestion = 'Good job!';
  if (average < 7) {
    suggestion = 'Try relaxation techniques like deep breathing or meditation.';
  }

  res.json({ average, suggestion });
});