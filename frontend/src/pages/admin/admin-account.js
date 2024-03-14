import React, { useState, useEffect } from 'react';
import NavbarA from '../../components/Navbar-A';

const sampleAccounts = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@example.com',
    role: 'customer',
    status: 'Pending',
  },
  {
    id: 2,
    username: 'user2',
    email: 'user2@example.com',
    role: 'customer',
    status: 'Approved',
  },
  // Add more sample accounts as needed
];

const AccountView = () => {
  const [accounts, setAccounts] = useState(sampleAccounts);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved'

  useEffect(() => {
    // Initially set filtered accounts to all accounts
    setFilteredAccounts(accounts);
  }, [accounts]);

  // Function to handle action button click
  const handleActionClick = (id, action) => {
    if (action === 'Verify') {
      const updatedAccounts = accounts.map((account) =>
        account.id === id ? { ...account, status: 'Approved' } : account
      );
      setAccounts(updatedAccounts);
    } else if (action === 'Delete') {
      const updatedAccounts = accounts.filter((account) => account.id !== id);
      setAccounts(updatedAccounts);
    }
  };

  // Function to filter accounts based on status
  const filterAccounts = (status) => {
    if (status === 'all') {
      setFilteredAccounts(accounts);
    } else {
      const filtered = accounts.filter((account) => account.status === status);
      setFilteredAccounts(filtered);
    }
    setFilter(status);
  };

  return (
    <div>
      <NavbarA/>
      <div className="content-container">
        <h1 className='content-title'>Manage Accounts</h1>
        <div className="filter-buttons">
          <button onClick={() => filterAccounts('all')} className={filter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => filterAccounts('Pending')} className={filter === 'Pending' ? 'active' : ''}>Pending</button>
          <button onClick={() => filterAccounts('Approved')} className={filter === 'Approved' ? 'active' : ''}>Approved</button>
        </div>
        <div className="account-list-container">
          {filteredAccounts.map((account) => (
            <div key={account.id} className="account-card">
              <div className="account-card-content">
                <h3>{account.username}</h3>
                <p>{account.email}</p>
                <p>Role: {account.role}</p>
                <p>Status: {account.status}</p>
                <div className="account-card-actions">
                  <button className="account-list-verify-btn" onClick={() => handleActionClick(account.id, 'Verify')}>Verify</button>
                  <button className="account-list-delete-btn" onClick={() => handleActionClick(account.id, 'Delete')}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountView;