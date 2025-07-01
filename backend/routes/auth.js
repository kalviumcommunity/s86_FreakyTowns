const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

const JWT_SECRET = "yourSecretKey";

// ✅ Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password || password.length < 6) {
    return res.status(400).json({ error: "All fields are required. Password must be at least 6 characters." });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ error: "Username or email already in use" });
    }

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

// ✅ Login route 
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

    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '7d' }); 

    res.cookie("token", token, {
      httpOnly: true, 
      secure: false,  
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Logged in successfully", username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Protected route using cookie instead of headers
router.get('/me', async (req, res) => {
  const token = req.cookies.token; 

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ username: user.username, email: user.email });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

// ✅ Logout route clears the token cookie
router.post('/logout', (req, res) => {
  res.clearCookie("token"); 
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
