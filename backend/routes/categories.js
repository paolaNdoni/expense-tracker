const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    return res.status(200).json({ ok: true, data: categories });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ ok: false, error: 'Category name is required' });
  }

  try {
    const category = new Category({ name });
    await category.save();
    return res.status(201).json({ ok: true, data: category });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
});

module.exports = router;