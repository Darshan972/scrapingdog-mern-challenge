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

const jobSchema = new mongoose.Schema({
  url: String,
  js: Boolean,
  status: { type: String, enum: ['queued','running','done','failed','cancelled'], default: 'queued' },
  attempts: { type: Number, default: 0 },
  result: mongoose.Schema.Types.Mixed,
  error: mongoose.Schema.Types.Mixed,
  startedAt: Date,
  finishedAt: Date,
  idempotencyKey: String,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const JobDoc = mongoose.model('Job', jobSchema);

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
// These endpoints align with the harder specs in the README
app.post('/jobs', withApiKey, async (req, res) => {
  // TODO: enqueue with BullMQ; enforce idempotency + URL dedupe (60s)
  res.json({ ok: true, note: 'Implement enqueue here' });
});

app.get('/jobs/:id', async (req, res) => {
  // TODO: fetch job status/result
  res.json({ ok: true, note: 'Return job status' });
});

app.delete('/jobs/:id', async (req, res) => {
  // TODO: cancel if queued/running (best-effort)
  res.json({ cancelled: false, note: 'Implement cancel' });
});

app.get('/healthz', async (req, res) => {
  // TODO: report redis connectivity, queue depth, running count
  res.json({ redis: 'unknown', queueDepth: null, running: null });
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
