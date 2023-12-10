const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// Get a specific user by ID
router.get('/:userId', userController.getUserById);

// Update a specific user by ID
router.put('/:userId', userController.updateUserById);

// Delete a specific user by ID
router.delete('/:userId', userController.deleteUserById);

module.exports = router;
