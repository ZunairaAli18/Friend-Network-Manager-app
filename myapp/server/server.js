const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); 
const chatRoutes = require('./routes/ChatRoutes'); // <-- this line


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes); // <-- this connects your ChatRoutes



app.use((req, res,next) => res.status(404).json({ error: 'Route not found' }));

app.listen(5000, () => console.log('Server running at http://localhost:5000'));
