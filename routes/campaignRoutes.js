const express = require('express');
const Campaign = require('../models/campaign');
const router = express.Router();

// Create a campaign
router.post('/', async (req, res) => {
  try {
    const campaign = await Campaign.create(req.body);
    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all campaigns with pagination
router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const campaigns = await Campaign.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await Campaign.countDocuments();
    res.json({ campaigns, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a campaign
router.put('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a campaign
router.delete('/:id', async (req, res) => {
  try {
    await Campaign.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
