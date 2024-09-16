const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Survey Answer Schema
const surveySchema = new mongoose.Schema({
  sessionId: String,
  answers: [
    {
      questionId: Number,
      answer: mongoose.Schema.Types.Mixed,
    },
  ],
  status: {
    type: String,
    default: "IN_PROGRESS",
  },
});

const Survey = mongoose.model("Survey", surveySchema);

// POST route to submit survey answers
app.post("/submit-survey", async (req, res) => {
  console.log("body:", req.body);
  const { sessionId, answers, status } = req.body;

  const newSurvey = new Survey({
    sessionId,
    answers,
    status,
  });

  try {
    await newSurvey.save();
    res.status(200).json({ message: "Survey submitted successfully!" });
  } catch (err) {
    console.error("Error submitting survey", err);
    res.status(500).json({ message: "Error submitting survey" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
