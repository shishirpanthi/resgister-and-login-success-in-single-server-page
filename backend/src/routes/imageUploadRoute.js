// routes/imageUploadRoute.js
const express = require("express");
const multer = require("multer");
const {
  uploadImage,
  getImages,
  deleteImage,
} = require("../controllers/imageUploadController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/imageupload", upload.single("image"), uploadImage);
router.get("/images", getImages);
router.delete("/images/:id", deleteImage);

module.exports = router;
