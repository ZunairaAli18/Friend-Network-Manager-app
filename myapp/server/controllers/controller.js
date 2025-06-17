const User = require('../models/user');

// Fetch user by email
exports.getUserByEmail = async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user });
};

// Add friend by email
exports.addFriendByEmail = async (req, res) => {
  const { userId } = req.params;
  const { email } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User adding friend not found' });

  const friend = await User.findOne({ email });
  if (!friend) return res.status(404).json({ error: 'Friend not found' });

  if (user.friends.some(f => f.email === email)) {
    return res.status(409).json({ error: 'Friend already added' });
  }

  user.friends.push({ name: friend.name, email: friend.email });
  await user.save();

  res.json({ message: 'Friend added', friend: { name: friend.name, email: friend.email }, totalFriends: user.friends.length });
};
