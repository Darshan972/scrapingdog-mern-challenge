# Scrapingdog MERN Challenge

Thank you for applying to the MERN Stack Developer role at **Scrapingdog**.

This challenge includes **3 short tasks** to evaluate your backend, scraping, and system design skills.  
Tasks 1 & 2 are warm‑ups. **Task 3 is intentionally a bit harder** to observe your production thinking.

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

## 🧩 Task 3 — Mini Queue v2 (Harder)
**Goal:** Show reliability thinking (retries, dedupe, concurrency caps, credit safety).

**What to build:**
- **Queue:** Use **BullMQ** (preferred) with Redis (in‑memory fallback acceptable).
- **Endpoints**
  1. `POST /jobs` → body: `{ url, js: boolean }` (reuse Task 2’s scraper).
     - **Idempotency key** header `Idempotency-Key` (string). If the same key + same `url` arrives within **60s**, return the existing job instead of enqueuing a duplicate.
  2. `GET /jobs/:id` → `{ status: queued|running|done|failed, attempts, result?, error?, startedAt?, finishedAt? }`
  3. `DELETE /jobs/:id` → cancel if still queued or running (best‑effort). Return `{ cancelled: true|false }`.
- **Reliability**
  - **Exponential backoff** retries: `3` attempts at ~`1s`, `3s`, `7s`.
  - **Global concurrency cap**: at most **3** Playwright browsers at once using a **Redis semaphore** (or equivalent). Extra jobs wait in the queue.
  - **Per‑job timeout**: **20s** hard limit. Ensure `try/finally` closes browser/context even on timeouts/cancels.
  - **Dedupe by URL**: if the same `url` is enqueued again within **60s**, respond with the existing `jobId` (even without an idempotency key).
- **Credits**
  - Each job deducts **1 credit on success only** (`status=done` and `result` non‑empty).
  - No deduction on `failed`, `timeout`, or `cancelled`.
- **Observability**
  - `GET /healthz` → `{ redis: "ok|down", queueDepth, running }`.
  - Log job lifecycle with a `requestId` and `apiKey` (fake the key if you prefer).

**What we’ll look for:**
- Clean separation: HTTP layer, queue/worker, scraper, credit service.
- Correct idempotency + dedupe behavior.
- Proper use of `finally` to close pages/contexts/browsers.
- Concurrency cap truly enforced (no >3 browsers at once).

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
| Queue + Credit system (Task 3) | 10 | Idempotency, dedupe, cap, retries |

---

### Quick Start (Starter Included)
```bash
cp .env.example .env
npm i
npm start
```
This repo includes a **starter `server.js`** with Express, Mongo connect, and route placeholders.  
You can restructure files as you like.

**Good luck!**
