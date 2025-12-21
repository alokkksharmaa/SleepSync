const mongoose = require("mongoose");

const SleepSchema = new mongoose.Schema({
  user: String,
  date: Date,
  duration: Number,
  quality: String
});

module.exports = mongoose.model("Sleep", SleepSchema);
