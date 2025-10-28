const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const { sendBudgetAlert } = require('../services/emailService');

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().populate('categoryId').sort({ createdAt: -1 });
    return res.status(200).json({ ok: true, data: expenses });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
});

// Create a new expense
router.post('/', async (req, res) => {
  const { categoryId, amount, description } = req.body;

  if (!categoryId || !amount || !description) {
    return res.status(400).json({ ok: false, error: 'All fields are required' });
  }

  if (amount <= 0) {
    return res.status(400).json({ ok: false, error: 'Amount must be positive' });
  }

  try {
    const expense = new Expense({ categoryId, amount, description });
    await expense.save();

    const expenses = await Expense.find();
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const budgetLimit = parseFloat(process.env.BUDGET_LIMIT) || 1000;

    let emailSent = false;
    if (totalExpenses > budgetLimit) {
      const result = await sendBudgetAlert(totalExpenses);
      emailSent = result.success;
    }

    const populatedExpense = await Expense.findById(expense._id).populate('categoryId');
    return res.status(201).json({ 
      ok: true, 
      data: populatedExpense,
      budgetExceeded: totalExpenses > budgetLimit,
      emailSent
    });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByIdAndDelete(id);
    
    if (!expense) {
      return res.status(404).json({ ok: false, error: 'Expense not found' });
    }

    return res.status(200).json({ ok: true, data: expense });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
});

module.exports = router;