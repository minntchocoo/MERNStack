const express = require('express');
const router = express.Router();
const courierController = require('../controllers/courierController');

// GET all couriers
router.get('/', courierController.getAllCouriers);

// GET a single courier by ID
router.get('/:id', courierController.getCourierById);

// POST a new courier
router.post('/', courierController.createCourier);

// UPDATE an existing courier
router.patch('/:id', courierController.updateCourier);

// DELETE a courier
router.delete('/:id', courierController.deleteCourier);

module.exports = router;
