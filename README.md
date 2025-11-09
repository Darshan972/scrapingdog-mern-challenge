# Scrapingdog MERN Challenge

Thank you for applying to the MERN Stack Developer role at **Scrapingdog**.

This challenge includes **3 short tasks** to evaluate your backend, scraping, and data processing skills.  
All 3 tasks are warm‑ups designed to test your fundamentals.

---

## 🧩 Task 1 — Credit‑Based API Endpoint (Warm‑up)
**Goal:** Test Node.js + Express + Mongo fundamentals.

**Requirements:**
- Create a simple `POST /api/scrape` endpoint.
- Accept body: `{ "url": "https://books.toscrape.com" }`.
- Fetch the HTML using `axios`/`node-fetch` and return the `<title>` tag.
- Maintain a MongoDB collection `users` with `{ apiKey, credits }`.
- Decrease credits **only if** the request succeeds (`status = 200`).
- Return remaining credits in response.
- If no credits left → return `402 {error:"Out of credits"}`.

---

## 🧩 Task 2 — Playwright Scrape → Structured JSON (Warm‑up)
**Goal:** Verify web‑scraping & DOM extraction.

**Requirements:**
- Use **Playwright** (Chromium) to visit `https://quotes.toscrape.com/js/`.
- Extract the first **5** quotes as: `{ text, author, tags[] }`.
- Return JSON array.
- Add a **20s** timeout and **graceful** browser close (no zombie processes).

---

## 🧩 Task 3 — Batch Scrape with Aggregation (Warm‑up)
**Goal:** Test array handling, parallel requests, and MongoDB aggregation.

**Requirements:**
- Create a `POST /api/batch-scrape` endpoint.
- Accept body: `{ "urls": ["https://books.toscrape.com", "https://quotes.toscrape.com"] }` (max 5 URLs).
- Fetch the `<title>` from each URL in parallel using `Promise.all`.
- Save each result to MongoDB collection `scrapes` with `{ url, title, scrapedAt, apiKey }`.
- Deduct **1 credit per successful fetch** (status 200 only).
- Return `{ results: [{url, title, success}], creditsUsed, creditsRemaining }`.
- Create a `GET /api/stats` endpoint that returns aggregated stats:
  - Total scrapes count
  - Scrapes per domain (group by domain from URL)
  - Most scraped URL

---

## ✅ Submission Rules
- Complete all 3 tasks within **24 hours**.
- Push to a **private GitHub repo** and invite:
  - `manthan@scrapingdog.com`
  - `divanshu@scrapingdog.com`
- Include:
  - `README.md` with setup + curl examples
  - `.env.example` file
  - All code runnable via `npm start`

---

## 🧮 Evaluation Criteria (30 points)
| Area | Points | Description |
|------|--------|-------------|
| API & Mongo logic | 10 | Clean structure, correct responses |
| Scraping logic | 10 | Accuracy, cleanup, selectors |
| Batch processing + Aggregation (Task 3) | 10 | Parallel execution, stats calculation, error handling |

---

### Quick Start (Starter Included)
```bash
cp .env.example .env
npm i
npm start
```

### Example cURL Commands
```bash
# Task 1 - Scrape title
curl -X POST http://localhost:3000/api/scrape \
  -H "Content-Type: application/json" \
  -H "x-api-key: demo-key" \
  -d '{"url":"https://books.toscrape.com"}'

# Task 2 - Get quotes
curl http://localhost:3000/api/quotes

# Task 3 - Batch scrape
curl -X POST http://localhost:3000/api/batch-scrape \
  -H "Content-Type: application/json" \
  -H "x-api-key: demo-key" \
  -d '{"urls":["https://books.toscrape.com","https://quotes.toscrape.com"]}'

# Task 3 - Get stats
curl http://localhost:3000/api/stats
```

This repo includes a **starter `server.js`** with Express, Mongo connect, and route placeholders.  
You can restructure files as you like.

**Good luck!**
