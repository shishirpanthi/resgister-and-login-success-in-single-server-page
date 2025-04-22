// models/ImageUpload.js
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  image: String,
  name: String,
});

module.exports = mongoose.model("ImageUpload", imageSchema);
