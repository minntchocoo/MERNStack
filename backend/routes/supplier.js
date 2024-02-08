const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// GET all suppliers
router.get('/', supplierController.getAllSuppliers);

// GET a single supplier by ID
router.get('/:id', supplierController.getSupplierById);

// POST a new supplier
router.post('/', supplierController.createSupplier);

// UPDATE an existing supplier
router.patch('/:id', supplierController.updateSupplier);

// DELETE a supplier
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;
