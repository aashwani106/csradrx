# CSRadrX

## MVP Data Sources

---

## 1. Overview

This document defines the MVP-only source set derived from the main data source specification.

The goal is to keep the MVP focused on high-signal, high-trust inputs that can produce useful updates with minimal operational complexity.

---

## 2. MVP Principles

Keep it:

* small
* high signal
* easy to operate
* easy to validate
* useful for developers from day one

---

## 3. GitHub (CORE ENGINE)

Why:

* fastest signal
* real adoption
* developers trust it

Include:

* trending repos
* new repos with high stars
* major releases

MVP signals:

* stars growth
* repo creation velocity
* release notes

Source:

* GitHub API

GitHub filtering rules:

* repos created in last 7 days
* stars > 500 OR star growth > 100/day
* exclude forks
* exclude archived repos
* language filter: JS, TS, Rust, Go, Python

---

## 4. Engineering Blogs (HIGH TRUST)

Why:

* real-world systems
* production-level insights

Include (top only):

* Cloudflare
* Stripe
* Netflix
* Uber

Source feeds:

* `https://blog.cloudflare.com/rss/`
* `https://stripe.com/blog/feed.xml`
* `https://netflixtechblog.com/feed`
* `https://eng.uber.com/feed/`

---

## 5. AI / LLM Ecosystem (MUST HAVE)

Why:

* biggest trend in CS right now
* viral potential

Include:

* OpenAI blog
* Hugging Face blog
* Anthropic updates

Source feeds:

* `https://openai.com/blog/rss.xml`
* `https://huggingface.co/blog/feed.xml`
* `https://www.anthropic.com/news/rss.xml`

AI filtering rules:

* model releases
* API changes
* pricing changes
* new capabilities
* ignore marketing posts

---

## 6. Framework Updates (HIGH IMPACT)

Why:

* affects huge dev audience

Include:

* React
* Next.js
* Node.js
* Rust

Source feeds:

* `https://react.dev/blog/rss.xml`
* `https://nextjs.org/feed.xml`
* `https://nodejs.org/en/feed/blog.xml`
* `https://blog.rust-lang.org/feed.xml`

---

## 7. arXiv (Filtered Only)

Why:

* research signal

Constraint:

* only include top papers in AI and systems

Source:

* `http://export.arxiv.org/api/query?search_query=cat:cs.*&sortBy=submittedDate&sortOrder=descending`

MVP filter:

* AI papers
* systems papers
* only top papers, not full firehose

arXiv filtering:

* categories: `cs.AI`, `cs.LG`, `cs.DC`, `cs.SE`
* keyword match: `LLM`, `distributed`, `database`, `compiler`
* max 5 papers per day

---

## 8. Security Alerts (Optional but Strong)

Why:

* high urgency
* shareable

Include:

* critical CVEs only

Source:

* NVD API

---

## 9. Importance Scoring Threshold

Each item gets `importance_score` (`0-100`).

Publish only if:

* score > threshold (example: 70)

Examples:

* React release -> 90
* random npm package -> 20

---

## 10. Deduplication Strategy

Dedup strategy:

* same title similarity > 80%
* same repo reference
* same URL normalization

This handles the same news appearing across GitHub, blogs, and other channels.

---

## 11. Output Format

Output format:

* Title
* Summary (2-3 lines)
* Key points (3 bullets)
* Impact (1 line)
* Source link

Example:

```text
⚡ React Update

React introduces Server Components v2.

• improves streaming performance
• reduces client JS bundle
• better SSR handling

Impact:
Frontend apps become faster and more scalable.

Source: React Blog
```

---

## 12. Constraints

Constraints:

* max 100 fetches/hour
* max 20 AI summaries/hour
* batch processing preferred

---

## 13. Final MVP Stack

The MVP source stack is:

* GitHub (trending + releases)
* engineering blogs (top 4)
* AI ecosystem (OpenAI, Hugging Face, Anthropic)
* framework blogs (React, Next.js, Node.js, Rust)
* arXiv (filtered)
* security (critical only)

---

## 14. MVP Source Count

Keep it:

* GitHub: 1 source
* engineering blogs: 4 sources
* AI ecosystem: 3 sources
* framework blogs: 4 sources
* arXiv: 1 source
* security: 1 source

Total MVP source count:

* 14 primary sources/feeds

---

## 15. Summary

This MVP source set is intentionally narrow.

It captures:

* real developer adoption signals from GitHub
* trusted production insights from engineering blogs
* major AI ecosystem changes
* high-impact framework updates
* filtered research signals
* critical security alerts

This gives CSRadrX a practical MVP ingestion layer without pulling in the full source universe too early.
