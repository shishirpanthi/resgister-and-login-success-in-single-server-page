const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const ourTeamRoutes = require("./routes/ourTeamRoutes");
const imageRoutes = require("./routes/imageRoutes");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");
// const cors = require("cors");
// app.use(cors());


// Load env variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware

// Error handling middleware
app.use(errorHandler)
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

 // Serve uploaded images statically


// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes"); // Import admin routes
app.use("/api/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/ourteams", ourTeamRoutes);// Use admin routes
app.use("/api/images", imageRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
