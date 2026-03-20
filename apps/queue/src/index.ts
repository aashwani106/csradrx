import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { QueueEvents, Worker } from "bullmq";
import dotenv from "dotenv";
import IORedis from "ioredis";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as aiAnalysisModule from "../../../packages/core/src/analysis/analyzeAiBlogEvent";
import * as distributionModule from "../../../packages/core/src/distribution/postToTwitter";
import * as tweetDecisionModule from "../../../packages/core/src/distribution/shouldTweet";
import * as aiScoringModule from "../../../packages/core/src/scoring/scoreAiBlogEvent";
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
const analyzeAiBlogEvent = resolveModuleFunction(
  aiAnalysisModule,
  "analyzeAiBlogEvent"
);
const postToTwitter = resolveModuleFunction(distributionModule, "postToTwitter");
const scoreGithubEvent = resolveModuleFunction(scoringModule, "scoreGithubEvent");
const scoreAiBlogEvent = resolveModuleFunction(aiScoringModule, "scoreAiBlogEvent");
const shouldTweet = resolveModuleFunction(tweetDecisionModule, "shouldTweet");

if (typeof analyzeGithubEvent !== "function") {
  throw new Error("Failed to load analyzeGithubEvent");
}

if (typeof analyzeAiBlogEvent !== "function") {
  throw new Error("Failed to load analyzeAiBlogEvent");
}

if (typeof postToTwitter !== "function") {
  throw new Error("Failed to load postToTwitter");
}

if (typeof scoreGithubEvent !== "function") {
  throw new Error("Failed to load scoreGithubEvent");
}

if (typeof scoreAiBlogEvent !== "function") {
  throw new Error("Failed to load scoreAiBlogEvent");
}

if (typeof shouldTweet !== "function") {
  throw new Error("Failed to load shouldTweet");
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
    const label = job.data.full_name ?? job.data.title ?? job.id;
    console.log(`Starting job ${job.id}: ${label}`);

    if (job.data.category === "ai") {
      const article = job.data;

      const existingEvent = await prisma.event.findUnique({
        where: { url: article.url },
        select: { id: true },
      });

      const event = existingEvent
        ? await prisma.event.update({
            where: { id: existingEvent.id },
            data: {
              title: article.title,
              category: "ai",
              type: "blog",
              repoName: article.repoName,
              owner: article.owner,
              stars: null,
              publishedAt: new Date(article.publishedAt),
              rawData: article.rawData,
            },
          })
        : await prisma.event.create({
            data: {
              title: article.title,
              url: article.url,
              category: "ai",
              type: "blog",
              repoName: article.repoName,
              owner: article.owner,
              stars: null,
              publishedAt: new Date(article.publishedAt),
              rawData: article.rawData,
            },
          });

      const analysis = analyzeAiBlogEvent(article);
      const score = scoreAiBlogEvent(article);

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
          score,
        },
        update: {
          score,
        },
      });

      const tweetsToday = await prisma.event.count({
        where: {
          tweeted: true,
          tweetedAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      });

      const tweetDecision = shouldTweet({
        category: event.category,
        tweeted: event.tweeted,
        tweetsToday,
        score,
        summary: analysis.summary,
        impact: analysis.impact,
      });

      if (tweetDecision.shouldTweet) {
        const tweetResult = await postToTwitter(
          {
            category: event.category,
            title: event.title,
            url: event.url,
            repoName: event.repoName,
            stars: event.stars,
          },
          {
            summary: analysis.summary,
            impact: analysis.impact,
          }
        );

        if (tweetResult.success) {
          await prisma.event.update({
            where: { id: event.id },
            data: {
              tweeted: true,
              tweetedAt: new Date(),
            },
          });
        }
      }

      return {
        eventId: event.id,
        action: existingEvent ? "updated" : "inserted",
        fullName: article.title,
      };
    }

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
    const score = scoreGithubEvent(repo);

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
        score,
      },
      update: {
        score,
      },
    });

    const tweetsToday = await prisma.event.count({
      where: {
        tweeted: true,
        tweetedAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });

    const tweetDecision = shouldTweet({
      category: event.category,
      tweeted: event.tweeted,
      tweetsToday,
      score,
      summary: analysis.summary,
      impact: analysis.impact,
    });

    if (tweetDecision.shouldTweet) {
      const tweetResult = await postToTwitter(
        {
          category: event.category,
          title: event.title,
          url: event.url,
          repoName: event.repoName,
          stars: event.stars,
        },
        {
          summary: analysis.summary,
          impact: analysis.impact,
        }
      );

      if (tweetResult.success) {
        await prisma.event.update({
          where: { id: event.id },
          data: {
            tweeted: true,
            tweetedAt: new Date(),
          },
        });
      }
    }

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
  console.log(
    `Active job ${job.id}: ${job.data.full_name ?? job.data.title ?? job.id}`
  );
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
