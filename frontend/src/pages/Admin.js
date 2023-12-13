// AdminView.js
import React from 'react';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/itemlist';
import ItemView from '../components/ItemView';

const AdminView = () => {
  return (
    <div>
      <h1>Admin View</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: '0 0 48%' }}>
          <ItemForm />
        </div>
        <div style={{ flex: '0 0 48%' }}>
          <ItemView />
        </div>
      </div>
    </div>
  );
};

export default AdminView;
