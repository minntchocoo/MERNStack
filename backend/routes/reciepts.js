const express = require('express');
const router = express.Router();
const receiptController = require('../controllers/receiptController');

// GET all receipts
router.get('/', receiptController.getAllReceipts);

// GET a single receipt by ID
router.get('/:id', receiptController.getReceiptById);

// POST a new receipt
router.post('/', receiptController.createReceipt);

// UPDATE an existing receipt
router.patch('/:id', receiptController.updateReceipt);

// DELETE a receipt
router.delete('/:id', receiptController.deleteReceipt);

module.exports = router;
