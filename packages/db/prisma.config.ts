import "dotenv/config";

// `prisma.config.ts` is executed by the Prisma CLI; to keep this file
// lint/type-check friendly we avoid referencing `process` directly.
const databaseUrl = (globalThis as any)?.process?.env?.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL. Add it to packages/db/.env");
}

// Avoid importing `prisma/config` so this config works even when `prisma` isn't
// installed as a local dependency (npx/CLI will still pick it up).
export default {
  schema: "prisma/schema.prisma",
  datasource: {
    url: databaseUrl,
  },
};

