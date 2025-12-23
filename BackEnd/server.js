require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const sleepLogRoutes = require('./routes/sleepLogRoutes');
const wellnessRoutes = require('./routes/wellnessRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);

// CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://sleepsync.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sleep-logs', sleepLogRoutes);
app.use('/api/wellness', wellnessRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    message: 'Internal server error'
  });
});

// DB + Server start
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/sleepsync';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection failed', err);
    process.exit(1);
  });
