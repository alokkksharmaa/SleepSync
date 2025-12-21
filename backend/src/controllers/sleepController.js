const Sleep = require("../models/Sleep");

/* CREATE sleep record */
exports.addSleep = async (req, res) => {
  try {
    const { date, duration, quality } = req.body;

    if (!date || !duration) {
      return res.status(400).json({
        message: "Date and duration are required"
      });
    }

    const sleep = await Sleep.create({
      date,
      duration,
      quality
    });

    res.status(201).json(sleep);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* READ all sleep records */
exports.getAllSleep = async (req, res) => {
  try {
    const sleeps = await Sleep.find().sort({ date: -1 });
    res.json(sleeps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
