// controllers/userController.js
const User = require('../models/user');
const fs = require('fs');
const path = require('path');


exports.addFriendByEmail = async (req, res) => {
  const { userId }=req.params;
  const { name,email }=req.body;

    if (!email || !name) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const alreadyFriend = user.friends.some(friend => friend.email === email);
        if (alreadyFriend) {
          return res.status(400).json({ error: 'Friend already added' });
        }
        user.friends.push({ name, email });
        await user.save();
        const logData = {
          timestamp: new Date().toISOString(),
          userId: user._id.toString(),
          friends: user.friends,
        };
        const logFilePath = path.join(__dirname, '../logs/friends_logs.json');
        // Ensure logs directory exists
    fs.mkdirSync(path.join(__dirname, '../logs'), { recursive: true });

    // Append or overwrite the log file
    fs.writeFileSync(logFilePath, JSON.stringify(logData, null, 2));

    res.json({ message: 'Friend added successfully', friend: { name, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }


};
