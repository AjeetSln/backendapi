const express = require('express');
const CampaignResult = require('../models/campaignResult');
const Campaign = require('../models/campaign');
const router = express.Router();

// Create a campaign result
router.post('/', async (req, res) => {
  try {
    const { campaign } = req.body;

    // Check if the campaign exists
    const existingCampaign = await Campaign.findById(campaign);
    if (!existingCampaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    const campaignResult = await CampaignResult.create(req.body);
    res.status(201).json(campaignResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all campaign results with pagination
router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const campaignResults = await CampaignResult.find()
      .populate('campaign', 'campaignName type')
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await CampaignResult.countDocuments();
    res.json({
      campaignResults,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single campaign result by ID
router.get('/:id', async (req, res) => {
  try {
    const campaignResult = await CampaignResult.findById(req.params.id).populate(
      'campaign',
      'campaignName type'
    );
    if (!campaignResult) {
      return res.status(404).json({ error: 'Campaign result not found' });
    }
    res.json(campaignResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a campaign result
router.put('/:id', async (req, res) => {
  try {
    const campaignResult = await CampaignResult.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!campaignResult) {
      return res.status(404).json({ error: 'Campaign result not found' });
    }
    res.json(campaignResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a campaign result
router.delete('/:id', async (req, res) => {
  try {
    const campaignResult = await CampaignResult.findByIdAndDelete(req.params.id);
    if (!campaignResult) {
      return res.status(404).json({ error: 'Campaign result not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
