import React, { useState } from 'react';

const AddExpense = ({ categories, onExpenseAdded }) => {
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryId || !amount || !description) return;

    setLoading(true);
    await onExpenseAdded({ categoryId, amount: parseFloat(amount), description });
    setCategoryId('');
    setAmount('');
    setDescription('');
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={loading || categories.length === 0}
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        
        <input
          type="number"
          placeholder="Amount"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
        />
        
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
        
        <button type="submit" disabled={loading || categories.length === 0}>
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;