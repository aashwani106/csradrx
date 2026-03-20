
## 1. Overview

The CSRadrX Dashboard is a real-time technology intelligence interface that presents curated, high-signal updates from across the computer science ecosystem.

It is NOT a news feed.

It is designed to answer:

* What is happening right now in tech?
* What actually matters?
* Why should developers care?

---

## 2. Core Principles

* Signal > Noise
* Scan in < 5 seconds
* Readable, not overwhelming
* Structured, not random
* Real-time feeling

---

## 3. Layout Structure

### 3.1 Top Navigation Bar

Includes:

* Logo (`CSRadrX`)
* Category Filters:
  * All
  * AI
  * GitHub
  * Infra
  * Security
  * Research
* Time Filters:
  * Last 1h
  * Last 6h
  * Last 24h
  * Last 7d

---

## 4. Main Sections

### 4.1 Trending Now (Hero Section)

Purpose:
Show the most important events ranked by the system.

Data Source:
`/dashboard/trending`

Features:

* Top 10-20 events
* Sorted by `finalScore`
* High visibility at the top of the page

Card Format:

* Source badge (`OpenAI`, `GitHub`, etc.)
* Hook (bold)
* Title (original)
* Impact (1 line)
* Timestamp (example: `2h ago`)
* Clickable link

### 4.2 AI / LLM Updates

Purpose:
Highlight AI ecosystem updates.

Data Source:
`/dashboard/ai`

Sources:

* OpenAI
* DeepMind
* Hugging Face
* Anthropic

Features:

* Filtered AI-only feed
* Same card format as trending
* High-priority positioning

### 4.3 GitHub Trends

Purpose:
Show trending open-source activity.

Data Source:
`/dashboard/github`

Card Format:

* Repo Name
* Owner
* Description
* Stars
* Language
* Hook
* Impact

Filters:

* Language (`JS`, `TS`, `Rust`, `Python`, `Go`)
* Time window

### 4.4 Security Alerts (Optional MVP+)

Purpose:
Highlight critical vulnerabilities.

Data Source:
`/dashboard/security`

Content:

* CVE ID
* Severity
* Affected packages
* Short impact explanation

### 4.5 Trend Signals (Advanced)

Purpose:
Show emerging patterns instead of individual posts.

Examples:

* AI agents gaining traction
* Rust adoption increasing
* WebGPU momentum rising

Derived From:

* frequency across sources
* GitHub activity
* research mentions

### 4.6 Big Moves Today

Purpose:
Daily summary of the most important events.

Data Source:
Derived from the ranking system.

Features:

* Top 5 events of last 24h
* Highlighted layout
* Optional expanded explanation

---

## 5. Event Card Design

Each card must contain:

* Source badge
* Hook (attention layer)
* Title (original, unchanged)
* Impact (1 line explanation)
* Timestamp
* Link

---

## 6. Filters & Controls

### 6.1 Category Filter

* All
* AI
* GitHub
* Infra
* Security
* Research

### 6.2 Time Filter

* Last 1 hour
* Last 6 hours
* Last 24 hours
* Last 7 days

### 6.3 Sorting (Future)

* Most Important (default)
* Most Recent
* Most Discussed

---

## 7. API Requirements

Endpoints:

* `GET /dashboard/trending`
* `GET /dashboard/ai`
* `GET /dashboard/github`
* `GET /dashboard/security`
* `GET /dashboard/trends`

Response format example:

```json
{
  "id": "event_id",
  "source": "openai",
  "category": "ai",
  "hook": "OpenAI just made GPT cheaper to run",
  "title": "Introducing GPT-5.4 mini and nano",
  "impact": "Adds smaller GPT variants -> reduces cost and enables edge deployment.",
  "url": "https://example.com",
  "publishedAt": "2026-03-21T10:00:00.000Z",
  "finalScore": 92.4
}
```

---

## 8. UX Requirements

* Clean spacing
* Minimal text
* Fast loading
* Mobile responsive
* Scroll-friendly layout

---

## 9. Non-Goals

* No long articles
* No raw RSS dumps
* No unfiltered feeds
* No cluttered UI

---

## 10. MVP Scope

Build only:

1. Trending Now
2. AI Updates
3. GitHub Trends
4. Category + Time Filters

---

## 11. Future Enhancements

* Personalized feed
* Bookmarks
* Notifications / alerts
* Email digest
* User preferences
* Saved filters

---

## 12. Summary

CSRadrX Dashboard is:

* Real-time
* High-signal
* Developer-focused
* Intelligence-driven
