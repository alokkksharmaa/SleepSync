const mongoose = require('mongoose');

const sleepLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [0.1, 'Duration must be at least 0.1 hours'],
    max: [24, 'Duration cannot exceed 24 hours']
  },
  quality: {
    type: String,
    required: [true, 'Quality is required'],
    enum: ['Poor', 'Fair', 'Good', 'Excellent']
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

// Add index for better query performance per user
sleepLogSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('SleepLog', sleepLogSchema);
