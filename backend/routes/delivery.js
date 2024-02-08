const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');

// GET all deliveries
router.get('/', deliveryController.getAllDeliveries);

// GET a single delivery by ID
router.get('/:id', deliveryController.getDeliveryById);

// POST a new delivery
router.post('/', deliveryController.createDelivery);

// UPDATE an existing delivery
router.patch('/:id', deliveryController.updateDelivery);

// DELETE a delivery
router.delete('/:id', deliveryController.deleteDelivery);

module.exports = router;
