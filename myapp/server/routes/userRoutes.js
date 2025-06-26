const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Mongoose model
const userController = require('../controllers/controller');

// Route to create a user
router.post('/customer', async (req, res) => {
  const { name, email, friends } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Missing name or email" });
  }

  try {
    const existingUser = await User.findOne({ email }); // 🔧 Fixed here

    if (existingUser) {
      return res.status(200).json({ message: "User already exists", user: existingUser });
    }

    const newUser = new User({
      name,
      email,
      friends: friends || []
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("MongoDB error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Route to add a friend by email
router.post('/add-friend-by-email', async (req, res) => {
  console.log('Route hit!');
  const { userEmail, name, email } = req.body;

  if (!userEmail || !email || !name) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const user = await User.findOne({ email: userEmail });
    console.log(userEmail);
    console.log(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const friendUser=await User.findOne({email:email});
    if(!friendUser){
      return res.status(404).json({error: 'This email is not registered'});
    }
    const alreadyFriend = user.friends.find(f => f.email === email);
    if (alreadyFriend) {
      return res.status(400).json({ error: 'Already friends' });
    }

    user.friends.push({ name, email });
    await user.save();

    res.status(200).json({ message: 'Friend added', friend: { name, email } });
  } catch (err) {
    console.error('Error adding friend:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Route to get all friends of the logged-in user
router.get('/get-friends/:email', async (req, res) => {
const userEmail = req.params.email;

try {
const user = await User.findOne({ email: userEmail });

if (!user) {
  return res.status(404).json({ error: 'User not found' });
}

res.status(200).json({ friends: user.friends });
} catch (err) {
console.error('Error fetching friends:', err);
res.status(500).json({ error: 'Server error' });
}
});

// New routes:
router.get('/friends/:email', userController.getFriendsByEmail);
router.post('/remove-friend', userController.removeFriendByEmail);


module.exports = router;
