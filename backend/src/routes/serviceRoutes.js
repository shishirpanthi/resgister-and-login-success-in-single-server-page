const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  createService,
  getAllServices,
  deleteService,
} = require("../controllers/serviceController");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), createService);
router.get("/", getAllServices);
router.delete("/:id", deleteService);

module.exports = router;
