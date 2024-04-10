import React from 'react';
import '../../static/supplier.css';

const InventoryTable = () => {
    return (
        <div className="table-content">
            <h2>Inventory</h2>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Item 1</td>
                        <td>10</td>
                        <td>$10</td>
                    </tr>
                    <tr>
                        <td>Item 2</td>
                        <td>5</td>
                        <td>$20</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default InventoryTable