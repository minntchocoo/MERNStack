import React from 'react';
import '../../static/supplier.css';
import SupplierTable from './supplierItem';

const SupplierViewTable = () => {
    return (
        <div className="main">
            <div className="supplier-content">

               <SupplierTable />
            </div>
        </div>
    );
};

export default SupplierViewTable;
