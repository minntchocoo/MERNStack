const express = require('express');
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController'); // Adjusted import statement

const router = express.Router();

// GET all ITEMS
router.get('/', getAllItems);

// GET a single ITEM
router.get('/:id', getItemById);

// POST a new ITEM
router.post('/', createItem);

// DELETE an ITEM
router.delete('/:id', deleteItem);

// UPDATE an ITEM
router.patch('/:id', updateItem);

module.exports = router;
