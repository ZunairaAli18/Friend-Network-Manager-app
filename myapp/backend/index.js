const express = require('express');
const mongoose = require('mongoose');
const chatRoutes = require('./routes/chatRoutes');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/friendApp', {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Middlewares
app.use(cors()); // allow frontend to access backend
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);

// Start server
app.listen(PORT, () => {
console.log(`🚀 Server running on http://localhost:${PORT}`);

});