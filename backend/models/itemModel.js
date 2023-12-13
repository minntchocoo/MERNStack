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
});

<<<<<<< Updated upstream
// defines the structure you save
const itemSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
}, {timestamps: true })

module.exports = mongoose.model('Item', itemSchema)
=======
// Create the Item model
const Item = mongoose.model('Item', itemSchema);
>>>>>>> Stashed changes

// Export the model
module.exports = Item;
