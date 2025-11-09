// Minimal starter for candidates
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/scrapingdog';

// --- Mongo models (simple) ---
const userSchema = new mongoose.Schema({
  apiKey: { type: String, unique: true },
  credits: { type: Number, default: 10 }
}, { timestamps: true });

const scrapeSchema = new mongoose.Schema({
  url: String,
  title: String,
  scrapedAt: Date,
  apiKey: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Scrape = mongoose.model('Scrape', scrapeSchema);

// --- helpers ---
const withApiKey = async (req, res, next) => {
  const key = req.header('x-api-key') || 'demo-key';
  req.user = await User.findOneAndUpdate(
    { apiKey: key },
    { $setOnInsert: { credits: 10 } },
    { upsert: true, new: true }
  );
  next();
};

// --- Task 1 placeholder ---
app.post('/api/scrape', withApiKey, async (req, res) => {
  // TODO: implement title fetch + credit deduction on success only
  res.json({ ok: true, note: 'Implement Task 1 here' });
});

// --- Task 2 placeholder ---
app.get('/api/quotes', async (req, res) => {
  // TODO: implement Playwright scraper to fetch 5 quotes
  res.json({ ok: true, note: 'Implement Task 2 here' });
});

// --- Task 3 placeholders ---
app.post('/api/batch-scrape', withApiKey, async (req, res) => {
  // TODO: fetch titles from multiple URLs in parallel, save to DB, deduct credits
  res.json({ ok: true, note: 'Implement batch scrape here' });
});

app.get('/api/stats', async (req, res) => {
  // TODO: aggregate scrape stats from MongoDB
  res.json({ ok: true, note: 'Return aggregated stats' });
});

// --- boot ---
(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => console.log(`Challenge server on :${PORT}`));
  } catch (err) {
    console.error('Boot error', err);
    process.exit(1);
  }
})();
