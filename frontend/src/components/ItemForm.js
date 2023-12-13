// ItemForm.js
import React, { useState } from 'react';

const ItemForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    quantity: 0,
    description: '',
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
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />

      <label>Price:</label>
      <input type="text" name="price" value={formData.price} onChange={handleChange} required />

      <label>Image URL:</label>
      <input type="text" name="image" value={formData.image} onChange={handleChange} required />

      <label>Quantity:</label>
      <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />

      <label>Description:</label>
      <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;
