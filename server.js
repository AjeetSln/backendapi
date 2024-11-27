const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const agentRoutes = require('./routes/agentRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const campaignResultRoutes = require('./routes/campaignResultRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/agents', agentRoutes);
app.use('/campaigns', campaignRoutes);
app.use('/campaignResults', campaignResultRoutes);

// Database Connection
mongoose
  .connect('mongodb://localhost:27017/campaign_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
