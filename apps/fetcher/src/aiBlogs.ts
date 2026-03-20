import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Queue } from "bullmq";
import dotenv from "dotenv";
import { Redis } from "ioredis";
import path from "node:path";
import Parser from "rss-parser";
import { fileURLToPath } from "node:url";

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

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

const connection = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
});

const parser = new Parser();
const githubQueue = new Queue("github-events", { connection: connection as any });

const sources = [
  {
    owner: "openai",
    repoName: "OpenAI News",
    feedUrl: "https://openai.com/news/rss.xml",
  },
  {
    owner: "huggingface",
    repoName: "Hugging Face Blog",
    feedUrl: "https://huggingface.co/blog/feed.xml",
  },
  {
    owner: "anthropic",
    repoName: "Anthropic News",
    feedUrl: "https://www.anthropic.com/rss.xml",
  },
  {
    owner: "deepmind",
    repoName: "DeepMind Blog",
    feedUrl: "https://deepmind.google/blog/rss.xml",
  },
  {
    owner: "google-ai",
    repoName: "Google AI Blog",
    feedUrl: "https://ai.googleblog.com/feeds/posts/default",
  },
  {
    owner: "microsoft-ai",
    repoName: "Microsoft Research",
    feedUrl: "https://www.microsoft.com/en-us/research/feed/",
  },
];

type NormalizedAiArticle = {
  title: string;
  url: string;
  category: "ai";
  type: "blog";
  repoName: string;
  owner: string;
  stars: null;
  publishedAt: string;
  rawData: Record<string, unknown>;
};

const sourceWeights: Record<string, number> = {
  openai: 5,
  deepmind: 5,
  "google-ai": 5,
  anthropic: 4,
  huggingface: 3,
  "microsoft-ai": 3,
};

function isHighSignalArticle(item: Parser.Item) {
  const content = `${item.title ?? ""} ${item.contentSnippet ?? ""}`.toLowerCase();

  const strongSignals = [
    "introducing",
    "announcing",
    "launch",
    "release",
    "new model",
    "model",
    "api",
    "pricing",
    "capabilit",
    "agent",
    "sdk",
    "reasoning",
    "system card",
    "safety",
  ];

  const weakSignals = [
    "tutorial",
    "guide",
    "how to",
    "case study",
    "opinion",
    "research recap",
    "webinar",
    "course",
    "workshop",
  ];

  const hasStrongSignal = strongSignals.some((keyword) => content.includes(keyword));
  const hasWeakSignal = weakSignals.some((keyword) => content.includes(keyword));

  return hasStrongSignal && !hasWeakSignal;
}

function toJobId(owner: string, link: string) {
  return `${owner}-${link.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

async function fetchAiBlogs() {
  const normalizedArticles: NormalizedAiArticle[] = [];

  for (const source of sources) {
    let feed;
    try {
      feed = await parser.parseURL(source.feedUrl);
    } catch (error) {
      console.error(`Failed feed: ${source.owner} (${source.feedUrl})`, error);
      continue;
    }

    for (const item of feed.items ?? []) {
      const link = item.link ?? item.guid;

      if (!link || !item.title || !item.isoDate) {
        continue;
      }

      if (!isHighSignalArticle(item)) {
        continue;
      }

      normalizedArticles.push({
        title: item.title,
        url: link,
        category: "ai",
        type: "blog",
        repoName: source.repoName,
        owner: source.owner,
        stars: null,
        publishedAt: item.isoDate,
        rawData: {
          ...item,
          source: source.owner,
        },
      });
    }
  }

  normalizedArticles.sort((a, b) => {
    const sourceWeightDiff =
      (sourceWeights[b.owner] ?? 0) - (sourceWeights[a.owner] ?? 0);

    if (sourceWeightDiff !== 0) {
      return sourceWeightDiff;
    }

    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });

  const cappedArticles = normalizedArticles.slice(0, 15);

  const existingEvents = await prisma.event.findMany({
    where: {
      url: {
        in: cappedArticles.map((article) => article.url),
      },
    },
    select: {
      url: true,
    },
  });

  const existingUrls = new Set(existingEvents.map((event) => event.url));

  for (const article of cappedArticles) {
    if (existingUrls.has(article.url)) {
      console.log("Skipped existing event:", article.title);
      continue;
    }

    const jobId = toJobId(article.owner, article.url);
    const existingJob = await githubQueue.getJob(jobId);
    if (existingJob) {
      await existingJob.remove();
    }

    await githubQueue.add("process-ai-blog-event", article, {
      jobId,
      removeOnComplete: true,
      removeOnFail: true,
    });

    console.log("Queued AI blog:", article.title);
  }
}

fetchAiBlogs()
  .catch(console.error)
  .finally(async () => {
    await githubQueue.close();
    await connection.quit();
    await prisma.$disconnect();
  });
