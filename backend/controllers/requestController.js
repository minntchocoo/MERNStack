const pool = require('../db');

// Controller for handling CRUD operations on the "store.Request" table
const requestController = {
  // Retrieve all requests
  getAllRequests: async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."Request"');
      client.release();
      res.json(result.rows);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Retrieve a single request by ID
  getRequestById: async (req, res) => {
    const requestId = req.params.id;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."Request" WHERE id = $1', [requestId]);
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Create a new request
  createRequest: async (req, res) => {
    const { ItemID, count, total, SupplierID } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO store."Request" (ItemID, count, total, SupplierID) VALUES ($1, $2, $3, $4) RETURNING *',
        [ItemID, count, total, SupplierID]
      );
      client.release();
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update an existing request
  updateRequest: async (req, res) => {
    const requestId = req.params.id;
    const { ItemID, count, total, SupplierID } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'UPDATE store."Request" SET ItemID = $1, count = $2, total = $3, SupplierID = $4 WHERE id = $5 RETURNING *',
        [ItemID, count, total, SupplierID, requestId]
      );
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete a request
  deleteRequest: async (req, res) => {
    const requestId = req.params.id;
    try {
      const client = await pool.connect();
      await client.query('DELETE FROM store."Request" WHERE id = $1', [requestId]);
      client.release();
      res.json({ message: 'Request deleted successfully' });
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Export the requestController for use in other parts of the application
module.exports = requestController;
