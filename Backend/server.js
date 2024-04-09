const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('connected to DB');
  } catch (error) {
    console.log(error, 'error in connecting');
  }
};

const schema = new mongoose.Schema({
  Name: String,
  Work: String,
  PhoneNmber: Number,
});

app.get('/main', (req, res) => {
  res.send(schema)
});

app.listen(3553, async () => {
  console.log('Port listening to 3553 port');
  await connectDB();
});
