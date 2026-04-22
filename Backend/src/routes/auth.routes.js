const express = require("express");
const router = express.Router();

const {
  registerStudent,
  loginStudent,
  forgotPassword,
  resetPassword,
  getProfile
} = require("../controllers/auth.controller");

const { verifyStudentToken } = require("../middlewares/student.middleware");

// 🔐 Auth
router.post("/signup", registerStudent);   // changed from /register
router.post("/login", loginStudent);

// 🔁 Password reset
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// 👤 Profile (IMPORTANT)
router.get("/profile", verifyStudentToken, getProfile);

module.exports = router;