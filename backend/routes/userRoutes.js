const express = require("express");
const userController = require("../controllers/userController");
const isLogin = require("../middlewares/isLogin");

const router = express.Router();

// User registration route
router.post("/register", userController.register);

// User login route
router.post("/login", userController.login);

// Get user data route
router.get("/user", isLogin, userController.getUserData);

// Toggle admin status route
router.patch("/:userId/admin", isLogin, userController.toggleAdminStatus);

// Delete user route
router.delete("/:userId", isLogin, userController.deleteUser);

module.exports = router;
