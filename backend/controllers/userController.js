const { Pool } = require('pg');

const pool = require('../db');

// Controller to handle user creation
exports.createUser = async (req, res) => {
  try {
    const {username, email, password, role } = req.body;

    // Check if the email is already in use
    const existingUserQuery = await pool.query('SELECT * FROM store."User" WHERE email = $1', [email]);

    if (existingUserQuery.rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create a new user
    const newUserQuery = await pool.query(
      'INSERT INTO store."User" (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, password, role]
    );

    const newUser = newUserQuery.rows[0];

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const usersQuery = await pool.query('SELECT * FROM store."User"');
    const users = usersQuery.rows;
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get a specific user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userQuery = await pool.query('SELECT * FROM store."User" WHERE id = $1', [userId]);
    const user = userQuery.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update a specific user by ID
exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUserQuery = await pool.query(
      'UPDATE store."User" SET username = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *',
      [
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.role,
        userId,
      ]
    );

    const updatedUser = updatedUserQuery.rows[0];

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a specific user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUserQuery = await pool.query('DELETE FROM store."User" WHERE id = $1 RETURNING *', [userId]);
    const deletedUser = deletedUserQuery.rows[0];

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
