const express = require("express");
const { createSleep, getSleeps } = require("../controllers/sleepController");
const router = express.Router();

router.post("/", createSleep);
router.get("/", getSleeps);

module.exports = router;
