const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Message = require('../models/Message');

// Verify friend
router.post('/verify-friend', async (req, res) => {
const { userEmail, friendEmail } = req.body;

try {
const user = await User.findOne({ email: userEmail });
const isFriend = user.friends.some(f => f.email === friendEmail);
if (!isFriend) return res.status(400).json({ error: "Not your friend." });
return res.status(200).json({ success: true });
} catch (err) {
return res.status(500).json({ error: err.message });
}
});
// Get messages
router.get('/messages', async (req, res) => {
const { userEmail, friendEmail } = req.query;

const messages = await Message.find({
$or: [
{ sender: userEmail, recipient: friendEmail },
{ sender: friendEmail, recipient: userEmail }
]
}).sort({ timestamp: 1 });

res.json(messages);
});
// Send message
router.post('/send', async (req, res) => {
const { sender, recipient, text } = req.body;

const msg = new Message({ sender, recipient, text });
await msg.save();
res.status(200).json({ message: "Sent" });
});

module.exports = router;