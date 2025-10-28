import React, { useState, useEffect } from 'react';
import './App.css';
import AddCategory from './components/AddCategory';
import CategoryList from './components/CategoryList';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import * as api from './services/api';

function App() {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [alert, setAlert] = useState(null);
  const [budgetLimit] = useState(1000);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [categoriesRes, expensesRes] = await Promise.all([
        api.getCategories(),
        api.getExpenses()
      ]);
      
      if (categoriesRes.ok) setCategories(categoriesRes.data);
      if (expensesRes.ok) setExpenses(expensesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleAddCategory = async (name) => {
    try {
      const result = await api.createCategory(name);
      if (result.ok) {
        setCategories([result.data, ...categories]);
        showAlert('Category added successfully!', 'success');
      }
    } catch (error) {
      showAlert('Failed to add category', 'error');
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const result = await api.createExpense(expenseData);
      if (result.ok) {
        setExpenses([result.data, ...expenses]);
        
        if (result.budgetExceeded) {
          const message = result.emailSent 
            ? 'Budget exceeded! Email alert sent.'
            : 'Budget exceeded!';
          showAlert(message, 'warning');
        } else {
          showAlert('Expense added successfully!', 'success');
        }
      }
    } catch (error) {
      showAlert('Failed to add expense', 'error');
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      const result = await api.deleteExpense(id);
      if (result.ok) {
        setExpenses(expenses.filter(exp => exp._id !== id));
        showAlert('Expense deleted', 'success');
      }
    } catch (error) {
      showAlert('Failed to delete expense', 'error');
    }
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const isOverBudget = totalExpenses > budgetLimit;

  return (
    <div className="App">
      <header>
        <h1>Expense Tracker</h1>
        {isOverBudget && (
          <div className="budget-warning">
            Over budget by ${(totalExpenses - budgetLimit).toFixed(2)}
          </div>
        )}
      </header>

      {alert && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}

      <div className="container">
        <div className="sidebar">
          <AddCategory onCategoryAdded={handleAddCategory} />
          <CategoryList categories={categories} />
        </div>

        <div className="main-content">
          <AddExpense 
            categories={categories} 
            onExpenseAdded={handleAddExpense} 
          />
          <ExpenseList 
            expenses={expenses} 
            onDelete={handleDeleteExpense}
            total={totalExpenses}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
