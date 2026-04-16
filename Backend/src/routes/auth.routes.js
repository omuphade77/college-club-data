const express = require("express");
const router = express.Router();
const { registerStudent, loginStudent, forgotPassword, resetPassword } = require("../controllers/auth.controller");

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;