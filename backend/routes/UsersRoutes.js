const express = require("express");
const User = require("../models/UserModel");
const router = express.Router();

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => password.length >= 5;

// List all users
router.get("/list", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error listing users", error: error.message });
  }
});

// Add a new user
router.post("/add", async (req, res) => {
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
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error: error.message });
  }
});

// Delete a user
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
});

// Update a user
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
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
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = name;
    user.email = email;
    user.password = password;
    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
});

module.exports = router;

// Testing with curl:

// List all users
// curl -X GET http://localhost:3000/users/list

// Add a new user
// curl -X POST http://localhost:3000/users/add -H "Content-Type: application/json" -d '{"name": "Dennis Paz", "email": "dppazlopez@gmail.com", "password": "12345"}'

// Delete a user
// curl -X DELETE http://localhost:3000/users/delete/67536fcc389a3cea033b0f2f

// Update a user
// curl -X PUT http://localhost:3000/users/update/67536fcc389a3cea033b0f2f -H "Content-Type: application/json" -d '{"name": "Dennis", "email": "dppazlopez@gmail.com", "password": "12345"}'
