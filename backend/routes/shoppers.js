const express = require('express');
const router = express.Router();
const shopperController = require('../controllers/shopperController');

// GET all shoppers
router.get('/', shopperController.getAllShoppers);

// GET a single shopper by ID
router.get('/:id', shopperController.getShopperById);

// POST a new shopper
router.post('/', shopperController.createShopper);

// UPDATE an existing shopper
router.patch('/:id', shopperController.updateShopper);

// DELETE a shopper
router.delete('/:id', shopperController.deleteShopper);

module.exports = router;
