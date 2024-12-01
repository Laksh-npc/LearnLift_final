const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("./model/user"); // Import the user model
const router = express.Router();

// Sign Up Route
router.post("/signup", async (req, res) => {
  const { firstName, lastName, currentYear, course, phone, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      currentYear,
      course,
      phone,
      email,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();

    res.status(201).json({ message: "Sign up successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
});

module.exports = router;
