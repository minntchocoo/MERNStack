const pool = require('../db');

// Controller for handling CRUD operations on the "store.Delivery" table
const deliveryController = {
  // Retrieve all deliveries
  getAllDeliveries: async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."Delivery"');
      client.release();
      res.json(result.rows);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Retrieve a single delivery by ID
  getDeliveryById: async (req, res) => {
    const deliveryId = req.params.id;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."Delivery" WHERE id = $1', [deliveryId]);
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Create a new delivery
  createDelivery: async (req, res) => {
    const { RecieptID, CourierID, address, status } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO store."Delivery" (RecieptID, CourierID, address, status) VALUES ($1, $2, $3, $4) RETURNING *',
        [RecieptID, CourierID, address, status]
      );
      client.release();
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update an existing delivery
  updateDelivery: async (req, res) => {
    const deliveryId = req.params.id;
    const { RecieptID, CourierID, address, status } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'UPDATE store."Delivery" SET RecieptID = $1, CourierID = $2, address = $3, status = $4 WHERE id = $5 RETURNING *',
        [RecieptID, CourierID, address, status, deliveryId]
      );
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete a delivery
  deleteDelivery: async (req, res) => {
    const deliveryId = req.params.id;
    try {
      const client = await pool.connect();
      await client.query('DELETE FROM store."Delivery" WHERE id = $1', [deliveryId]);
      client.release();
      res.json({ message: 'Delivery deleted successfully' });
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Export the deliveryController for use in other parts of the application
module.exports = deliveryController;
