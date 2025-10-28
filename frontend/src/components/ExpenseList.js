import React from 'react';

const ExpenseList = ({ expenses, onDelete, total }) => {
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const categoryName = expense.categoryId?.name || 'Unknown';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(expense);
    return acc;
  }, {});

  return (
    <div className="card">
      <div className="expense-header">
        <h2>Expenses</h2>
        <div className="total">
          Total: <span className="total-amount">${total.toFixed(2)}</span>
        </div>
      </div>

      {expenses.length === 0 ? (
        <p className="empty">No expenses yet. Add your first expense!</p>
      ) : (
        <div>
          {Object.entries(groupedExpenses).map(([categoryName, categoryExpenses]) => {
            const categoryTotal = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
            
            return (
              <div key={categoryName} className="category-section">
                <div className="category-header">
                  <h3>{categoryName}</h3>
                  <span className="category-total">${categoryTotal.toFixed(2)}</span>
                </div>
                
                <div className="expense-list">
                  {categoryExpenses.map((expense) => (
                    <div key={expense._id} className="expense-item">
                      <div className="expense-info">
                        <div className="expense-description">{expense.description}</div>
                        <div className="expense-date">
                          {new Date(expense.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="expense-actions">
                        <span className="expense-amount">${expense.amount.toFixed(2)}</span>
                        <button 
                          className="delete-btn"
                          onClick={() => onDelete(expense._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;