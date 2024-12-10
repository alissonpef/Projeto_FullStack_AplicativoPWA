const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => password.length >= 5;

// Sign up
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ message: "Password must be at least 5 characters long" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    res.status(500).json({ message: "User signup failed", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (user.sessionToken) {
      try {
        jwt.verify(user.sessionToken, process.env.JWT_SECRET);
        return res.status(400).json({ message: "User already logged in" });
      } catch (error) {
        user.sessionToken = null;
        await user.save();
      }
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    user.sessionToken = newToken;
    await user.save();
    res.status(200).json({
      message: "User logged in successfully",
      token: newToken,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "User login failed", error: error.message });
  }
});

// Logout
router.post("/logout", authenticate, async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token required" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.sessionToken !== token) {
      return res.status(403).json({ message: "Invalid token" });
    }
    user.sessionToken = null;
    await user.save();
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "User logout failed", error: error.message });
  }
});

module.exports = router;

// Testing with curl:

// Sign up
// curl -X POST http://localhost:3000/signup -H "Content-Type: application/json" -d '{"name": "Dennis Paz", "email": "dppazlopez@gmail.com", "password": "12345"}'

// Login
// curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"email": "dppazlopez@gmail.com", "password": "12345"}'

// Logout
// curl -X POST http://localhost:3000/logout -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTM0YTM3ZGI5NTk1Mjg5MTdkOGExYiIsImlhdCI6MTczMzUxMzk1MiwiZXhwIjoxNzMzNTE3NTUyfQ.jY1guBQ2P7fzwbfkPg0azM5CZfBUP_BswXOXOtZW14g"
