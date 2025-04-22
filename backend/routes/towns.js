// Import required modules
const express = require('express');
const router = express.Router();
const Town = require('../models/TownSchema'); // Town model

// -----------------
// Helper Validators
// -----------------

function isValidTown(data) {
  const { name, description, country } = data;
  return (
    typeof name === 'string' && name.trim().length >= 3 &&
    typeof description === 'string' && description.trim().length >= 10 &&
    typeof country === 'string' && country.trim().length >= 2
  );
}

function isValidReview(data) {
  const { review } = data;
  return typeof review === 'string' && review.trim().length >= 5;
}

// -----------------
// Town Routes
// -----------------

// Create a new town (POST /towns)
router.post('/towns', async (req, res) => {
  if (!isValidTown(req.body)) {
    return res.status(400).json({ error: 'Invalid town data' });
  }

  try {
    const newTown = new Town(req.body);
    const savedTown = await newTown.save();
    res.status(201).json(savedTown);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to fetch towns with populated 'created_by' field
router.get("/api/towns", async (req, res) => {
  try {
    const { created_by } = req.query;
    let query = {};

    if (created_by && created_by !== "All") {
      query.created_by = created_by; // Filter towns by selected user
    }

    const towns = await Town.find(query)
      .populate("created_by", "username") // Populating created_by with the username field
      .exec();
    res.json(towns);
  } catch (error) {
    console.error("Error fetching towns:", error);
    res.status(500).send("Server Error");
  }
});


// Update a town by ID (PUT /towns/:id)
router.put('/towns/:id', async (req, res) => {
  if (!isValidTown(req.body)) {
    return res.status(400).json({ error: 'Invalid town data' });
  }

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

router.get('/towns', async (req, res) => {
  try {
      const filter = {};
      if (req.query.created_by && req.query.created_by !== 'All') {
          filter.created_by = req.query.created_by;
      }
      const towns = await Town.find(filter).populate('created_by', 'username');
      res.json(towns);
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch towns" });
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

// Add a review to a town (POST /towns/:id/reviews)
router.post('/towns/:id/reviews', async (req, res) => {
  if (!isValidReview(req.body)) {
    return res.status(400).json({ error: 'Invalid review' });
  }

  const { id } = req.params;
  const { review } = req.body;

  try {
    const town = await Town.findById(id);
    if (!town) return res.status(404).json({ error: "Town not found" });

    town.reviews = town.reviews || [];
    town.reviews.push(review);
    await town.save();

    res.status(200).json(town);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// Get all towns (with optional filter and creator population)
router.get('/towns', async (req, res) => {
  try {
    const filter = {};
    if (req.query.created_by && req.query.created_by !== 'All') {
      filter.created_by = req.query.created_by;
    }

    const towns = await Town.find(filter).populate('created_by', 'username');
    res.status(200).json(towns);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch towns" });
  }
});


module.exports = router;
