const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model("Name", nameSchema);
