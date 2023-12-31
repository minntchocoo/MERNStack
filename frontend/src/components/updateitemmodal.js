// UpdateItemModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../static/admin.css';

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
      setUpdatedImageUrl(initialData.image || '');
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

  const customStyles = {
    content: {
      width: '50%', // Adjust the width as needed
      margin: 'auto', // Center the modal horizontally
      textAlign: 'center', // Fix: Enclose property name in quotes
    },
  };



  return (
    <Modal
      class="custom-modal"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Update Item Modal"
      style={customStyles}
    >
      <h2 class="modal-title">Update Item</h2>
      <label htmlFor="updatedName" class="modal-label">Name:</label>
      <input
        type="text"
        id="updatedName"
        class="modal-input"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
      />
      <br></br>
      <label htmlFor="updatedPrice" class="modal-label">Price:</label>
      <input
        type="text"
        id="updatedPrice"
        class="modal-input"
        value={updatedPrice}
        onChange={(e) => setUpdatedPrice(e.target.value)}
      />
    
      <label htmlFor="updatedQuantity" class="modal-label">Quantity:</label>
      <input
        type="text"
        id="updatedQuantity"
        class="modal-input"
        value={updatedQuantity}
        onChange={(e) => setUpdatedQuantity(e.target.value)}
      />
      
      <br></br>
      <label htmlFor="updatedDescription" class="modal-label">Description:</label>
      <textarea
        id="updatedDescription"
        class="modal-input"
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
      />
      
      <br></br>
      <label htmlFor="updatedImageUrl" class="modal-label">Image URL:</label>
      <input
        type="text"
        id="updatedImageUrl"
        class="modal-input"
        value={updatedImageUrl}
        onChange={(e) => setUpdatedImageUrl(e.target.value)}
      />

      
      <br></br>
      <button class="modal-btn" onClick={handleUpdate}>Update Item</button>
      <button id='dbutton' class="modal-btn" onClick={onClose}>Cancel</button>
    </Modal>

  );
};

export default UpdateItemModal;
