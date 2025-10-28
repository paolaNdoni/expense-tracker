import React, { useState } from 'react';

const AddCategory = ({ onCategoryAdded }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    await onCategoryAdded(name);
    setName('');
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category name (e.g., Food, Transport)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Category'}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;