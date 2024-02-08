const pool = require('../db');

// Retrieve all items
async function getAllItems(req, res) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM store."Items"');
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Retrieve a single item by ID
async function getItemById(req, res) {
  const itemId = req.params.id;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM store."Items" WHERE id = $1', [itemId]);
    client.release();
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Create a new item
async function createItem(req, res) {
  const { item_name, description, quantity, price, SupplierID, image } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO store."Items" (item_name, description, quantity, price, SupplierID, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [item_name, description, quantity, price, SupplierID, image]
    );
    client.release();
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Update an existing item
async function updateItem(req, res) {
  const itemId = req.params.id;
  const { item_name, description, quantity, price, SupplierID, image } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE store."Items" SET item_name = $1, description = $2, quantity = $3, price = $4, SupplierID = $5, image = $6 WHERE id = $7 RETURNING *',
      [item_name, description, quantity, price, SupplierID, image, itemId]
    );
    client.release();
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Delete an item
async function deleteItem(req, res) {
  const itemId = req.params.id;
  try {
    const client = await pool.connect();
    await client.query('DELETE FROM store."Items" WHERE id = $1', [itemId]);
    client.release();
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Export the functions individually
module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
