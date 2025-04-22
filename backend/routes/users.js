const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');


// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username'); // return only usernames and IDs
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
