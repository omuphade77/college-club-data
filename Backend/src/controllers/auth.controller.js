
const { sql } = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");
const crypto = require("crypto");

// 🔹 REGISTER
const registerStudent = async (req, res) => {
  const { full_name, email, password, skills, profile_image } = req.body;

  try {
    const regex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)?vjti\.ac\.in$/;

    if (!regex.test(email)) {
      return res.status(403).json({ error: "Only VJTI email allowed" });
    }

    const existing = await sql`
      SELECT * FROM students WHERE email = ${email}
    `;

    if (existing.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO students (full_name, email, password, skills, profile_image)
      VALUES (${full_name}, ${email}, ${hashedPassword}, ${skills}, ${profile_image})
    `;

    res.json({ message: "Registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


// 🔹 LOGIN
const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await sql`
      SELECT * FROM students WHERE email = ${email}
    `;

    if (user.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const valid = await bcrypt.compare(password, user[0].password);

    if (!valid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user[0].id,
        email: user[0].email
      }
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


// 🔹 GET PROFILE (IMPORTANT)
const getProfile = async (req, res) => {
  try {
    const user = await sql`
      SELECT full_name, email, skills, profile_image
      FROM students
      WHERE id = ${req.user.id}
    `;

    res.json(user[0]);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


// 🔹 FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await sql`
      SELECT * FROM students WHERE email = ${email}
    `;

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    await sql`
      UPDATE students 
      SET reset_token = ${token}, reset_token_expiry = ${expiry}
      WHERE email = ${email}
    `;

    console.log(`Reset Link: http://localhost:5173/reset-password/${token}`);

    res.json({ message: "Reset link generated" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


// 🔹 RESET PASSWORD
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

    const hashedPassword = await bcrypt.hash(newPassword, 10);

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
  getProfile, // ✅ MUST be here
  forgotPassword,
  resetPassword,
};

