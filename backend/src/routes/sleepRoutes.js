const express = require("express");
const router = express.Router();

const {
  addSleep,
  getAllSleep
} = require("../controllers/sleepController");

/* POST – add sleep */
router.post("/", addSleep);

/* GET – fetch sleep */
router.get("/", getAllSleep);

module.exports = router;


// BackEnd/src/routes/sleepRoutes.js
const express = require('express');
const { getAllSleep, addSleep, getSleepById, updateSleep, deleteSleep } = require('../controllers/sleepController');

router.get('/', getAllSleep);
router.post('/', addSleep);
router.get('/:id', getSleepById);
router.put('/:id', updateSleep);
router.delete('/:id', deleteSleep);

module.exports = router;