
// Controller to handle user creation
const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    // Set default values if fields are missing
    const userData = {
      first_name: first_name || 'DefaultFirstName',
      last_name: last_name || 'DefaultLastName',
      email: email || 'default@example.com',
      password: password || 'defaultPassword',
      role: role || 'user',
    };

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password criteria (add your own criteria)
    const MIN_PASSWORD_LENGTH = 8;
    if (userData.password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long` });
    }

    const newUser = new User(userData);
    const savedUser = await newUser.save();
    
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Controller to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get a specific user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update a specific user by ID
exports.updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a specific user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
