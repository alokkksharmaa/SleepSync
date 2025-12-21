require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

// Init
const app = express();
connectDB();

// JSON parsing
app.use(express.json());
app.use(cors());

// Test HTTP
app.get("/", (req, res) => {
  res.send("API running");
});

// Mount routes here
app.use("/api/sleep", require("./routes/sleepRoutes"));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
