// checkoutModel.js
const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  paymentType: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  cartItems: [
    {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
