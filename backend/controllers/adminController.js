const pool = require('../db');

// Controller for handling CRUD operations on the "store.Admin" table
const adminController = {
  // Retrieve all admins
  getAllAdmins: async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."Admin"');
      client.release();
      res.json(result.rows);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Retrieve a single admin by ID
  getAdminById: async (req, res) => {
    const adminId = req.params.id;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."Admin" WHERE id = $1', [adminId]);
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Create a new admin
  createAdmin: async (req, res) => {
    const { first_name, last_name, userID } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO store."Admin" (first_name, last_name, userID) VALUES ($1, $2, $3) RETURNING *',
        [first_name, last_name, userID]
      );
      client.release();
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update an existing admin
  updateAdmin: async (req, res) => {
    const adminId = req.params.id;
    const { first_name, last_name, userID } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'UPDATE store."Admin" SET first_name = $1, last_name = $2, userID = $3 WHERE id = $4 RETURNING *',
        [first_name, last_name, userID, adminId]
      );
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete an admin
  deleteAdmin: async (req, res) => {
    const adminId = req.params.id;
    try {
      const client = await pool.connect();
      await client.query('DELETE FROM store."Admin" WHERE id = $1', [adminId]);
      client.release();
      res.json({ message: 'Admin deleted successfully' });
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Export the adminController for use in other parts of the application
module.exports = adminController;
