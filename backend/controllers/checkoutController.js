// checkoutController.js
const Checkout = require('../models/checkoutModel');

// Controller function for handling checkout
exports.processCheckout = async (req, res) => {
  const checkoutData = req.body; // Assuming you're sending data in the request body

  try {
    // Save the checkout data to the database
    const newCheckout = new Checkout(checkoutData);
    await newCheckout.save();

    // Optionally, perform additional actions here

    // Send a success response
    res.status(200).json({ message: 'Checkout successful', data: newCheckout });
  } catch (error) {
    console.error('Error during checkout:', error);
    // Send an error response
    res.status(500).json({ message: 'Internal server error', error });
  }
};
