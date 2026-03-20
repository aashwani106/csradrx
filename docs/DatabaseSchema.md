# CSRadrX

## DatabaseSchema.md (MVP - GitHub Only First)

### 1. Overview

This schema is designed for the MVP of CSRadrX.

We are starting with only GitHub as the data source.

The schema is intentionally simple and will be extended later.

---

## 2. Tables

---

### 2.1 Event (CORE TABLE)

Stores all updates detected from GitHub.

```prisma
model Event {
  id            String   @id @default(cuid())

  title         String
  url           String

  category      String   // "github"
  type          String   // "repo" | "release"

  repoName      String
  owner         String

  stars         Int?
  releaseTag    String?

  publishedAt   DateTime
  createdAt     DateTime @default(now())

  rawData       Json?

  analysis      EventAnalysis?
  score         EventScore?

  @@index([publishedAt])
  @@index([category, type])
  @@unique([url])
}
```

---

### 2.2 EventAnalysis

Stores AI-generated summaries.

```prisma
model EventAnalysis {
  id        String   @id @default(cuid())
  eventId   String   @unique

  event     Event    @relation(fields: [eventId], references: [id])

  summary   String
  keyPoints String[]
  impact    String

  createdAt DateTime @default(now())
}
```

---

### 2.3 EventScore

Stores importance score.

```prisma
model EventScore {
  id        String   @id @default(cuid())
  eventId   String   @unique

  event     Event    @relation(fields: [eventId], references: [id])

  score     Float
  createdAt DateTime @default(now())

  @@index([score])
}
```

## 3. Data Flow

```text
GitHub API
   ↓
Event created
   ↓
AI summary → EventAnalysis
   ↓
Score → EventScore
```

## 4. Notes

* This schema only supports GitHub for MVP
* Future sources (blogs, AI, research) will reuse Event table
* Keep schema simple for faster development
