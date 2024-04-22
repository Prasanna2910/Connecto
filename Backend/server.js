const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const joi = require('joi');
const bodyParser = require('body-parser');
const Joi = require('joi');
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

const userJoiSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(40).required(),
  email: Joi.string().email().required(),
  confirmemail: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,40}$')).required(),
  confirmpassword: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{5,40}$'))
    .required(),
  gender: Joi.string().required(),
});
const schema = new mongoose.Schema({
  Name: String,
  Work: String,
  PhoneNumber: Number,
});
const NewModelForSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  gender: String,
});

const ModelForJoi = mongoose.model('AuthDB', NewModelForSchema);
const Model = mongoose.model('db', schema);

app.get('/', (req, res) => {
  Model.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      // console.log('error', err);
      res.send(err);
    });
});

app.post('/main', async (req, res) => {
  try {
    const newUser = await Model.create(req.body);
    res.send(newUser);
  } catch (Error) {
    res.send(Error);
  }
});

app.post('/', async (req, res) => {
  const { error, value } = userJoiSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  if (req.body.email !== req.body.confirmemail) {
    return res.status(400).json({ message: 'Emails do not match' });
  }
  if (req.body.password !== req.body.confirmpassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  try {
    const newUser = await ModelForJoi.create(value);
    res.send(newUser);
  } catch (error) {
    console.log('error', error);
  }
});

const PORT = 3553;
app.listen(PORT, async () => {
  console.log(`Port listening to ${PORT} port`);
  await connectDB();
});
