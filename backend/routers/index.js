const express = require("express");
const router = express.Router();
const modelname = require("../models/Name"); // Adjust the path as necessary

// Root route
router.get("/", (req, res) => {
  res.status(200).json({ message: "Backend is working!" });
});

// Create route
router.post("/create", async (req, res) => {
  const { name, age, phone } = req.body;

  // Validate required fields
  if (!name || !age || !phone) {
    return res
      .status(400)
      .json({ message: "Name, age, and phone are required." });
  }

  try {
    const newEntry = new Name({ name, age, phone });
    await newEntry.save();
    res
      .status(201)
      .json({ message: "Data saved successfully", data: newEntry });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update route
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, phone } = req.body;

  // Validate required fields
  if (!name || !age || !phone) {
    return res
      .status(400)
      .json({ message: "Name, age, and phone are required." });
  }

  try {
    const updatedData = await Name.findByIdAndUpdate(
      id,
      { name, age, phone },
      { new: true, runValidators: true } // Ensure validation on update
    );

    if (!updatedData) {
      return res.status(404).json({ message: "Record not found." });
    }

    res
      .status(200)
      .json({ message: "Data updated successfully", data: updatedData });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch all data route
router.get("/data", async (req, res) => {
  try {
    const data = await Name.find(); // Fetch all entries from the database
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
