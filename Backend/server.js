// ------------------------ IMPORTS ------------------------
import express from "express";
import cors from "cors";
import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import Joi from "joi";
import bcrypt from "bcryptjs";
import twilio from "twilio";

dotenv.config();

// ------------------------ TWILIO SETUP ------------------------
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

// ------------------------ SETUP ------------------------
const MONGO_URI = process.env.MONGO_URI;
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ------------------------ DATABASE CONNECTION ------------------------
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.log(error, "❌ Error connecting to DB");
  }
};

// ------------------------ SCHEMAS ------------------------
const userJoiSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(40).required(),
  email: Joi.string().email().required(),
  confirmemail: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{5,40}$")).required(),
  confirmpassword: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{5,40}$"))
    .required(),
  gender: Joi.string().required(),
});

const MainSchema = new mongoose.Schema({
  Name: String,
  Profile: String,
  Work: String,
  PhoneNumber: String,
  Email: String,
  WorkExp: String,
  Location: String,
  ExpectedSalary: String,
});

const userModelSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  gender: String,
});

// ------------------------ MODELS ------------------------
const User = mongoose.model("AuthDB", userModelSchema);
const ModelDb = mongoose.model("db", MainSchema);

// ------------------------ ROUTES ------------------------

app.get("/", (req, res) => {
  res.send("Backend running successfully!");
});

// ------------------------ MAIN DATA ------------------------
app.get("/main", async (req, res) => {
  try {
    const data = await ModelDb.find({});
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/main", async (req, res) => {
  console.log("📩 Received main data:", req.body);
  try {
    const newEntry = await ModelDb.create(req.body);

    // ✅ Send SMS notification using Twilio
    const phone = req.body.PhoneNumber;
    const smsMessage = `Hello ${req.body.Name}, your job application for "${req.body.Work}" has been received successfully!`;

    if (phone) {
      try {
        const smsResponse = await client.messages.create({
          body: smsMessage,
          from: process.env.TWILIO_PHONE_NUMBER, // Twilio number
          to: phone.startsWith("+") ? phone : `+91${phone}`, // Add country code if needed
        });
        console.log("📱 SMS sent:", smsResponse.sid);
      } catch (smsError) {
        console.error("❌ Error sending SMS:", smsError.message);
      }
    }

    res.send({ message: "Application submitted and SMS sent", data: newEntry });
  } catch (error) {
    console.error("❌ Error saving main data:", error);
    res.status(500).send("Error saving data");
  }
});

// ------------------------ AUTH ------------------------
app.post("/signup", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.send({ message: "User already exists" });

  const { error, value } = userJoiSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  if (req.body.email !== req.body.confirmemail)
    return res.status(400).json({ message: "Emails do not match" });

  if (req.body.password !== req.body.confirmpassword)
    return res.status(400).json({ message: "Passwords do not match" });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value.password, salt);

    const newUser = await User.create({
      name: value.name,
      email: value.email,
      password: hashedPassword,
      gender: value.gender,
    });

    res.send({ message: "Signup successful", user: newUser });
  } catch (error) {
    console.log("Signup error:", error);
    res.status(500).send("Error signing up");
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.send({ message: "Invalid credentials or user not found" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      res.json({ message: "Login successful" });
    } else {
      res.send({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in login");
  }
});

// ------------------------ SERVER ------------------------
const PORT = 3553;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
