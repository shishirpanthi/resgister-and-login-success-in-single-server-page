const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/tesstinnnnggggggg";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define a Mongoose Schema and Model
const nameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
});

const Name = mongoose.model("Name", nameSchema);

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend is working!" });
});

app.post("/create", async (req, res) => {
  const { name, age, phone } = req.body;

  if (!name || !age || !phone) {
    return res
      .status(400)
      .json({ message: "Name, age, and phone are required" });
  }

  try {
    const newEntry = new Name({ name, age, phone });
    await newEntry.save();
    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, phone } = req.body;

  if (!name || !age || !phone) {
    return res
      .status(400)
      .json({ message: "Name, age, and phone are required" });
  }

  try {
    const updatedData = await Name.findByIdAndUpdate(
      id,
      { name, age, phone },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: "Record not found" });
    }

    res
      .status(200)
      .json({ message: "Data updated successfully", data: updatedData });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.get("/showdata", async (req, res) => {
  try {
    const data = await Name.find(); // Fetch all entries from the database
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
