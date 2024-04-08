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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

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

  // Function to handle form submission for creating a new account
  const handleCreateAccount = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const role = formData.get('role');
    setSelectedRole(role);
    setIsModalOpen(false); // Close the first modal
    setIsSecondModalOpen(true); // Open the second modal
    // Additional logic for creating account based on role can be added here
  };

  const handleSupplierFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAccount = {
      id: accounts.length + 1,
      username: formData.get('username'),
      email: formData.get('email'),
      role: 'supplier',
      status: 'Pending',
      companyName: formData.get('companyName'),
      licenseNumber: formData.get('licenseNumber'),
    };
    setAccounts([...accounts, newAccount]);
    setIsSecondModalOpen(false);
  };
  
  const handleVerifierFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAccount = {
      id: accounts.length + 1,
      username: formData.get('username'),
      email: formData.get('email'),
      role: 'verifier',
      status: 'Pending',
      agencyName: formData.get('agencyName'),
      licenseNumber: formData.get('licenseNumber'),
    };
    setAccounts([...accounts, newAccount]);
    setIsSecondModalOpen(false);
  };
  

  return (
    <div>
      <NavbarA />
      <div className="content-container">
        <h1 className='content-title'>Manage Accounts</h1>
        <div className="filter-buttons">
          <button onClick={() => filterAccounts('all')} className={filter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => filterAccounts('Pending')} className={filter === 'Pending' ? 'active' : ''}>Pending</button>
          <button onClick={() => filterAccounts('Approved')} className={filter === 'Approved' ? 'active' : ''}>Approved</button>
          <button onClick={() => setIsModalOpen(true)}>Create Account</button>
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
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
              <h2>Create Account</h2>
              <form onSubmit={handleCreateAccount}>
                <label>Username:</label>
                <input type="text" name="username" required />
                <label>Email:</label>
                <input type="email" name="email" required />
                <label>Password:</label>
                <input type="password" name="password" required />
                <label>Role:</label>
                <select name="role" required>
                  <option value="supplier">Supplier</option>
                  <option value="verifier">Verifier</option>
                </select>
                <button type="submit">Create Account</button>
                <button type="button" onClick={() => setIsModalOpen(false)}>Quit</button>
              </form>
            </div>
          </div>
        )}
        {isSecondModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsSecondModalOpen(false)}>&times;</span>
              <h2>Create Account as {selectedRole}</h2>
              {selectedRole === 'supplier' && (
                <form onSubmit={handleSupplierFormSubmit}>
                  {/* Supplier form fields */}
                  <label>Company Name:</label>
                  <input type="text" name="companyName" required />
                  <label>Business License Number:</label>
                  <input type="text" name="licenseNumber" required />
                  <button type="submit">Create Account</button>
                </form>
              )}
              {selectedRole === 'verifier' && (
                <form onSubmit={handleVerifierFormSubmit}>
                  {/* Verifier form fields */}
                  <label>Verification Agency:</label>
                  <input type="text" name="agencyName" required />
                  <label>License Number:</label>
                  <input type="text" name="licenseNumber" required />
                  <button type="submit">Create Account</button>
                </form>
              )}
              <button onClick={() => setIsSecondModalOpen(false)}>Cancel</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AccountView;
