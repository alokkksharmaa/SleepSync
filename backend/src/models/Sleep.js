const mongoose = require("mongoose");

const SleepSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    quality: {
      type: String,
      enum: ["Poor", "Average", "Good"],
      default: "Average"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sleep", SleepSchema);


// BackEnd/src/models/Sleep.js
const mongoose = require('mongoose');

const sleepSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  quality: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Sleep', sleepSchema);