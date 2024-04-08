import React from 'react';
import '../../static/categoryform.css'; // Import the CSS files

const CategoryList = ({ categories, handleUpdate, handleDelete }) => (
    <div className="table-container">
   
    <div className="category-list">
    <h2 className='h2-title'>Categories</h2>
      <table className="item-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td className="item-list-actions">
                <button className="item-list-update-btn"  onClick={() => handleUpdate(category.id)}>Update</button>
                <button className="item-list-update-btn"  onClick={() => handleDelete(category.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default CategoryList;
