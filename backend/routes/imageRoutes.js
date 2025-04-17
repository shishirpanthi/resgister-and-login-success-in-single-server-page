const express = require("express");
const router = express.Router();
const imageController = require("../../controllers/imageController");

// Upload image route
router.post("/upload", imageController.uploadImage);

// Get all images route
router.get("/", imageController.getAllImages);

// Delete image route
router.delete("/:id", imageController.deleteImage);

module.exports = router;
