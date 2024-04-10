import React from 'react';
import '../../static/supplier.css';
import NavbarS from '../../components/Navbar-S';

import AddInventoryForm from './AddInventoryForm';
import ManageSupplierItemTable from './ManageSupplierItem';

const ManageSupplierItems = () => {
  return (
    <div>
      <NavbarS />
      
      <div className="manage-inventory-content">
      <ManageSupplierItemTable />
      <AddInventoryForm />
      </div>
      {/* Add supplier-specific content here */}
    </div>
  );
};

export default ManageSupplierItems;
