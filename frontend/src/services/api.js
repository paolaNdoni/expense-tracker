import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Categories
export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

export const createCategory = async (name) => {
  const response = await axios.post(`${API_URL}/categories`, { name });
  return response.data;
};

// Expenses
export const getExpenses = async () => {
  const response = await axios.get(`${API_URL}/expenses`);
  return response.data;
};

export const createExpense = async (expenseData) => {
  const response = await axios.post(`${API_URL}/expenses`, expenseData);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await axios.delete(`${API_URL}/expenses/${id}`);
  return response.data;
};