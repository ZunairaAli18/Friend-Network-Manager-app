const mongoose = require('mongoose');

const server = 'localhost:27017';
const database = 'socialNetworkApp';

// No username/password needed if auth is not enabled
mongoose.connect(`mongodb://${server}/${database}`)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Connection error:", err));

const userSchema=new mongoose.Schema({
    name: { type: String, required: true},
    email:{type: String, required: true, unique: true},
    friends: [
        {
            name: String,
            email: String,
        }
    ]
});

module.exports=mongoose.model('User',userSchema);