const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const API_KEY = process.env.API_KEY;

const app = express();
const ConnnectDB = async () => {
  try {
    await mongoose.connect(API_KEY);
    console.log('connected to DB');
  } catch (error) {
    console.log(error, 'error in connecting');
  }
};

app.use(cors());

app.listen(3553, async () => {
  console.log('Port listening to 3553 port');
  ConnnectDB()
});
