const Image = require("../models/Image");
const User = require("../models/User");

// Fetch all images and users for admin access
const getAdminData = async (req, res) => {
  try {
    const images = await Image.find();
    const users = await User.find({}, { password: 0 }); // Exclude passwords for security
    res.status(200).json({ message: "Admin access granted", images, users });
  } catch (error) {
    console.error("Error fetching admin data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Export the controller functions
module.exports = {
  getAdminData,
};
