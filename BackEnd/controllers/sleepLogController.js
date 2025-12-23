const SleepLog = require('../models/SleepLog');

// Create a new sleep log (requires authenticated user)
const createSleepLog = async (req, res) => {
  console.log('POST /api/sleep-logs hit');
  console.log('req.body:', req.body);
  console.log('req.user:', req.user);

  if (!req.user || !req.user._id) {
    console.error('Unauthorized: No user ID found in req.user');
    return res.status(401).json({ message: 'Unauthorized: No user ID' });
  }

  const { date, duration, quality, notes } = req.body;

  if (!date || !duration || !quality) {
    console.error('Missing required fields:', { date, duration, quality });
    return res.status(400).json({ message: 'Missing required fields: date, duration, quality' });
  }

  try {
    const newLog = new SleepLog({
      userId: req.user._id,
      date: new Date(date),
      duration: Number(duration),
      quality,
      notes
    });

    console.log('Attempting to save new log:', newLog);
    const savedLog = await newLog.save();
    console.log('Saved log successfully:', savedLog);

    res.status(201).json({
      message: 'Sleep log created successfully',
      sleepLog: savedLog
    });
  } catch (error) {
    console.error('Save error:', error);
    console.error('Error details:', error.message);
    res.status(500).json({
      message: 'Server error creating sleep log',
      error: error.message
    });
  }
};

// Get all sleep logs for the authenticated user
const getSleepLogs = async (req, res) => {
  console.log('GET /api/sleep-logs hit');
  console.log('req.user:', req.user);

  if (!req.user || !req.user._id) {
    console.error('Unauthorized: No user ID found in req.user');
    return res.status(401).json({ message: 'Unauthorized: No user ID' });
  }

  try {
    const sleepLogs = await SleepLog.find({ userId: req.user._id }).sort({ date: -1 });

    console.log(`Found ${sleepLogs.length} sleep logs for user ${req.user._id}`);

    res.json({
      message: 'Sleep logs retrieved successfully',
      sleepLogs
    });
  } catch (error) {
    console.error('Get sleep logs error:', error);
    console.error('Error details:', error.message);
    res.status(500).json({
      message: 'Server error retrieving sleep logs',
      error: error.message
    });
  }
};

// Delete a sleep log
const deleteSleepLog = async (req, res) => {
  try {
    const { id } = req.params;

    const sleepLog = await SleepLog.findOne({
      _id: id,
      userId: req.user._id
    });

    if (!sleepLog) {
      return res.status(404).json({
        message: 'Sleep log not found or you do not have permission to delete it'
      });
    }

    await SleepLog.findByIdAndDelete(id);

    res.json({
      message: 'Sleep log deleted successfully'
    });
  } catch (error) {
    console.error('Delete sleep log error:', error);
    res.status(500).json({
      message: 'Server error deleting sleep log',
      error: error.message
    });
  }
};

// Get sleep insights for the authenticated user
const getSleepInsights = async (req, res) => {
  console.log('GET /api/sleep-logs/insights hit');
  console.log('req.user:', req.user);

  if (!req.user || !req.user._id) {
    console.error('Unauthorized: No user ID found in req.user');
    return res.status(401).json({ message: 'Unauthorized: No user ID' });
  }

  try {
    const sleepLogs = await SleepLog.find({ userId: req.user._id });
    console.log(`Found ${sleepLogs.length} sleep logs for insights calculation`);

    if (sleepLogs.length === 0) {
      return res.json({
        message: 'No sleep data available',
        insights: {
          averageDuration: 0,
          totalLogs: 0,
          tip: 'Start logging your sleep to get personalized insights!'
        }
      });
    }

    // Calculate average duration
    const totalDuration = sleepLogs.reduce((sum, log) => sum + log.duration, 0);
    const averageDuration = Math.round((totalDuration / sleepLogs.length) * 10) / 10;
    const totalLogs = sleepLogs.length;

    // Generate tip based on average duration
    let tip;
    if (averageDuration < 7) {
      tip = "Try aiming for 7-9 hours of sleep nightly.";
    } else if (averageDuration > 9) {
      tip = "You might be getting too much sleep. Consider maintaining 7-9 hours for optimal health.";
    } else {
      tip = "You're doing great! Keep maintaining consistent sleep.";
    }

    console.log(`Calculated insights: avg=${averageDuration}, total=${totalLogs}`);

    res.json({
      message: 'Sleep insights retrieved successfully',
      insights: {
        averageDuration,
        totalLogs,
        tip
      }
    });
  } catch (error) {
    console.error('Get sleep insights error:', error);
    console.error('Error details:', error.message);
    res.status(500).json({
      message: 'Server error retrieving sleep insights',
      error: error.message
    });
  }
};

module.exports = {
  createSleepLog,
  getSleepLogs,
  deleteSleepLog,
  getSleepInsights
};
