// AdminView.js
import React from 'react';
import ItemForm from '../components/ItemForm';
import ItemView from '../components/ItemView';
import NavbarA from '../components/Navbar-A';
import '../static/admin.css';

const AdminList = () => {
  return (
    <div>
      <NavbarA></NavbarA>
      <h1 id='e'>Add New Item</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: '0 0 48%' }}>
        <ItemView />
        </div>
        <div style={{ flex: '0 0 48%' }}>
          
          <ItemForm />
        </div>
      </div>
    </div>
  );
};

export default AdminList;
