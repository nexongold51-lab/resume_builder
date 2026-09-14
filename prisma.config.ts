import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // `prisma generate` doesn't need a real DB connection (e.g. during Docker builds),
    // so fall back to a placeholder instead of throwing via the env() helper.
    url: process.env.DATABASE_URL ?? "postgresql://placeholder:placeholder@localhost:5432/placeholder",
  },
});
