const mongoose = require('mongoose');

const campaignResultSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  phone: { type: String, required: true },
  cost: { type: Number, required: true },
  outcome: { type: String, required: true },
  callDuration: { type: Number, required: true },
  recording: { type: String },
  summary: { type: String },
  transcription: { type: String },
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
});

module.exports = mongoose.model('CampaignResult', campaignResultSchema);
