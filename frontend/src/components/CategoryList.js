import React from 'react';

const CategoryList = ({ categories }) => {
  if (categories.length === 0) {
    return (
      <div className="card">
        <h2>Categories</h2>
        <p className="empty">No categories yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Categories ({categories.length})</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <div key={category._id} className="category-item">
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;