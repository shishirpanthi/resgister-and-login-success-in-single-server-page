// controllers/imageUploadController.js
const ImageUpload = require("../models/ImageUpload");

// POST /api/imageupload
const uploadImage = async (req, res) => {
  try {
    const imgBuffer = req.file.buffer.toString("base64");

    const newImage = new ImageUpload({
      image: `data:${req.file.mimetype};base64,${imgBuffer}`,
      name: req.file.originalname,
    });

    await newImage.save();
    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

// GET /api/images
const getImages = async (req, res) => {
  try {
    const images = await ImageUpload.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

// DELETE /api/images/:id
const deleteImage = async (req, res) => {
  try {
    await ImageUpload.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete image" });
  }
};

module.exports = {
  uploadImage,
  getImages,
  deleteImage,
};
