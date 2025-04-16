const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");// Import cookie-parser

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser()); // Use cookie-parser middleware

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/authApp";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

  const imageSchema = new mongoose.Schema({
    filename: String,
    url: String,
  });

  const Image = mongoose.model("Image", imageSchema);

  // Multer setup
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
  });
  const upload = multer({ storage });
// Admin route
app.get("/admin", async (req, res) => {
  try {
    // Example: Fetch all images (admin functionality)
    const images = await Image.find();
    res.status(200).json({ message: "Admin access granted", images });
  } catch (error) {
    console.error("Error in admin route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3000/admin");
    const data = await response.json();
    console.log(data); // Check the fetched data
    return data.images; // Assuming the data contains an "images" array
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
  // Upload route
  app.post("/upload", upload.single("image"), async (req, res) => {
    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;

    const newImage = new Image({
      filename: req.file.filename,
      url: imageUrl,
    });

    await newImage.save();
    res.json(newImage);
  });
  app.delete("/images/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await Image.findByIdAndDelete(id);
      res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all uploaded images
  app.get("/images", async (req, res) => {
    const images = await Image.find();
    res.json(images);
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
