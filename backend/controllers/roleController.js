const pool = require('../db');

// Controller for handling CRUD operations on the "store.Role" table
const roleController = {
  // Retrieve all roles
  getAllRoles: async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."Role"');
      client.release();
      res.json(result.rows);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Retrieve a single role by ID
  getRoleById: async (req, res) => {
    const roleId = req.params.id;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."Role" WHERE id = $1', [roleId]);
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Create a new role
  createRole: async (req, res) => {
    const { role } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO store."Role" (role) VALUES ($1) RETURNING *',
        [role]
      );
      client.release();
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update an existing role
  updateRole: async (req, res) => {
    const roleId = req.params.id;
    const { role } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'UPDATE store."Role" SET role = $1 WHERE id = $2 RETURNING *',
        [role, roleId]
      );
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete a role
  deleteRole: async (req, res) => {
    const roleId = req.params.id;
    try {
      const client = await pool.connect();
      await client.query('DELETE FROM store."Role" WHERE id = $1', [roleId]);
      client.release();
      res.json({ message: 'Role deleted successfully' });
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Export the roleController for use in other parts of the application
module.exports = roleController;
