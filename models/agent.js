const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  agentName: { type: String, required: true },
  language: { type: String, required: true },
  voiceId: { type: String, required: true, unique: true },
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Agent', agentSchema);
