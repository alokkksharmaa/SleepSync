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
