const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Joi = require("joi"); // For validation

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" })); // Increase payload size limit
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true })); // For URL-encoded data

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/newapp";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Team Schema and Model
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  post: { type: String, required: true },
  image: { type: String, required: true },
});

const Team = mongoose.model("Team", teamSchema);

// Validation Schema
const teamValidationSchema = Joi.object({
  name: Joi.string().required(),
  post: Joi.string().required(),
  image: Joi.string().required(),
});

// Routes

// Get all team members
app.get("/ourteams", async (req, res, next) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    next(error); // Pass error to centralized error handler
  }
});

// Add a new team member
app.post("/ourteams", async (req, res, next) => {
  const { error } = teamValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, post, image } = req.body;

  try {
    const newTeamMember = new Team({ name, post, image });
    await newTeamMember.save();
    res.status(201).json({ message: "Team member added successfully" });
  } catch (error) {
    next(error);
  }
});

// Update a team member
app.put("/ourteams/:id", async (req, res, next) => {
  const { id } = req.params;
  const { error } = teamValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const result = await Team.findByIdAndUpdate(id, req.body, { new: true });
    if (result) {
      res
        .status(200)
        .json({ message: "Team member updated successfully", data: result });
    } else {
      res.status(404).json({ message: "Team member not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Delete a team member
app.delete("/ourteams/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Team.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Team member deleted successfully" });
    } else {
      res.status(404).json({ message: "Team member not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: "Internal server error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
