const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// GET all roles
router.get('/', roleController.getAllRoles);

// GET a single role by ID
router.get('/:id', roleController.getRoleById);

// POST a new role
router.post('/', roleController.createRole);

// UPDATE an existing role
router.patch('/:id', roleController.updateRole);

// DELETE a role
router.delete('/:id', roleController.deleteRole);

module.exports = router;
