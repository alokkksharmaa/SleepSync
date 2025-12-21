// BackEnd/src/controllers/sleepController.js
const Sleep = require('../models/Sleep');

const getAllSleep = async (req, res) => {
  try {
    const sleeps = await Sleep.find({});
    res.json(sleeps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addSleep = async (req, res) => {
  const { date, duration, quality } = req.body;
  try {
    const newSleep = new Sleep({ date, duration, quality });
    await newSleep.save();
    res.status(201).json(newSleep);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSleepById = async (req, res) => {
  try {
    const sleep = await Sleep.findById(req.params.id);
    if (!sleep) return res.status(404).json({ message: 'Sleep record not found' });
    res.json(sleep);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSleep = async (req, res) => {
  const { date, duration, quality } = req.body;
  try {
    const sleep = await Sleep.findByIdAndUpdate(
      req.params.id,
      { date, duration, quality },
      { new: true, runValidators: true }
    );
    if (!sleep) return res.status(404).json({ message: 'Sleep record not found' });
    res.json(sleep);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSleep = async (req, res) => {
  try {
    const sleep = await Sleep.findByIdAndDelete(req.params.id);
    if (!sleep) return res.status(404).json({ message: 'Sleep record not found' });
    res.json({ message: 'Sleep record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllSleep, addSleep, getSleepById, updateSleep, deleteSleep };