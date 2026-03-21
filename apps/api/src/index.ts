import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as hookModule from "../../../packages/core/src/distribution/generateHook";
import * as rankingModule from "../../../packages/core/src/ranking/rankEvents";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../../packages/db/.env"),
});

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL. Add it to packages/db/.env");
}

function resolveModuleFunction(
  mod: Record<string, any>,
  exportName: string
): ((...args: any[]) => any) | undefined {
  if (typeof mod[exportName] === "function") return mod[exportName];
  if (mod["module.exports"] && typeof mod["module.exports"][exportName] === "function") {
    return mod["module.exports"][exportName];
  }
  if (typeof mod.default === "function") return mod.default;
  if (mod.default && typeof mod.default[exportName] === "function") {
    return mod.default[exportName];
  }
  if (mod.default && typeof mod.default.default === "function") {
    return mod.default.default;
  }
  return undefined;
}

const rankEvents = resolveModuleFunction(rankingModule, "rankEvents");
const generateHook = resolveModuleFunction(hookModule, "generateHook");

if (typeof rankEvents !== "function") {
  throw new Error("Failed to load rankEvents");
}

if (typeof generateHook !== "function") {
  throw new Error("Failed to load generateHook");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

const app = express();
app.use(cors());
const port = Number(process.env.PORT ?? 3000);

const eventSelect = {
  id: true,
  category: true,
  type: true,
  title: true,
  repoName: true,
  owner: true,
  url: true,
  publishedAt: true,
  score: {
    select: { score: true },
  },
  analysis: {
    select: { summary: true, impact: true },
  },
};

function getEventSource(event: { category: string; owner?: string | null }) {
  if (event.category === "github") {
    return "github";
  }

  return event.owner ?? event.category;
}

function toDashboardEvent(event: any) {
  return {
    id: event.id,
    source: getEventSource(event),
    category: event.category,
    type: event.type,
    hook: generateHook!({
      category: event.category,
      type: event.type,
      title: event.title,
      repoName: event.repoName,
    }),
    title: event.title,
    summary: event.analysis?.summary ?? "",
    impact: event.analysis?.impact ?? "",
    url: event.url,
    publishedAt: event.publishedAt,
    finalScore: event.ranking?.finalScore ?? event.score?.score ?? 0,
  };
}

app.get("/events", async (_req, res) => {
  const events = await prisma.event.findMany({
    select: eventSelect,
    orderBy: [
      { score: { score: "desc" } },
      { publishedAt: "desc" },
    ],
    take: 50,
  });

  res.json(events);
});

app.get("/trending", async (_req, res) => {
  const timeWindow = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days for MVP

  const events = await prisma.event.findMany({
    select: eventSelect,
    where: {
      publishedAt: {
        gte: timeWindow,
      },
    },
    orderBy: [{ publishedAt: "desc" }],
    take: 100,
  });

  const rankedEvents = rankEvents(events).slice(0, 20);

  rankedEvents.forEach((event: any) => {
    console.log("Posted:", event.title, event.ranking.finalScore);
  });

  res.json(rankedEvents);
});

app.get("/dashboard/trending", async (_req, res) => {
  const timeWindow = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const events = await prisma.event.findMany({
    select: eventSelect,
    where: {
      publishedAt: {
        gte: timeWindow,
      },
    },
    orderBy: [{ publishedAt: "desc" }],
    take: 100,
  });

  const rankedEvents = rankEvents(events).slice(0, 20);
  res.json(rankedEvents.map(toDashboardEvent));
});

app.get("/dashboard/feed", async (_req, res) => {
  const timeWindow = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const feedWindowEvents = await prisma.event.findMany({
    select: eventSelect,
    where: {
      publishedAt: {
        gte: timeWindow,
      },
    },
    orderBy: [{ publishedAt: "desc" }],
    take: 100,
  });

  const trendingIds = new Set(
    rankEvents(feedWindowEvents)
      .slice(0, 20)
      .map((event: any) => event.id)
  );

  const liveFeedEvents = feedWindowEvents
    .filter((event: any) => {
      const eventScore = event.score?.score ?? 0;
      return eventScore >= 20 && !trendingIds.has(event.id);
    })
    .slice(0, 80);

  res.json(liveFeedEvents.map(toDashboardEvent));
});

app.get("/dashboard/events", async (req, res) => {
  const timeWindow = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const cursor = req.query.cursor as string | undefined;
  const limit = parseInt(req.query.limit as string) || 30;

  const events = await prisma.event.findMany({
    select: eventSelect,
    where: {
      publishedAt: {
        gte: timeWindow,
      },
    },
    orderBy: [{ publishedAt: "desc" }],
    take: 300,
  });

  const rankedEvents = rankEvents(events);
  let startIndex = 0;
  if (cursor) {
    const cursorIndex = rankedEvents.findIndex((e: any) => e.id === cursor);
    if (cursorIndex !== -1) startIndex = cursorIndex + 1;
  }

  res.json(rankedEvents.slice(startIndex, startIndex + limit).map(toDashboardEvent));
});

app.get("/dashboard/events/new-count", async (req, res) => {
  const since = req.query.since as string;
  if (!since) return res.json({ count: 0 });

  const count = await prisma.event.count({
    where: {
      createdAt: {
        gt: new Date(since),
      },
    },
  });

  res.json({ count });
});

app.get("/research", async (_req, res) => {
  const events = await prisma.event.findMany({
    select: eventSelect,
    where: {
      category: "research",
    },
    orderBy: [{ score: { score: "desc" } }],
    take: 20,
  });

  res.json(events);
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
