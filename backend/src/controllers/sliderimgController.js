// controllers/sliderImageController.js
const SliderImage = require("../models/Sliderimg");

// Get all images
exports.getImages = async (req, res) => {
  try {
    const images = await SliderImage.find();
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: "Error fetching images" });
  }
};

// Upload image
exports.uploadImage = async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const newImage = new SliderImage({
    image: file.buffer.toString("base64"),
  });

  try {
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ message: "Error saving image" });
  }
};

// Delete image
exports.deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await SliderImage.findByIdAndDelete(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting image" });
  }
};
