const pool = require('../db');

// Controller for handling CRUD operations on the "store.Courier" table
const courierController = {
  // Retrieve all couriers
  getAllCouriers: async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."Courier"');
      client.release();
      res.json(result.rows);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Retrieve a single courier by ID
  getCourierById: async (req, res) => {
    const courierId = req.params.id;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."Courier" WHERE id = $1', [courierId]);
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Create a new courier
  createCourier: async (req, res) => {
    const { first_name, last_name, phone_number, userID } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO store."Courier" (first_name, last_name, phone_number, userID) VALUES ($1, $2, $3, $4) RETURNING *',
        [first_name, last_name, phone_number, userID]
      );
      client.release();
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update an existing courier
  updateCourier: async (req, res) => {
    const courierId = req.params.id;
    const { first_name, last_name, phone_number, userID } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'UPDATE store."Courier" SET first_name = $1, last_name = $2, phone_number = $3, userID = $4 WHERE id = $5 RETURNING *',
        [first_name, last_name, phone_number, userID, courierId]
      );
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete a courier
  deleteCourier: async (req, res) => {
    const courierId = req.params.id;
    try {
      const client = await pool.connect();
      await client.query('DELETE FROM store."Courier" WHERE id = $1', [courierId]);
      client.release();
      res.json({ message: 'Courier deleted successfully' });
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Export the courierController for use in other parts of the application
module.exports = courierController;
