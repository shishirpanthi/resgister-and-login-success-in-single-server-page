const mongoose = require("mongoose");
require("dotenv").config({ path: "./src/.env" });

const connectDB = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI); // Debug log
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
