const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// GET all admins
router.get('/', adminController.getAllAdmins);

// GET a single admin by ID
router.get('/:id', adminController.getAdminById);

// POST a new admin
router.post('/', adminController.createAdmin);

// UPDATE an existing admin
router.patch('/:id', adminController.updateAdmin);

// DELETE an admin
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
