import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Queue } from "bullmq";
import dotenv from "dotenv";
import fetch from "node-fetch";
import IORedis from "ioredis";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../../packages/db/.env"),
});

const databaseUrl = process.env.DATABASE_URL;
const redisUrl = process.env.REDIS_URL ?? "redis://127.0.0.1:6379";
const githubToken = process.env.GITHUB_TOKEN;

if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL. Add it to packages/db/.env");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
});

const githubQueue = new Queue("github-events", { connection: connection as any });

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchGithubWithRetry(url: string, attempts = 3) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    const res = await fetch(url, {
      headers: githubToken
        ? {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github+json",
          }
        : {
            Accept: "application/vnd.github+json",
          },
    });

    if (res.ok) {
      return res.json();
    }

    const body = await res.text();
    const retryable = res.status === 403 || res.status >= 500;

    lastError = new Error(
      `GitHub API request failed with ${res.status}: ${body}`
    );

    if (!retryable || attempt === attempts) {
      throw lastError;
    }

    await sleep(attempt * 1000);
  }

  throw lastError;
}

async function fetchGithub() {
  const last7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const url = `https://api.github.com/search/repositories?q=created:>${last7Days}&sort=stars&order=desc`;

  const data: any = await fetchGithubWithRetry(url);

  if (!Array.isArray(data.items)) {
    throw new Error(
      `GitHub API returned an unexpected response: ${JSON.stringify(data)}`
    );
  }

  const filteredRepos = data.items.filter((repo: any) => {
    return (
      !repo.fork &&
      repo.stargazers_count > 500 &&
      ["JavaScript", "TypeScript", "Python", "Go", "Rust"].includes(
        repo.language
      )
    );
  });

  const repoUrls = filteredRepos.map((repo: any) => repo.html_url);
  const existingEvents = await prisma.event.findMany({
    where: {
      url: {
        in: repoUrls,
      },
    },
    select: {
      url: true,
    },
  });

  const existingUrls = new Set(existingEvents.map((event) => event.url));

  for (const repo of filteredRepos) {
    if (existingUrls.has(repo.html_url)) {
      console.log("Skipped existing event:", repo.full_name);
      continue;
    }

    const jobId = repo.full_name;
    const existingJob = await githubQueue.getJob(jobId);
    if (existingJob) {
      await existingJob.remove();
    }

    await githubQueue.add("process-github-event", repo, {
      jobId,
      removeOnComplete: true,
      removeOnFail: true,
    });

    console.log("Queued:", repo.full_name);
  }
}

fetchGithub()
  .catch(console.error)
  .finally(async () => {
    await githubQueue.close();
    await connection.quit();
    await prisma.$disconnect();
  });
