const Item = require('../models/itemModel');

// Add a new item
const addItem = async (req, res) => {
  try {
    const { name, price, image, quantity, description } = req.body;

    const newItem = new Item({
      name,
      price,
      image,
      quantity,
      description,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an item by ID
const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully', deletedItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Archive an item by ID
const archiveItem = async (req, res) => {
  try {
    const archivedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { isArchived: true },
      { new: true }
    );

    if (!archivedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item archived successfully', archivedItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all non-archived items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ isArchived: false });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single item by ID
const getSingleItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an item by ID
const updateItem = async (req, res) => {
  try {
    const { name, price, image, quantity, description } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, price, image, quantity, description },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addItem,
  deleteItem,
  archiveItem,
  getAllItems,
  getSingleItem,
  updateItem,
};
