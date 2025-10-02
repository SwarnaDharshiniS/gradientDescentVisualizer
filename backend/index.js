// const app = require("./server");
// module.exports = (req, res) => app(req, res);
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const gradientRouter = require("./backend/routes/gradient");
const experimentsRouter = require("./backend/routes/experiments");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// MongoDB connect
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB error:", err));
} else {
  console.log("⚠️ No MONGO_URI provided");
}

// routes
app.use("/api/gradient-descent", gradientRouter);
app.use("/api/experiments", experimentsRouter);

// Export Express app as a handler for Vercel
module.exports = (req, res) => {
  return app(req, res);
};
