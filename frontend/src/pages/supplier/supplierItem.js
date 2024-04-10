import React from 'react';
import '../../static/supplier.css';

const SupplierTable = () => {
    return (
        <div className="table-content">
            <h2>Supplier Items</h2>
                <table className="supplier-items-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Supplier</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Item 1</td>
                            <td>Supplier A</td>
                            <td>$10</td>
                        </tr>
                        <tr>
                            <td>Item 2</td>
                            <td>Supplier A</td>
                            <td>$20</td>
                        </tr>
                    </tbody>
                </table>
        </div>
    )
}

export default SupplierTable