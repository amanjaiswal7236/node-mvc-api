const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');

const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validate the user credentials here (this is just a placeholder)
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username }, config.jwtSecret, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
