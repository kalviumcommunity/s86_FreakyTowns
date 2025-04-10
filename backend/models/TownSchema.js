const mongoose = require("mongoose");

const townSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  country: { type: String, required: true },
  reviews: [{ type: String }], // Array of review strings
});

module.exports = mongoose.model("Town", townSchema);
