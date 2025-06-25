const mongoose = require('mongoose');

// Replace with your actual database name (you can define it here or in the URI directly)
const database = 'SocialNetwork';

const uri = `mongodb+srv://zunairaali2053:KqNhwOrc7PQsONNU@cluster0.1m5mhp6.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(" Connected to MongoDB Atlas"))
  .catch(err => console.error(" Connection error:", err));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  friends: [
    {
      name: String,
      email: String,
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
