const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // contains POST /customer

const app = express();

app.use(cors());
app.use(express.json());


// This exposes the POST /customer route directly
app.use('/api/users', userRoutes);

app.get('/api/users', (req, res) => res.send('API running'));
app.use((req, res,next) => res.status(404).json({ error: 'Route not found' }));

app.listen(5000, () => console.log('Server running at http://localhost:5000'));
