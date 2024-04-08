// CategoryForm.js
import React, { useState } from 'react';
import '../../static/categoryform.css'; // Import the CSS file

const CategoryForm = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
    setName('');
  };

  return (
    <div className="modal-backdrop">
      <div className="form-container">
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <button className="item-list-update-btn"  type="submit">Add Category</button>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
