





// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser"); // Import cookie-parser

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(cookieParser()); // Use cookie-parser middleware

// // MongoDB Connection
// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/authApp";
// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

// // User Schema and Model
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model("User", userSchema);

// // Routes
// // Register Route
// app.post("/register", async (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     // Check if the email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: "Email is already registered" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error registering user:", error);

//     // Handle MongoDB validation errors
//     if (error.name === "ValidationError") {
//       return res.status(400).json({ message: "Invalid user data" });
//     }

//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Login Route
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   try {
//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Compare the password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // Set the token as a cookie
//     res
//       .cookie("token", token, {
//         httpOnly: true, // Prevent client-side access to the cookie
//         secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//         maxAge: 3600000, // 1 hour
//       })
//       .status(200)
//       .json({ message: "Login successful" });
//   } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Define a Mongoose Schema and Model for another collection
// // (e.g., for storing names, ages, and phone numbers)
// const nameSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   age: { type: Number, required: true },
//   phone: { type: String, required: true },
// });

// const Name = mongoose.model("Name", nameSchema);
// app.post("/create", async (req, res) => {
//   const { name, age, phone } = req.body;

//   if (!name || !age || !phone) {
//     return res
//       .status(400)
//       .json({ message: "Name, age, and phone are required" });
//   }

//   try {
//     const newEntry = new Name({ name, age, phone });
//     await newEntry.save();
//     res.status(200).json({ message: "Data saved successfully" });
//   } catch (error) {
//     console.error("Error saving data:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.put("/update/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name, age, phone } = req.body;

//   if (!name || !age || !phone) {
//     return res
//       .status(400)
//       .json({ message: "Name, age, and phone are required" });
//   }

//   try {
//     const updatedData = await Name.findByIdAndUpdate(
//       id,
//       { name, age, phone },
//       { new: true }
//     );

//     if (!updatedData) {
//       return res.status(404).json({ message: "Record not found" });
//     }

//     res
//       .status(200)
//       .json({ message: "Data updated successfully", data: updatedData });
//   } catch (error) {
//     console.error("Error updating data:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
// app.get("/showdata", async (req, res) => {
//   try {
//     const data = await Name.find(); // Fetch all entries from the database
//     res.status(200).json(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });