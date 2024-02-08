const pool = require('../db');

// Controller for handling CRUD operations on the "store.Shopper" table
const shopperController = {
  // Retrieve all shoppers
  getAllShoppers: async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."Shopper"');
      client.release();
      res.json(result.rows);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Retrieve a single shopper by ID
  getShopperById: async (req, res) => {
    const shopperId = req.params.id;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."Shopper" WHERE id = $1', [shopperId]);
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Create a new shopper
  createShopper: async (req, res) => {
    const { userID, first_name, last_name, phone_number, address } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO store."Shopper" (userID, first_name, last_name, phone_number, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userID, first_name, last_name, phone_number, address]
      );
      client.release();
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update an existing shopper
  updateShopper: async (req, res) => {
    const shopperId = req.params.id;
    const { userID, first_name, last_name, phone_number, address } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'UPDATE store."Shopper" SET userID = $1, first_name = $2, last_name = $3, phone_number = $4, address = $5 WHERE id = $6 RETURNING *',
        [userID, first_name, last_name, phone_number, address, shopperId]
      );
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete a shopper
  deleteShopper: async (req, res) => {
    const shopperId = req.params.id;
    try {
      const client = await pool.connect();
      await client.query('DELETE FROM store."Shopper" WHERE id = $1', [shopperId]);
      client.release();
      res.json({ message: 'Shopper deleted successfully' });
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Export the shopperController for use in other parts of the application
module.exports = shopperController;
