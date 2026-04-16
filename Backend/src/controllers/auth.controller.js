const { sql } = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");
const crypto = require("crypto");
// 🔐 REGISTER
const registerStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Allow only VJTI email (any subdomain)
    const regex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)?vjti\.ac\.in$/;

    if (!regex.test(email)) {
      return res.status(403).json({
        error: "Only VJTI email allowed",
      });
    }

    // 🔍 Check if already exists
    const existing = await sql`
            SELECT * FROM students WHERE email = ${email}
        `;

    if (existing.length > 0) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Store in DB
    await sql`
            INSERT INTO students (email, password)
            VALUES (${email}, ${hashedPassword})
        `;

    res.json({ message: "Registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// 🔑 LOGIN
const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await sql`
            SELECT * FROM students WHERE email = ${email}
        `;

    if (user.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    // 🔐 Compare password
    const valid = await bcrypt.compare(password, user[0].password);

    if (!valid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // 🎟️ Generate JWT token
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await sql`
            SELECT * FROM students WHERE email = ${email}
        `;

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // 🔑 Generate token
    const token = crypto.randomBytes(32).toString("hex");

    // ⏳ Expiry (1 hour)
    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    // 💾 Save token
    await sql`
            UPDATE students 
            SET reset_token = ${token}, reset_token_expiry = ${expiry}
            WHERE email = ${email}
        `;

    // 📌 TEMP: log instead of email
    console.log(`Reset Link: http://localhost:5173/reset-password/${token}`);

    res.json({ message: "Reset link generated (check console)" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// 🔐 RESET PASSWORD
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await sql`
            SELECT * FROM students 
            WHERE reset_token = ${token}
            AND reset_token_expiry > NOW()
        `;

    if (user.length === 0) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // 🔐 Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 💾 Update password
    await sql`
            UPDATE students 
            SET password = ${hashedPassword},
                reset_token = NULL,
                reset_token_expiry = NULL
            WHERE reset_token = ${token}
        `;

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  forgotPassword,
  resetPassword,
};
