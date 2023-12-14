import React, { useState, useEffect } from 'react';
import NavbarA from '../components/Navbar-A';
import { Link } from 'react-router-dom';

import '../static/admin.css';

const AdminView = () => {
  // Assuming you have a function to fetch item data from your API
  const fetchItemData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/items/');
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        console.error('Failed to fetch items.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // State to store item data
  const [items, setItems] = useState([]);

  // Fetch item data on component mount
  useEffect(() => {
    fetchItemData();
  }, []);

  // Calculate total quantity and projected income
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalProjectedIncome = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <NavbarA />
      <h1>Menu</h1>
      <div className="card">
        <h2>Item Stats</h2>
        <p>Total Items: {items.length}</p>
        <p>Total Quantity: {totalQuantity}</p>
        <p>Total Projected Income: ${totalProjectedIncome.toFixed(2)}</p>
        <Link to="/admin/list">Go to Admin List</Link>  
      </div>
    </div>
  );
};

export default AdminView;
