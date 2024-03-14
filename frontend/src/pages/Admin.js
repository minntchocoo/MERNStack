import React, { useState, useEffect } from 'react';
import NavbarA from '../components/Navbar-A';
import { Link } from 'react-router-dom';

import '../static/admin.css';

const countItemsByStatus = (data) => {
  return data.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    { 'To be Verified': 0, Verified: 0 }
  );
};

const AdminView = () => {
  
  const samplePasabayRequests = [
    {
      id: 1,
      description: "Buy groceries from SM",
      customer_id: 123,
      date: "2024-03-13",
      product_name: "Various groceries",
      status: "To be Verified",
    },
    {
      id: 2,
      description: "Pick up laundry",
      customer_id: 456,
      date: "2024-03-12",
      product_name: "Laundry bag",
      status: "Verified",
    },
    // Add more sample data for pasabayRequests
  ];

  const sampleUserContent = [
    {
      id: 1,
      description: "Restaurant review",
      customer_id: 789,
      date: "2024-03-10",
      product_name: "New Italian restaurant",
      status: "To be Verified",
    },
    {
      id: 2,
      description: "Travel blog post",
      customer_id: 12,
      date: "2024-03-08",
      product_name: "Weekend getaway",
      status: "Verified",
    },
    // Add more sample data for userContent
  ];

  const [pasabayRequests, setPasabayRequests] = useState(samplePasabayRequests);
  const [userContent, setUserContent] = useState(sampleUserContent);

  const pasabayRequestCounts = countItemsByStatus(pasabayRequests);
  const userContentCounts = countItemsByStatus(userContent);

  // Use useEffect to fetch data from your API
  useEffect(() => {
    // Example fetch for Pasabay Requests
    fetch('http://localhost:4000/api/pasabay-requests')
      .then(response => response.json())
      .then(data => setPasabayRequests(data));

    // Example fetch for User Content
    fetch('http://localhost:4000/api/user-content')
      .then(response => response.json())
      .then(data => setUserContent(data));
  }, []);

  return (
    <div>
      <NavbarA />
      <h1 id='e'>Menu</h1>
      
      <div className="card-div-container">
        <div className="card">
          <h2>Accounts</h2>
          <p>Total Accounts: 100</p>
          <p>Number of Customer: 100</p>
          <p>Number of Supplier: 10 </p>
          <Link to="/admin/account">Manage Accounts</Link>
        </div>
        <div className="card">
          <h2>Pasabay Request</h2>
          <p>Total Pasabay Request: {pasabayRequests.length}</p>
          <p>To be Verified: {pasabayRequestCounts['To be Verified']}</p>
          <p>Total Verified: {pasabayRequestCounts['Verified']}</p>
          <Link to="/admin/prequest">Manage Pasabay Request</Link>
        </div>
        <div className="card">
          <h2>User Content</h2>
          <p>TotalUser Content: {userContent.length}</p>
          <p>To be Verified: {userContentCounts['To be Verified']}</p>
          <p>Total Verified: {userContentCounts['Verified']}</p>
          <Link to="/admin/user-content">Manage User Content</Link>
        </div>
      </div>

      <div className="table-container">
      <h1>Pasabay Request</h1>
      <h1>User Content</h1>
        <table>
          {/* Table for Pasabay Requests */}
          <thead>
            <tr>
              <th>Description</th>
              <th>Customer ID</th>
              <th>Date</th>
              <th>Product Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pasabayRequests.map(request => (
              <tr key={request.id}>
                <td>{request.description}</td>
                <td>{request.customer_id}</td>
                <td>{request.date}</td>
                <td>{request.product_name}</td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
       
        <table>
          {/* Table for User Content */}
          <thead>
            <tr>
              <th>Description</th>
              <th>Customer ID</th>
              <th>Date</th>
              <th>Product Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userContent.map(content => (
              <tr key={content.id}>
                <td>{content.description}</td>
                <td>{content.customer_id}</td>
                <td>{content.date}</td>
                <td>{content.product_name}</td>
                <td>{content.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminView;
