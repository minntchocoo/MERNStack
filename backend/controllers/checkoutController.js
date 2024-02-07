const { Pool } = require('pg');

const pool = require('../db');


exports.processCheckout = async (req, res) => {
  const checkoutData = req.body;

  try {
    const { payment_type, address, name, date, cart_items } = checkoutData;

    const query = `
      INSERT INTO checkouts (payment_type, address, name, date, cart_items)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [payment_type, address, name, date, cart_items];

    const result = await pool.query(query, values);

    const newCheckout = result.rows[0];

    res.status(200).json({ message: 'Checkout successful', data: newCheckout });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};
