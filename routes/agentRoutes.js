const express = require('express');
const Agent = require('../models/agent');
const router = express.Router();

// Create an agent
router.post('/', async (req, res) => {
  try {
    const agent = await Agent.create(req.body);
    res.status(201).json(agent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all agents with pagination
router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const agents = await Agent.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await Agent.countDocuments();
    res.json({ agents, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an agent
router.put('/:id', async (req, res) => {
  try {
    const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(agent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an agent
router.delete('/:id', async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
