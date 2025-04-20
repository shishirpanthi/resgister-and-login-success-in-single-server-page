const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  post: { type: String, required: true },
  image: { type: String, required: true }, // base64 image
});

module.exports = mongoose.model("TeamMember", teamSchema);
