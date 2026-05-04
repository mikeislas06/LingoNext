# Lingo — Next.js app

This repository is a Next.js application used for the Lingo portfolio project.

## Prerequisites

- Node.js 18+ (recommended)
- npm, yarn, or pnpm
- PostgreSQL-compatible database (Neon is used in development here)

## Quick start

1. Clone the repo:

```bash
git clone <repo-url> lingo
cd lingo
```

2. Install dependencies (choose one):

```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Create a local `.env` file. The project expects these environment variables (examples are in the repository `.env`):

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server (local development with hot reload):

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open http://localhost:3000 in your browser.

## Scripts

Available npm scripts (from `package.json`):

- `dev` — start Next.js in development (`next dev`) — use this for local development (hot reload)
- `build` — build for production (`next build`)
- `start` — run production server (`next start`) — only run this after `npm run build`
- `lint` — run ESLint
- `db:studio` — open Drizzle Studio (`npx drizzle-kit studio`)
- `db:push` — push schema/migrations with Drizzle (`npx drizzle-kit push`)
- `db:seed` — run the seed script (`tsx ./scripts/seed.ts`)
- `db:reset` — run the reset script (`tsx ./scripts/reset.ts`)
- `db:prod` — production DB helper script (`tsx ./scripts/prod.ts`)

Run them with `npm run <script>` (or `pnpm/yarn` equivalent).

## Database

This project uses Drizzle ORM and expects a `DATABASE_URL` env var (Postgres/Neon). There are helper scripts in the `scripts/` folder:

- `scripts/seed.ts` — populate sample data
- `scripts/reset.ts` — reset the database (development)
- `scripts/prod.ts` — production helpers

Before running seed/reset, ensure `DATABASE_URL` points to a dev database. Use `npm run db:push` to apply schema changes.

## Stripe & Webhooks

For payments and webhooks the following variables are used:

- `STRIPE_API_KEY` — secret key for Stripe API
- `STRIPE_WEBHOOK_SECRET` — webhook signing secret (used by `app/api/webhooks/stripe/route.ts`)

When testing webhooks locally, use the Stripe CLI to forward events to the local server and set `STRIPE_WEBHOOK_SECRET` accordingly.

## Testing & Linting

There are no automated test scripts configured. Use `npm run lint` to run ESLint.

## Building & Running in Production

1. Build:

```bash
npm run build
```

2. Start:

```bash
npm run start
```

## Notes & Security

- Do NOT commit real secret keys to version control. Add `.env` to `.gitignore` if not already ignored.
- The repository contains a `.env` with example/test values; replace with your own when running locally or on CI.

## Next steps

- If you want, I can add a `.env.example` file, a minimal CONTRIBUTING section, or CI workflow to run lint/build on PRs.

---
