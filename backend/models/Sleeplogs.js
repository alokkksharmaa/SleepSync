const mongoose = require('mongoose');

const sleepLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  hours: { type: Number, required: true },
  quality: { type: String, enum: ['Poor', 'Average', 'Good'], required: true },
});

module.exports = mongoose.model('SleepLog', sleepLogSchema);