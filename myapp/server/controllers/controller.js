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
  console.log('Reached addFriendByEmail');  // Add this
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

exports.getFriendsByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ friends: user.friends });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.removeFriendByEmail = async (req, res) => {
  const { userEmail, friendEmail } = req.body;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.friends = user.friends.filter(f => f.email !== friendEmail);
    await user.save();

    res.json({ message: 'Friend removed successfully', friends: user.friends });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove friend' });
  }
};

// Inside controller.js
exports.suggestFriends = async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const myFriendsEmails = user.friends.map(f => f.email);
  const myFriendsSet = new Set(myFriendsEmails);

  let suggestionsMap = new Map();

  // Loop through user's friends
  for (const friend of user.friends) {
    const friendDoc = await User.findOne({ email: friend.email });
    if (!friendDoc) continue;

    for (const ff of friendDoc.friends) {
      if (ff.email === email) continue; // skip self
      if (myFriendsSet.has(ff.email)) continue; // skip existing friend

      if (!suggestionsMap.has(ff.email)) {
        suggestionsMap.set(ff.email, {
          email: ff.email,
          name: ff.name,
          mutualFriends: [friend.name] // start list with this friend
        });
      } else {
        suggestionsMap.get(ff.email).mutualFriends.push(friend.name);
      }
    }
  }

  const suggestions = Array.from(suggestionsMap.values());
  res.json({ suggestions });
};
