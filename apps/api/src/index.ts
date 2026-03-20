import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../../packages/db/.env"),
});

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL. Add it to packages/db/.env");
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
      category: "github",
      publishedAt: {
        gte: last48Hours,
      },
    },
    orderBy: [
      { score: { score: "desc" } },
      { stars: "desc" },
    ],
    take: 20,
  });

  res.json(events);
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
