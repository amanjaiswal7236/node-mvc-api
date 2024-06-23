const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const userRoutes = require('./routes/user.routes');
const authenticate = require('./middlewares/auth');
const authRoutes = require('./routes/auth.routes');


const app = express();

app.use(express.json());

// Database connection
mongoose.connect(config.dbUri)
.then(() => console.log('Database connected'))
.catch(err => console.error('Database connection error:', err));

// Routes
app.use('/auth', authRoutes);

app.use('/worko/user', authenticate, userRoutes);

// Start server
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
