import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { QueueEvents, Worker } from "bullmq";
import dotenv from "dotenv";
import IORedis from "ioredis";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as analysisModule from "../../../packages/core/src/analysis/analyzeGithubEvent";
import * as scoringModule from "../../../packages/core/src/scoring/scoreGithubEvent";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../../packages/db/.env"),
});

const databaseUrl = process.env.DATABASE_URL;
const redisUrl = process.env.REDIS_URL ?? "redis://127.0.0.1:6379";

if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL. Add it to packages/db/.env");
}

function resolveModuleFunction(
  mod: Record<string, any>,
  exportName: string
): ((...args: any[]) => any) | undefined {
  if (typeof mod[exportName] === "function") return mod[exportName];
  if (typeof mod.default === "function") return mod.default;
  if (mod.default && typeof mod.default[exportName] === "function") {
    return mod.default[exportName];
  }
  if (mod.default && typeof mod.default.default === "function") {
    return mod.default.default;
  }
  return undefined;
}

const analyzeGithubEvent = resolveModuleFunction(
  analysisModule,
  "analyzeGithubEvent"
);
const scoreGithubEvent = resolveModuleFunction(scoringModule, "scoreGithubEvent");

if (typeof analyzeGithubEvent !== "function") {
  throw new Error("Failed to load analyzeGithubEvent");
}

if (typeof scoreGithubEvent !== "function") {
  throw new Error("Failed to load scoreGithubEvent");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
});

const queueEvents = new QueueEvents("github-events", { connection });

const worker = new Worker(
  "github-events",
  async (job) => {
    console.log(`Starting job ${job.id}: ${job.data.full_name}`);

    const repo = job.data;

    const existingEvent = await prisma.event.findUnique({
      where: { url: repo.html_url },
      select: { id: true },
    });

    const event = existingEvent
      ? await prisma.event.update({
          where: { id: existingEvent.id },
          data: {
            title: repo.name,
            category: "github",
            type: "repo",
            repoName: repo.name,
            owner: repo.owner.login,
            stars: repo.stargazers_count,
            publishedAt: new Date(repo.created_at),
            rawData: repo,
          },
        })
      : await prisma.event.create({
          data: {
            title: repo.name,
            url: repo.html_url,
            category: "github",
            type: "repo",
            repoName: repo.name,
            owner: repo.owner.login,
            stars: repo.stargazers_count,
            publishedAt: new Date(repo.created_at),
            rawData: repo,
          },
        });

    const analysis = analyzeGithubEvent(repo);

    await prisma.eventAnalysis.upsert({
      where: { eventId: event.id },
      create: {
        eventId: event.id,
        summary: analysis.summary,
        keyPoints: analysis.keyPoints,
        impact: analysis.impact,
      },
      update: {
        summary: analysis.summary,
        keyPoints: analysis.keyPoints,
        impact: analysis.impact,
      },
    });

    await prisma.eventScore.upsert({
      where: { eventId: event.id },
      create: {
        eventId: event.id,
        score: scoreGithubEvent(repo),
      },
      update: {
        score: scoreGithubEvent(repo),
      },
    });

    return {
      eventId: event.id,
      action: existingEvent ? "updated" : "inserted",
      fullName: repo.full_name,
    };
  },
  { connection }
);

worker.on("ready", () => {
  console.log("Queue worker ready");
});

worker.on("active", (job) => {
  console.log(`Active job ${job.id}: ${job.data.full_name}`);
});

worker.on("completed", (job, result) => {
  console.log(`Processed job ${job.id}: ${result.action} ${result.fullName}`);
});

worker.on("failed", (job, err) => {
  console.error(`Failed job ${job?.id}:`, err);
});

worker.on("error", (err) => {
  console.error("Worker error:", err);
});

queueEvents.on("waiting", ({ jobId }) => {
  console.log(`Job waiting: ${jobId}`);
});

queueEvents.on("active", ({ jobId }) => {
  console.log(`Job active: ${jobId}`);
});

queueEvents.on("completed", ({ jobId }) => {
  console.log(`Job completed: ${jobId}`);
});

queueEvents.on("failed", ({ jobId, failedReason }) => {
  console.error(`Job failed: ${jobId} - ${failedReason}`);
});

console.log(`Queue worker listening on ${redisUrl}`);
