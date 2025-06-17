const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/socialNetworkApp', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('API running'));
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

app.listen(5000, () => console.log('Server running at http://localhost:5000'));
