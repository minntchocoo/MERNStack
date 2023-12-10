const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey'; // Replace with a strong, secret key

// authController.js
const User = require('../models/userModel');

// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if the user exists and the password is correct
    if (user && user.password === password) {
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

      res.json({ success: true, message: 'Login successful', token, userId: user._id });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
};
