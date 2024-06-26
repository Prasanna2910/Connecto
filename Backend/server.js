const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
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

const MainSchema = new mongoose.Schema({
  Name: String,
  Profile: String,
  Work: String,
  PhoneNumber: Number,
  Email: String,
  WorkExp: String,
  Location: String,
  ExpectedSalary: String,
});
const userModelSchema = new mongoose.Schema({
  name: String,
  // profile: String,
  email: String,
  password: String,
  gender: String,
});

const User = mongoose.model('AuthDB', userModelSchema);
const ModelDb = mongoose.model('db', MainSchema);

app.get('/main', (req, res) => {
  ModelDb.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post('/signup', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.send({ message: 'get out' });
  } else {
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
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(value.password, salt);
      const newUser = await User.create({ ...value, password: hashedPassword });
      res.send({ message: 'ok' });
    } catch (error) {
      console.log('error', error);
    }
  }
});

app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    if (user && bcrypt.compare(req.body.password, user.password)) {
      res.json({ message: 'Login successful' });
    } else {
      res.send({ message: 'Invalid credentials or user not existed' });
    }
  } catch (error) {
    console.log(error);
    res.send('Error in login');
  }
});
app.post('/main', async (req, res) => {
  console.log(
    req.body,
    '--------------------------------------------------------------'
  );
  await ModelDb.create(req.body);

  return res.send(req.body);
});

app.delete('/store/:id', async (req, res) => {
  try {
    const deleted = await ModelDb.findByIdAndDelete(req.params.id);
    console.log(deleted);
    res.send('deleted');
  } catch {
    (error) => {
      console.log(error);
    };
  }
});

const PORT = 3553;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Port listening to ${PORT} port`);
});
