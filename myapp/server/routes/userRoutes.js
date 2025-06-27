const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Mongoose model
const userController = require('../controllers/controller');

// Route to create a user
router.post('/customer',userController.createUser);

// Route to add a friend by email
router.post('/add-friend-by-email',userController.addFriendByEmail);

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
