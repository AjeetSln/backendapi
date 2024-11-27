const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  campaignName: { type: String, required: true },
  type: { type: String, enum: ['Inbound', 'Outbound'], required: true },
  phoneNumber: { type: String, required: true },
  status: { type: String, enum: ['Running', 'Paused', 'Completed'], required: true },
  agents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agent' }],
});

module.exports = mongoose.model('Campaign', campaignSchema);
