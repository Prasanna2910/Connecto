const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(bodyParser.json());

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
  PhoneNumber: Number,
});

const Model = mongoose.model('db', schema);

app.get('/main', (req, res) => {
  Model.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      // console.log('error', err);
      res.send(err);
    });
});

app.listen(3553, async () => {
  console.log('Port listening to 3553 port');
  await connectDB();
});
