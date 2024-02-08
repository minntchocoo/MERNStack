const pool = require('../db');

// Controller for handling CRUD operations on the "store.Supplier" table
const supplierController = {
  // Retrieve all suppliers
  getAllSuppliers: async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."Supplier"');
      client.release();
      res.json(result.rows);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Retrieve a single supplier by ID
  getSupplierById: async (req, res) => {
    const supplierId = req.params.id;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store."Supplier" WHERE id = $1', [supplierId]);
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Create a new supplier
  createSupplier: async (req, res) => {
    const { company_name, phone_number, userID } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO store."Supplier" (company_name, phone_number, userID) VALUES ($1, $2, $3) RETURNING *',
        [company_name, phone_number, userID]
      );
      client.release();
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update an existing supplier
  updateSupplier: async (req, res) => {
    const supplierId = req.params.id;
    const { company_name, phone_number, userID } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'UPDATE store."Supplier" SET company_name = $1, phone_number = $2, userID = $3 WHERE id = $4 RETURNING *',
        [company_name, phone_number, userID, supplierId]
      );
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete a supplier
  deleteSupplier: async (req, res) => {
    const supplierId = req.params.id;
    try {
      const client = await pool.connect();
      await client.query('DELETE FROM store."Supplier" WHERE id = $1', [supplierId]);
      client.release();
      res.json({ message: 'Supplier deleted successfully' });
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Export the supplierController for use in other parts of the application
module.exports = supplierController;
