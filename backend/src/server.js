require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Database */
connectDB();

/* Test route */
app.get("/", (req, res) => {
  res.send("SleepSync API is running");
});

/* Routes */
app.use("/api/sleep", require("./routes/sleepRoutes"));

/* Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
