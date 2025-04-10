// Import required modules
const express = require('express');
const router = express.Router();
const Town = require('./models/TownSchema'); // Import the Town model
const Joi = require('joi'); // Import Joi for validation

// Define Joi validation schemas
const townSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  country: Joi.string().min(2).required(),
});

const reviewSchema = Joi.object({
  review: Joi.string().min(5).required(),
});

// Middleware for validation
function validateRequest(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
}

// Create a new town (POST /towns)
router.post('/towns', validateRequest(townSchema), async (req, res) => {
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
router.put('/towns/:id', validateRequest(townSchema), async (req, res) => {
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

// Add a review (POST /towns/:id/reviews)
router.post('/towns/:id/reviews', validateRequest(reviewSchema), async (req, res) => {
  const { id } = req.params;
  const { review } = req.body;

  try {
    const town = await Town.findById(id);
    if (!town) return res.status(404).send("Town not found");

    town.reviews = town.reviews || [];
    town.reviews.push(review);
    await town.save();

    res.status(200).send(town);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).send("Server error");
  }
});

// Export the router
module.exports = router;
