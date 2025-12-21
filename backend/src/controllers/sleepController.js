const Sleep = require("../models/Sleep");

// Create
exports.createSleep = async (req, res) => {
  try {
    const sleep = await Sleep.create(req.body);
    res.status(201).json(sleep);
  } catch (err) { res.status(500).json(err); }
};

exports.getSleeps = async (req, res) => {
  try {
    const sleeps = await Sleep.find();
    res.json(sleeps);
  } catch (err) { res.status(500).json(err); }
};
