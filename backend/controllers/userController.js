const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
    host: 'localhost',
    database: 'yjw',
    password: 'Tuskan32',
    port: 5432,
});

// Controller to handle user creation
exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    // Check if the email is already in use
    const existingUserQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (existingUserQuery.rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create a new user
    const newUserQuery = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [first_name, last_name, email, password, role]
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
    const usersQuery = await pool.query('SELECT * FROM users');
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
    const userQuery = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
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
      'UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4, role = $5 WHERE id = $6 RETURNING *',
      [
        req.body.first_name,
        req.body.last_name,
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
    const deletedUserQuery = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
    const deletedUser = deletedUserQuery.rows[0];

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
