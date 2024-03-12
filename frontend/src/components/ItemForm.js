// ItemForm.js
import React, { useState } from 'react';

const ItemForm = () => {
  const [formData, setFormData] = useState({
    item_name: '',
    price: '',
    image: '',
    quantity: 0,
    description: '',
    supplierID: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Item added successfully
        // You can add a callback function to handle success or navigate to a different page
        handleSuccessCallback(response);
        window.location.reload();
      } else {
        // Handle error
        console.error('Error creating item:', response.status);
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };
  const handleSuccessCallback = (response) => {
    // Your success handling logic here
    console.log('Item added successfully!');
    // Optionally, you can navigate to a different page
    // navigate('/success-page');
  };

  return (
    <div className='item-list-container'>
      <h2>Add Items</h2>
       <form class="form-container" onSubmit={handleSubmit}>
        <label class="form-label">Name:</label>
        <input type="text" class="form-input" name="item_name" value={formData.item_name} onChange={handleChange} required />

        <label class="form-label">Price:</label>
        <input type="text" class="form-input" name="price" value={formData.price} onChange={handleChange} required />

        <label class="form-label">Image URL:</label>
        <input type="text" class="form-input" name="image" value={formData.image} onChange={handleChange} required />

        <label class="form-label">Quantity:</label>
        <input type="number" class="form-input" name="quantity" value={formData.quantity} onChange={handleChange} />

        <label class="form-label">Description:</label>
        <textarea class="form-textarea" name="description" value={formData.description} onChange={handleChange}></textarea>

        <button type="submit" class="form-button">Add Item</button>
      </form>
    </div>
   

  );
};

export default ItemForm;
