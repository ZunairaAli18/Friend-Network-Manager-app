const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Use JSON for parsing request bodies
app.use(express.json());

// Connect to MongoDB (adjust the URI as needed)
mongoose.connect('mongodb://localhost:27017/socialNetworkApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));
