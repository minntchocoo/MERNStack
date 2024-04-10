import React, { useState } from 'react';
import '../../static/supplier.css';

const AddInventoryForm = ({ onAddItem }) => {
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!itemName || !quantity || !price) {
            alert('Please fill in all fields');
            return;
        }

        onAddItem({ itemName, quantity, price });
        setItemName('');
        setQuantity('');
        setPrice('');
    };

    return (
        <div className="add-form">
            <h3>Add Item</h3>
            <form onSubmit={handleSubmit}>
                <label>Item Name:</label>
                <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                />
                <label>Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default AddInventoryForm;
