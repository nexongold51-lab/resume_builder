# ResumePro AI — Resume Builder

Create Professional ATS-Friendly Resumes That Get Interviews.

## Tech Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Prisma 7 · NextAuth v5 (beta) · PostgreSQL

## Local Development (without Docker)

1. Install dependencies: `npm install`
2. Start Postgres locally and create a database (see `scripts/setup-postgres.sh` for a reference setup).
3. Copy `.env.example` to `.env` and fill in `DATABASE_URL` / `AUTH_SECRET` (generate with `openssl rand -base64 32`).
4. Push the schema: `npx prisma db push`
5. Run the app: `npm run dev` — open http://localhost:3000

## Running with Docker

This spins up the app **and** a PostgreSQL database in containers — no local Postgres install needed.

1. Copy the env template and fill in secrets:
   ```bash
   cp .env.docker.example .env
   # edit .env: set AUTH_SECRET (openssl rand -base64 32), optionally Google OAuth creds
   ```
2. Build and start everything:
   ```bash
   docker compose up --build
   ```
3. Open http://localhost:3000

The `app` container automatically runs `prisma db push` against the `db` container on startup, so the schema is always in sync. Data persists in the `db_data` Docker volume across restarts.

To stop: `docker compose down` (add `-v` to also delete the database volume).

## Project Structure

- `src/app` — Next.js App Router pages and API routes
- `src/components` — UI components (builder, dashboard, resume templates)
- `src/auth.ts` — NextAuth configuration (Google OAuth + email/password credentials)
- `src/proxy.ts` — Route protection (Next.js 16 renamed `middleware.ts` to `proxy.ts`)
- `prisma/schema.prisma` — Database schema
- `prisma.config.ts` — Prisma 7 CLI configuration (connection URL lives here, not in schema.prisma)


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
