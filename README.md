# Scrapingdog MERN Challenge

Thank you for applying to the MERN Stack Developer role at **Scrapingdog**.

This challenge includes **3 short tasks** to evaluate your backend, scraping, and system design skills.

---

## 🧩 Task 1 — Credit-Based API Endpoint
**Goal:** Test Node.js + Express + Mongo fundamentals.

**Requirements:**
- Create a simple `POST /api/scrape` endpoint.
- Accept body: `{ "url": "https://books.toscrape.com" }`.
- Fetch the HTML using `axios` or `node-fetch` and return the `<title>` tag.
- Maintain a MongoDB collection `users` with `{ apiKey, credits }`.
- Decrease credits **only if** the request succeeds (`status = 200`).
- Return remaining credits in response.
- If no credits left → return `402 {error:"Out of credits"}`.

---

## 🧩 Task 2 — Scrape With Playwright and Return Structured Data
**Goal:** Verify web-scraping & DOM extraction.

**Requirements:**
- Use **Playwright** (Chromium) to visit `https://quotes.toscrape.com/js/`.
- Extract `{ text, author, tags[] }` for the first 5 quotes.
- Return JSON array.
- Add a 20 s timeout and graceful browser close (no zombie processes).

---

## 🧩 Task 3 — Mini Queue System
**Goal:** Test architecture sense + Redis/job-processing familiarity.

**Requirements:**
- Use **BullMQ** (or plain JS queue) with Redis or in-memory fallback.
- Create an endpoint `POST /jobs` that queues URLs for scraping (use Task 2 logic).
- Create `GET /jobs/:id` → show `{status, result?, error?}`.
- Limit concurrency to 3 workers max.
- Each job deducts 1 credit on success.

---

## ✅ Submission Rules
- Complete all 3 tasks within **24 hours**.
- Push to a **private GitHub repo** and invite:
  - `github.com/Darshan972`
- Include:
  - `README.md` with setup + curl examples
  - `.env.example` file
  - All code runnable via `npm start`

---

## 🧮 Evaluation Criteria (30 points)
| Area | Points | Description |
|------|---------|--------------|
| API & Mongo logic | 10 | Clean structure, correct responses |
| Scraping logic | 10 | Accuracy, cleanup, selectors |
| Queue + Credit system | 10 | Reliable, clear flow |

---

**Good luck!**
