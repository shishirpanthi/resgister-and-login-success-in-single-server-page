const Image = require("../models/Image");

exports.uploadImage = async (req, res) => {
  const imageUrl = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;

  const newImage = new Image({
    filename: req.file.filename,
    url: imageUrl,
  });

  try {
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    await Image.findByIdAndDelete(id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
