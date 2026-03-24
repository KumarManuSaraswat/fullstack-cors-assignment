const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Task 1: Configure CORS using environment variable
const corsOptions = {
    origin: process.env.CLIENT_URL, // Allows requests only from your Vite frontend
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Test endpoint
app.get('/api/status', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Successfully connected to the backend! CORS is configured properly.' 
    });
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});