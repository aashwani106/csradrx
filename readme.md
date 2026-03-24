# CSRadrX

CSRadrX is an AI-powered computer science intelligence platform that monitors research papers, engineering blogs, open-source repositories, and developer communities to detect meaningful ecosystem updates.

The system processes data using an event-driven pipeline and publishes summarized insights via a dashboard and automated channels.

Live: https://csradrx.live



Current MVP flow:

* fetch GitHub repositories
* filter high-signal repos
* enqueue jobs in Redis
* process jobs in a worker
* store `Event`, `EventAnalysis`, and `EventScore`
* expose results through the API

## Current Architecture

* `apps/fetcher` -> fetches GitHub data and enqueues jobs
* `apps/queue` -> consumes jobs, writes DB records, runs analysis and scoring
* `apps/api` -> serves stored data
* `packages/db` -> Prisma schema and database config
* `packages/core` -> shared analysis and scoring logic

## Prerequisites

Install:

* Node.js
* pnpm
* Redis
* PostgreSQL-compatible database

## Environment Setup

Create or update `packages/db/.env` with:

```env
DATABASE_URL="your_database_url"
REDIS_URL="redis://127.0.0.1:6379"
GITHUB_TOKEN="your_github_token"
```

You can use `packages/db/.env.example` as a template.

## Install Dependencies

From the repo root:

```bash
pnpm install
```

## Start Redis

If installed via Homebrew:

```bash
brew services start redis
redis-cli ping
```

Expected:

```bash
PONG
```

## Run The Project

Start the worker first:

```bash
cd apps/queue
npx tsx src/index.ts
```

In a second terminal, run the fetcher:

```bash
cd apps/fetcher
npx tsx src/github.ts
```

Expected fetcher output:

```bash
Queued: owner/repo
```

Expected worker output:

```bash
Queue worker ready
Processed job owner/repo: inserted owner/repo
```

In a third terminal, start the API:

```bash
cd apps/api
node --import tsx src/index.ts
```

## API Endpoints

Available endpoints:

* [http://localhost:3000/events](http://localhost:3000/events)
* [http://localhost:3000/trending](http://localhost:3000/trending)
* [http://localhost:3000/research](http://localhost:3000/research)

## Verification

Check that events, analysis, and scores exist:

```sql
SELECT
  e.title,
  ea.summary,
  es.score
FROM "Event" e
LEFT JOIN "EventAnalysis" ea ON ea."eventId" = e.id
LEFT JOIN "EventScore" es ON es."eventId" = e.id
ORDER BY e."createdAt" DESC
LIMIT 20;
```

## Notes

* `apps/fetcher` does not write to the DB directly
* duplicate events are skipped before enqueue using batched URL checks
* `/trending` currently returns GitHub events from the last 48 hours ordered by score
