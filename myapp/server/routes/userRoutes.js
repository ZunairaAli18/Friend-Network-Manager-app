const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Mongoose model

router.post('/customer', async (req, res) => {
  const { name, email, friends } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Missing name or email" });
  }

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists", user: existingUser });
    }

    let newUser = new User({
      name,
      email,
      friends: friends || []
    });

    newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("MongoDB error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
