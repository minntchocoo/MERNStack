const express = require('express');
const router = express.Router();
const paymentMethodController = require('../controllers/paymentmethodController');

// GET all payment methods
router.get('/', paymentMethodController.getAllPaymentMethods);

// GET a single payment method by ID
router.get('/:id', paymentMethodController.getPaymentMethodById);

// POST a new payment method
router.post('/', paymentMethodController.createPaymentMethod);

// UPDATE an existing payment method
router.patch('/:id', paymentMethodController.updatePaymentMethod);

// DELETE a payment method
router.delete('/:id', paymentMethodController.deletePaymentMethod);

module.exports = router;
