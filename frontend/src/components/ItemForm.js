import React, { useState, useEffect } from 'react';

const ItemForm = () => {
  const [formData, setFormData] = useState({
    item_name: '',
    price: '',
    image: '',
    quantity: 0,
    description: '',
    supplierID: '',
    category: '',
  });
  const [availableItems, setAvailableItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAvailableItems();
    fetchCategories();
  }, []);

  const fetchAvailableItems = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/items');
      if (response.ok) {
        const data = await response.json();
        setAvailableItems(data);
      } else {
        console.error('Failed to fetch available items:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch available items:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Failed to fetch categories:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

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
        console.log('Item added successfully!');
        window.location.reload();
      } else {
        // Handle error
        console.error('Error creating item:', response.status);
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div className='item-list-container'>
      <h2>Add Items</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <label className="form-label">Select Item:</label>
        <select className="form-input" name="item_name" value={formData.item_name} onChange={handleChange} required>
          <option value="">Select an item</option>
          {availableItems.map((item) => (
            <option key={item.id} value={item.name}>{item.name}</option>
          ))}
        </select>

        <label className="form-label">Category:</label>
        <select className="form-input" name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>

        <label className="form-label">Price:</label>
        <input type="text" className="form-input" name="price" value={formData.price} onChange={handleChange} required />

        <label className="form-label">Quantity:</label>
        <input type="number" className="form-input" name="quantity" value={formData.quantity} onChange={handleChange} />


        <button type="submit" className="form-button">Add Item</button>
      </form>
    </div>
  );
};

export default ItemForm;
