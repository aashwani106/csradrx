import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Missing DATABAS E_URL. Set it in packages/db/.env");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  const event = await prisma.event.create({
    data: {
      title: "First Event",
      url: "https://example.com",
      category: "github",
      type: "repo",
      repoName: "test-repo",
      owner: "kalyugh",
      stars: 100,
      publishedAt: new Date(),
    },
  });

  console.log("Inserted:", event);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
