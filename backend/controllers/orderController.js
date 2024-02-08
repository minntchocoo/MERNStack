const pool = require('../db');

// Controller for handling CRUD operations on the "store.Order" table
const orderController = {
  // Retrieve all orders
  getAllOrders: async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."Order"');
      client.release();
      res.json(result.rows);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Retrieve a single order by ID
  getOrderById: async (req, res) => {
    const orderId = req.params.id;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."Order" WHERE id = $1', [orderId]);
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Create a new order
  createOrder: async (req, res) => {
    const { ShopperID, ItemID, PaymentMethodID, quantity, total } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO store."Order" (ShopperID, ItemID, PaymentMethodID, quantity, total) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [ShopperID, ItemID, PaymentMethodID, quantity, total]
      );
      client.release();
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update an existing order
  updateOrder: async (req, res) => {
    const orderId = req.params.id;
    const { ShopperID, ItemID, PaymentMethodID, quantity, total } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'UPDATE store."Order" SET ShopperID = $1, ItemID = $2, PaymentMethodID = $3, quantity = $4, total = $5 WHERE id = $6 RETURNING *',
        [ShopperID, ItemID, PaymentMethodID, quantity, total, orderId]
      );
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete an order
  deleteOrder: async (req, res) => {
    const orderId = req.params.id;
    try {
      const client = await pool.connect();
      await client.query('DELETE FROM store."Order" WHERE id = $1', [orderId]);
      client.release();
      res.json({ message: 'Order deleted successfully' });
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Export the orderController for use in other parts of the application
module.exports = orderController;
