const User = require('../models/user');

//create user
exports.createUser=async(req,res)=>{
 const { name, email, friends } = req.body;
 
   if (!name || !email) {
     return res.status(400).json({ error: "Missing name or email" });
   }
 
   try {
     const existingUser = await User.findOne({ email }); 
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
};

// Fetch user by email
exports.getUserByEmail = async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user });
};

// Add friend by email
exports.addFriendByEmail = async (req, res) => {
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
 
     user.friends.push({ name: name, email: email });
     friendUser.friends.push({ name: user.name, email: user.email });

     await user.save();
     await friendUser.save();
 
     res.status(200).json({ message: 'Friend added', friend: { name, email } });
   } catch (err) {
     console.error('Error adding friend:', err);
     res.status(500).json({ error: 'Server error' });
   }
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
