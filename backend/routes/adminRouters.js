const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const isLogin = require("../middlewares/isLogin");
const multer = require("multer");

// Admin routes
router.get("/", isLogin, adminController.getAdminData);
router.get("/user", isLogin, adminController.getUserData);

module.exports = router;
