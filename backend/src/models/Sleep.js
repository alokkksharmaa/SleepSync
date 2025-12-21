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
