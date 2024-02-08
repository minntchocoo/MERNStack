const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// GET all orders
router.get('/', orderController.getAllOrders);

// GET a single order by ID
router.get('/:id', orderController.getOrderById);

// POST a new order
router.post('/', orderController.createOrder);

// UPDATE an existing order
router.patch('/:id', orderController.updateOrder);

// DELETE an order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
