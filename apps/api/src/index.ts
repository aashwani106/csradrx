import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express from "express";
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
const port = Number(process.env.PORT ?? 3000);

const eventInclude = {
  analysis: true,
  score: true,
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
    hook: generateHook({
      category: event.category,
      type: event.type,
      title: event.title,
      repoName: event.repoName,
    }),
    title: event.title,
    impact: event.analysis?.impact ?? "",
    url: event.url,
    publishedAt: event.publishedAt,
    finalScore: event.ranking?.finalScore ?? event.score?.score ?? 0,
  };
}

app.get("/events", async (_req, res) => {
  const events = await prisma.event.findMany({
    include: eventInclude,
    orderBy: [
      { score: { score: "desc" } },
      { publishedAt: "desc" },
    ],
    take: 50,
  });

  res.json(events);
});

app.get("/trending", async (_req, res) => {
  const last48Hours = new Date(Date.now() - 48 * 60 * 60 * 1000);

  const events = await prisma.event.findMany({
    include: eventInclude,
    where: {
      publishedAt: {
        gte: last48Hours,
      },
    },
    orderBy: [{ publishedAt: "desc" }],
    take: 100,
  });

  const rankedEvents = rankEvents(events).slice(0, 20);

  rankedEvents.forEach((event) => {
    console.log("Posted:", event.title, event.ranking.finalScore);
  });

  res.json(rankedEvents);
});

app.get("/dashboard/trending", async (_req, res) => {
  const last48Hours = new Date(Date.now() - 48 * 60 * 60 * 1000);

  const events = await prisma.event.findMany({
    include: eventInclude,
    where: {
      publishedAt: {
        gte: last48Hours,
      },
    },
    orderBy: [{ publishedAt: "desc" }],
    take: 100,
  });

  const rankedEvents = rankEvents(events).slice(0, 20);
  res.json(rankedEvents.map(toDashboardEvent));
});

app.get("/dashboard/feed", async (_req, res) => {
  const last48Hours = new Date(Date.now() - 48 * 60 * 60 * 1000);

  const feedWindowEvents = await prisma.event.findMany({
    include: eventInclude,
    where: {
      publishedAt: {
        gte: last48Hours,
      },
    },
    orderBy: [{ publishedAt: "desc" }],
    take: 100,
  });

  const trendingIds = new Set(
    rankEvents(feedWindowEvents)
      .slice(0, 20)
      .map((event) => event.id)
  );

  const liveFeedEvents = feedWindowEvents
    .filter((event) => {
      const eventScore = event.score?.score ?? 0;
      return eventScore >= 20 && !trendingIds.has(event.id);
    })
    .slice(0, 80);

  res.json(liveFeedEvents.map(toDashboardEvent));
});

app.get("/research", async (_req, res) => {
  const events = await prisma.event.findMany({
    include: eventInclude,
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
