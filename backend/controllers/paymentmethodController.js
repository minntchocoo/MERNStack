const pool = require('../db');

// Controller for handling CRUD operations on the "store.PaymentMethod" table
const paymentMethodController = {
  // Retrieve all payment methods
  getAllPaymentMethods: async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."PaymentMethod"');
      client.release();
      res.json(result.rows);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Retrieve a single payment method by ID
  getPaymentMethodById: async (req, res) => {
    const paymentMethodId = req.params.id;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."PaymentMethod" WHERE id = $1', [paymentMethodId]);
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Create a new payment method
  createPaymentMethod: async (req, res) => {
    const { method } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO store."PaymentMethod" (method) VALUES ($1) RETURNING *',
        [method]
      );
      client.release();
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update an existing payment method
  updatePaymentMethod: async (req, res) => {
    const paymentMethodId = req.params.id;
    const { method } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'UPDATE store."PaymentMethod" SET method = $1 WHERE id = $2 RETURNING *',
        [method, paymentMethodId]
      );
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete a payment method
  deletePaymentMethod: async (req, res) => {
    const paymentMethodId = req.params.id;
    try {
      const client = await pool.connect();
      await client.query('DELETE FROM store."PaymentMethod" WHERE id = $1', [paymentMethodId]);
      client.release();
      res.json({ message: 'Payment method deleted successfully' });
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Export the paymentMethodController for use in other parts of the application
module.exports = paymentMethodController;
