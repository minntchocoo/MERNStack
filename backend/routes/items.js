const express = require('express');
const {
  addItem,
  deleteItem,
  archiveItem, // Add this import for the archiveItem function
  getAllItems,
  getSingleItem,
  updateItem,
} = require('../controllers/itemController');

const router = express.Router();

// GET all ITEMS
router.get('/', getAllItems);

// GET a single ITEM
router.get('/:id', getSingleItem);

// POST a new ITEM
router.post('/', addItem);

// DELETE an ITEM
router.delete('/:id', deleteItem);

// Archive an ITEM (NEW)
router.post('/archive/:id', archiveItem);

// UPDATE an ITEM
router.patch('/:id', updateItem);

module.exports = router;
