const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


// NOTE: In production (Netlify), backend API logic is handled by Netlify serverless functions in netlify/functions/search.js
// All hero/fictional data and endpoints removed.
// For local development, you may implement a proxy or mock here if needed.

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/heroes', (req, res) => {
  res.json([]);
});

app.get('/api/search', async (req, res) => {
  const { type, account } = req.query;
  const apiKey = process.env.HEROIC_API_KEY;

  if (!type || !account) {
    return res.status(400).json({ error: 'Missing required parameters: type and account' });
  }
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing HEROIC_API_KEY environment variable' });
  }

  const url = `https://api.heroic.com/v7/breach-search?type=${encodeURIComponent(type)}&account=${encodeURIComponent(account)}`;

  try {
    const response = await fetch(url, {
      headers: { 'x-api-key': apiKey }
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from HEROIC API', details: err.message });
  }
});

app.get('/api/classes', (req, res) => {
  res.json([]);
});

app.listen(PORT, () => {
  console.log(`Heroic Search Tool running on http://localhost:${PORT}`);
});