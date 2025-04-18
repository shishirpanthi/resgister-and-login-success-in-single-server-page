const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/adminRouters");
const authRoutes = require("./routes/authRoutes");
const imageRoutes = require("./routes/imageRoutes");
const userRoutes = require("./routes/userRoutes");
const dbConfig = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// MongoDB Connection
dbConfig();

// Routes
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/images", imageRoutes);
app.use("/users", userRoutes);

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
