import React from 'react';
import '../../static/supplier.css';

const ManageSupplierItemTable = () => {
    return (
        <div className="table-content">
            <h2>Supplier Items</h2>
            <table className="supplier-items-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th> {/* New column for buttons */}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Item 1</td>
                        <td>10</td>
                        <td>$10</td>
                        <td>
                            <button>Archive</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Item 2</td>
                        <td>5</td>
                        <td>$20</td>
                        <td>
                            <button>Archive</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ManageSupplierItemTable;
