// models/SliderImage.js
const mongoose = require("mongoose");

const sliderImageSchema = new mongoose.Schema({
  image: {
    type: String, // storing image as base64 string
    required: true,
  },
});

module.exports = mongoose.model("SliderImage", sliderImageSchema);
