// UpdateItemModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const UpdateItemModal = ({ isOpen, onClose, onUpdate, initialData }) => {
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedQuantity, setUpdatedQuantity] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedImageUrl, setUpdatedImageUrl] = useState('');

  useEffect(() => {
    // Set initial data when modal opens
    if (initialData) {
      setUpdatedName(initialData.name || '');
      setUpdatedPrice(initialData.price || '');
      setUpdatedQuantity(initialData.quantity || '');
      setUpdatedDescription(initialData.description || '');
      setUpdatedImageUrl(initialData.imageUrl || '');
    }
  }, [initialData]);

  const handleUpdate = () => {
    // Implement your update logic and call onUpdate with the updated data
    const updatedData = {
      name: updatedName,
      price: updatedPrice,
      quantity: updatedQuantity,
      description: updatedDescription,
      imageUrl: updatedImageUrl,
    };

    onUpdate(updatedData);

    // Reset form values
    setUpdatedName('');
    setUpdatedPrice('');
    setUpdatedQuantity('');
    setUpdatedDescription('');
    setUpdatedImageUrl('');

    // Close the modal
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Update Item Modal"
    >
      <h2>Update Item</h2>
      <label htmlFor="updatedName">Name:</label>
      <input
        type="text"
        id="updatedName"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
      />
      <label htmlFor="updatedPrice">Price:</label>
      <input
        type="text"
        id="updatedPrice"
        value={updatedPrice}
        onChange={(e) => setUpdatedPrice(e.target.value)}
      />
      <label htmlFor="updatedQuantity">Quantity:</label>
      <input
        type="text"
        id="updatedQuantity"
        value={updatedQuantity}
        onChange={(e) => setUpdatedQuantity(e.target.value)}
      />
      <label htmlFor="updatedDescription">Description:</label>
      <textarea
        id="updatedDescription"
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
      />
      <label htmlFor="updatedImageUrl">Image URL:</label>
      <input
        type="text"
        id="updatedImageUrl"
        value={updatedImageUrl}
        onChange={(e) => setUpdatedImageUrl(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Item</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
};

export default UpdateItemModal;
