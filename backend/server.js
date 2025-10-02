const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const gradientRouter = require('./routes/gradient');
const experimentsRouter = require('./routes/experiments');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Optional MongoDB connect (if MONGO_URI in .env)
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err));
} else {
  console.log('No MONGO_URI provided. Run without DB or set MONGO_URI in .env');
}

app.use('/api/gradient-descent', gradientRouter);
app.use('/api/experiments', experimentsRouter);

module.exports = app;
