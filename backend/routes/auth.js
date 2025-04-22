const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

// Secret key for JWT
const JWT_SECRET = "your_secret_key_here";  // Replace with a more secure, environment variable in production

// Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password || password.length < 6) {
    return res.status(400).json({ error: "All fields are required. Password must be at least 6 characters." });
  }

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ error: "Username or email already in use" });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Signed up successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    // Send the token to the client
    res.status(200).json({ message: "Logged in successfully", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get the currently logged-in user's info (Protected route)
router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    // Send the user's details
    res.json({ username: user.username, email: user.email });
  } catch (err) {
    res.status(500).json({ error: "Failed to authenticate token" });
  }
});

// Logout route (optional for JWT, you can remove it for stateless authentication)
router.post('/logout', (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
