const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
    host: 'localhost',
    database: 'yjw',
    password: 'Tuskan32',
    port: 5432,
});

const secretKey = 'yourSecretKey'; // Replace with a strong, secret key

// authController.js
// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    const user = result.rows[0];

    // Check if the user exists and the password is correct
    if (user && user.password === password) {
      // Generate JWT token
      const token = jwt.sign({ userId: user.id, role: user.role }, secretKey, { expiresIn: '1h' });

      res.json({ success: true, message: 'Login successful', token, userId: user.id, role: user.role });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
};
