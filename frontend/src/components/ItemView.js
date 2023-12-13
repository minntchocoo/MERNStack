// table sa admin

import React, { useState, useEffect } from 'react';
import UpdateItemModal from './updateitemmodal';

const ItemView = () => {
  const [items, setItems] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    // Fetch items from the server when the component mounts
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/items');
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        } else {
          console.error('Error fetching items:', response.status);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  const handleUpdate = async (updatedData) => {
    // Implement update logic here
    try {
      // Update the item
      await fetch(`http://localhost:4000/api/items/${selectedItemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      // Refresh items after update
      const response = await fetch('http://localhost:4000/api/items');
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        console.error('Error fetching items after update:', response.status);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };
  

  const handleDelete = async (itemId) => {
    // Implement delete logic here
    try {
      const deleteResponse = await fetch(`http://localhost:4000/api/items/${itemId}`, {
        method: 'DELETE',
      });

      if (deleteResponse.ok) {
        setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      } else {
        console.error('Error deleting item:', deleteResponse.status);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  
  const handleUpdateModalOpen = (itemId) => {
    const selectedItem = items.find((item) => item._id === itemId);

    // Set the initial data for the modal
    setInitialData(selectedItem);

    setIsUpdateModalOpen(true);
    setSelectedItemId(itemId);
  };

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
    setSelectedItemId(null);
    setInitialData(null);
  };


  return (
    <div class="item-list-container">
      <h2>Item List</h2>
      <table class="item-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr class="item-list-row" key={item._id}>
              <td class="item-list-name">{item.name}</td>
              <td class="item-list-price">{item.price}</td>
              <td class="item-list-quantity">{item.quantity}</td>
              <td hidden>{item.image}</td>
              <td hidden>{item.description}</td>
              <td class="item-list-actions">
                <button class="item-list-update-btn" onClick={() => handleUpdateModalOpen(item._id)}>Update</button>
                <button class="item-list-delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateItemModal
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        onUpdate={handleUpdate}
        initialData={initialData}
      />
    </div>

  );
};

export default ItemView;
