// routes/sliderImageRoutes.js
const express = require("express");
const multer = require("multer");
const sliderImageController = require("../controllers/sliderimgController");
const upload = multer({ storage: multer.memoryStorage() }); // Memory storage for image upload

const router = express.Router();

// Route for getting all images
router.get("/", sliderImageController.getImages);

// Route for uploading an image
router.post("/", upload.single("image"), sliderImageController.uploadImage);

// Route for deleting an image
router.delete("/:id", sliderImageController.deleteImage);

module.exports = router;
