import React from 'react';
import NavbarA from '../components/Navbar-A';
import { Link } from 'react-router-dom';

import '../static/admin.css';

const sampleOrders = [
  {
    id: 1,
    description: 'Order 1 description',
    customer_id: 101,
    date: '2024-03-15',
    product_name: 'Product 1',
    image: 'https://example.com/image1.jpg',
    status: 'Pending',
  },
  {
    id: 2,
    description: 'Order 2 description',
    customer_id: 102,
    date: '2024-03-16',
    product_name: 'Product 2',
    image: 'https://example.com/image2.jpg',
    status: 'Approved',
  },
  // Add more sample orders as needed
];

const sampleItems = [
  { id: 1, name: 'Item 1', status: 'To be Verified' },
  { id: 2, name: 'Item 2', status: 'Verified' },
  // Add more sample items as needed
];
const countItemsByStatus = (data) => {
  return data.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    { 'To be Verified': 0, Verified: 0 }
  );
};

const countOrders = (orders) => {
  return orders.reduce((counts, order) => {
    counts[order.status] = (counts[order.status] || 0) + 1;
    return counts;
  }, {});
};

const AdminView = () => {
  const orderCounts = countOrders(sampleOrders);
  const itemCounts = countItemsByStatus(sampleItems);

  return (
    <div>
      <NavbarA />
      <h1 id='e'>Menu</h1>
      
      <div className="card-div-container">
        <div className="card">
          <h2>Accounts</h2>
          <p>Total Accounts: 100</p>
          <p>Number of Customers: 100</p>
          <p>Number of Suppliers: 10</p>
          <Link to="/admin/account">Manage Accounts</Link>
        </div>
        <div className="card">
          <h2>Orders</h2>
          <p>Total Orders: {sampleOrders.length}</p>
          <p>To be Approve: {orderCounts['Pending']}</p>
          <p>Total Approved: {orderCounts['Approved']}</p>
          <Link to="/admin/order">Manage Orders</Link>
        </div>

        <div className="card">
          <h2>Item List</h2>
          <p>Total Items: {sampleItems.length}</p>
          <p>To be Verified: {itemCounts['To be Verified']}</p>
          <p>Total Verified: {itemCounts['Verified']}</p>
          <Link to="/admin/list">Manage Items</Link>
        </div>

        
        <div className="card">
          <h2>Manage Category</h2>
          <p>Total Category: {sampleItems.length}</p>
          <Link to="/admin/category">Manage Items</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
