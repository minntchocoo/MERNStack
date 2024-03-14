import React, { useState, useEffect } from 'react';
import NavbarA from '../../components/Navbar-A';

const sampleRequests = [
  {
    id: 1,
    description: 'Content 1 description',
    customer_id: 101,
    date: '2024-03-15',
    title: 'Title 1',
    image: 'https://example.com/image1.jpg',
    status: 'Pending',
  },
  {
    id: 2,
    description: 'Content 2 description',
    customer_id: 102,
    date: '2024-03-16',
    title: 'Title 2',
    image: 'https://example.com/image2.jpg',
    status: 'Approved',
  },
  // Add more sample userContent as needed
];

const UserContentView = () => {
  const [userContent, setRequests] = useState(sampleRequests);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved'

  useEffect(() => {
    // Initially set filtered userContent to all userContent
    setFilteredRequests(userContent);
  }, [userContent]);

  // Function to handle action button click
  const handleActionClick = (id) => {
    // Handle action button click
    console.log(`Action button clicked for userContent with id: ${id}`);
  };

  // Function to filter userContent based on status
  const filterRequests = (status) => {
    if (status === 'all') {
      setFilteredRequests(userContent);
    } else {
      const filtered = userContent.filter((userContent) => userContent.status === status);
      setFilteredRequests(filtered);
    }
    setFilter(status);
  };

  return (
    <div>
      <NavbarA />
      <div className="content-container">
        <h1 className='content-title'>Manage User Content</h1>
        <div className="filter-buttons">
          <button onClick={() => filterRequests('all')} className={filter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => filterRequests('Pending')} className={filter === 'Pending' ? 'active' : ''}>Pending</button>
          <button onClick={() => filterRequests('Approved')} className={filter === 'Approved' ? 'active' : ''}>Approved</button>
        </div>
        <div className="userContent-list-container">
          {filteredRequests.map((userContent) => (
            <div key={userContent.id} className="userContent-card">
              <img src={userContent.image} alt="Product" className="userContent-card-image" />
              <div className="userContent-card-content">
                <h3>{userContent.title}</h3>
                <p>{userContent.description}</p>
                <p>Status: {userContent.status}</p>
                <div className="userContent-card-actions">
                  <button className="userContent-list-verify-btn" onClick={() => handleActionClick(userContent.id)}>Verify</button>
                  <button className="userContent-list-deny-btn" onClick={() => handleActionClick(userContent.id)}>Deny</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserContentView;
