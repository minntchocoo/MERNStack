import React, { useState, useEffect } from 'react';
import NavbarA from '../../components/Navbar-A';

const sampleRequests = [
  {
    id: 1,
    description: 'Request 1 description',
    customer_id: 101,
    date: '2024-03-15',
    product_name: 'Product 1',
    image: 'https://example.com/image1.jpg',
    status: 'Pending',
  },
  {
    id: 2,
    description: 'Request 2 description',
    customer_id: 102,
    date: '2024-03-16',
    product_name: 'Product 2',
    image: 'https://example.com/image2.jpg',
    status: 'Approved',
  },
  // Add more sample requests as needed
];

const PrequestView = () => {
  const [requests, setRequests] = useState(sampleRequests);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved'

  useEffect(() => {
    // Initially set filtered requests to all requests
    setFilteredRequests(requests);
  }, [requests]);

  // Function to handle action button click
  const handleActionClick = (id) => {
    // Handle action button click
    console.log(`Action button clicked for request with id: ${id}`);
  };

  // Function to filter requests based on status
  const filterRequests = (status) => {
    if (status === 'all') {
      setFilteredRequests(requests);
    } else {
      const filtered = requests.filter((request) => request.status === status);
      setFilteredRequests(filtered);
    }
    setFilter(status);
  };

  return (
    <div>
      <NavbarA />
      <div className="content-container">
        <div className="filter-buttons">
          <button onClick={() => filterRequests('all')} className={filter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => filterRequests('Pending')} className={filter === 'Pending' ? 'active' : ''}>Pending</button>
          <button onClick={() => filterRequests('Approved')} className={filter === 'Approved' ? 'active' : ''}>Approved</button>
        </div>
        <div className="request-list-container">
          {filteredRequests.map((request) => (
            <div key={request.id} className="request-card">
              <img src={request.image} alt="Product" className="request-card-image" />
              <div className="request-card-content">
                <h3>{request.product_name}</h3>
                <p>{request.description}</p>
                <p>Status: {request.status}</p>
                <div className="request-card-actions">
                  <button className="request-list-verify-btn" onClick={() => handleActionClick(request.id)}>Verify</button>
                  <button className="request-list-deny-btn" onClick={() => handleActionClick(request.id)}>Deny</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrequestView;
