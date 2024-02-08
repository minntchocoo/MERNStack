const pool = require('../db');

// Controller for handling CRUD operations on the "store.Reciept" table
const receiptController = {
  // Retrieve all receipts
  getAllReceipts: async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."Reciept"');
      client.release();
      res.json(result.rows);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Retrieve a single receipt by ID
  getReceiptById: async (req, res) => {
    const receiptId = req.params.id;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."Reciept" WHERE id = $1', [receiptId]);
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Create a new receipt
  createReceipt: async (req, res) => {
    const { ItemID, OrderID } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO store."Reciept" (ItemID, OrderID) VALUES ($1, $2) RETURNING *',
        [ItemID, OrderID]
      );
      client.release();
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update an existing receipt
  updateReceipt: async (req, res) => {
    const receiptId = req.params.id;
    const { ItemID, OrderID } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'UPDATE store."Reciept" SET ItemID = $1, OrderID = $2 WHERE id = $3 RETURNING *',
        [ItemID, OrderID, receiptId]
      );
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete a receipt
  deleteReceipt: async (req, res) => {
    const receiptId = req.params.id;
    try {
      const client = await pool.connect();
      await client.query('DELETE FROM store."Reciept" WHERE id = $1', [receiptId]);
      client.release();
      res.json({ message: 'Receipt deleted successfully' });
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Export the receiptController for use in other parts of the application
module.exports = receiptController;
