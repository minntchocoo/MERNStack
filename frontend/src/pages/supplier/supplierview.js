import React from 'react';
import '../../static/supplier.css';
import NavbarS from '../../components/Navbar-S';
import SupplierViewTable from './supplier-view-table';


const SupplierView = () => {
  return (
    <div>
      <NavbarS />
      
      <div className="dashboard-content">
        <h1>Supplier View</h1>
        <p>Welcome to the Supplier Dashboard!</p>
        <SupplierViewTable />
      </div>
      {/* Add supplier-specific content here */}
    </div>
  );
};

export default SupplierView;
