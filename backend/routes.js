// Import required modules
const express = require('express');
const router = express.Router();
const Town = require('./models/TownSchema'); // Import the Town model

// Create a new town (POST /towns)
router.post('/towns', async (req, res) => {
    try {
        const newTown = new Town(req.body);
        const savedTown = await newTown.save();
        res.status(201).json(savedTown);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all towns (GET /towns)
router.get('/towns', async (req, res) => {
    try {
        const towns = await Town.find();
        res.status(200).json(towns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a town by ID (PUT /towns/:id)
router.put('/towns/:id', async (req, res) => {
    try {
        const updatedTown = await Town.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTown) {
            return res.status(404).json({ error: 'Town not found' });
        }
        res.status(200).json(updatedTown);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a town by ID (DELETE /towns/:id)
router.delete('/towns/:id', async (req, res) => {
    try {
        const deletedTown = await Town.findByIdAndDelete(req.params.id);
        if (!deletedTown) {
            return res.status(404).json({ error: 'Town not found' });
        }
        res.status(200).json({ message: 'Town deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Export the router
module.exports = router;
