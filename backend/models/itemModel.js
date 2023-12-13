// models/item.js
const mongoose = require('mongoose');

// Define the item schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0, // Default quantity to 0 if not provided
  },
  description: {
    type: String,
  },
  isArchived: { 
    type: Boolean, default: false 
  }, // New field for archiving
});

// Create the Item model
const Item = mongoose.model('Item', itemSchema);

// Export the model
module.exports = Item;
