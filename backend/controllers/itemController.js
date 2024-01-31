const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
    host: 'localhost',
    database: 'yjw',
    password: 'Tuskan32',
    port: 5432,
});

// Add a new item
    const addItem = async (req, res) => {
      try {
        const { name, price, image, quantity, description } = req.body;

        const newItemQuery = await pool.query(
          'INSERT INTO items (name, price, image, quantity, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [name, price, image, quantity, description]
        );

        const newItem = newItemQuery.rows[0];

        res.status(201).json(newItem);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };

// Delete an item by ID
const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const deletedItemQuery = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [itemId]);
    const deletedItem = deletedItemQuery.rows[0];

    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully', deletedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Archive an item by ID
const archiveItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const archivedItemQuery = await pool.query(
      'UPDATE items SET is_archived = true WHERE id = $1 RETURNING *',
      [itemId]
    );

    const archivedItem = archivedItemQuery.rows[0];

    if (!archivedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: 'Item archived successfully', archivedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all non-archived items
const getAllItems = async (req, res) => {
  try {
    const itemsQuery = await pool.query('SELECT * FROM items WHERE is_archived = false');
    const items = itemsQuery.rows;

    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single item by ID
const getSingleItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const itemQuery = await pool.query('SELECT * FROM items WHERE id = $1', [itemId]);
    const item = itemQuery.rows[0];

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an item by ID
const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { name, price, image, quantity, description } = req.body;

    const updatedItemQuery = await pool.query(
      'UPDATE items SET name = $1, price = $2, image = $3, quantity = $4, description = $5 WHERE id = $6 RETURNING *',
      [name, price, image, quantity, description, itemId]
    );

    const updatedItem = updatedItemQuery.rows[0];

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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
