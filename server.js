// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes'); // Import the routes.js file

// Configure environment variables
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("MongoDB is connected");
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB", error);
    });

// Use the routes
app.use('/', routes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the FreakyTowns API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
