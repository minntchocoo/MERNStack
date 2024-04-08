import React, { useState, useEffect } from 'react';
import NavbarA from '../../components/Navbar-A';

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

const ManageOrderView = () => {
  const [orders, setOrders] = useState(sampleOrders);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved'

  useEffect(() => {
    // Initially set filtered orders to all orders
    setFilteredOrders(orders);
  }, [orders]);

  // Function to handle action button click
  const handleActionClick = (id) => {
    // Handle action button click
    console.log(`Action button clicked for order with id: ${id}`);
  };
  // Function to handle archiving an order
  const handleArchiveOrder = (id) => {
    // Filter out the archived order
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
  };
  // Function to filter orders based on status
  const filterOrders = (status) => {
    if (status === 'all') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    }
    setFilter(status);
  };

  return (
    <div>
      <NavbarA />
      <div className="content-container">
        <div className="filter-buttons">
          <button onClick={() => filterOrders('all')} className={filter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => filterOrders('Pending')} className={filter === 'Pending' ? 'active' : ''}>Pending</button>
          <button onClick={() => filterOrders('Approved')} className={filter === 'Approved' ? 'active' : ''}>Approved</button>
        </div>
        <div className="order-list-container">
          {filteredOrders.map((order) => (
            <div key={order.id} className="order-card">
              <img src={order.image} alt="Product" className="order-card-image" />
              <div className="order-card-content">
                <h3>{order.product_name}</h3>
                <p>{order.description}</p>
                <p>Status: {order.status}</p>
                <div className="order-card-actions">
                  <button className="order-list-verify-btn" onClick={() => handleActionClick(order.id)}>Verify</button>
                  <button className="order-list-deny-btn" onClick={() => handleActionClick(order.id)}>Deny</button>
                  <button className="order-list-deny-btn" onClick={() => handleArchiveOrder(order.id)}>Archive</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageOrderView;
