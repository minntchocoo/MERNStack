// ManageCategoryPage.js
import React, { useState } from 'react';
import CategoryList from './categoryList';
import CategoryForm from './categoryForm';
import NavbarA from '../../components/Navbar-A';



const ManageCategoryPage = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    // Add more categories as needed
  ]);
  const handleUpdate = (categoryId) => {
    // Handle update logic here
    console.log('Update category with id:', categoryId);
  };

  const handleDelete = (categoryId) => {
    // Handle delete logic here
    console.log('Delete category with id:', categoryId);
  };

  const addCategory = (newCategory) => {
    setCategories([...categories, { id: categories.length + 1, ...newCategory }]);
  };

  return (
    <div>
      <NavbarA />
      <div style={{ display: 'flex', margin: '20px' }}>
        <h1>Manage Categories</h1>
      </div>
      <div style={{ display: 'flex',  margin: '20px' }}>
        <div style={{ flex: '0 0 48%' }}>
          <CategoryList
            categories={categories}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        </div>
        <div style={{ flex: '0 0 48%', marginLeft: '20px' }}>
          <CategoryForm onSubmit={addCategory} />
        </div>
      </div>
    </div>
  );
};

export default ManageCategoryPage;
