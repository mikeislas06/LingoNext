# Lingo — Next.js app

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=flat&logo=vercel)](https://lingo-next-maig.vercel.app/)
[![Next.js](https://img.shields.io/badge/Framework-Next.js-000000?style=flat&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/CSS-Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![Drizzle ORM](https://img.shields.io/badge/ORM-Drizzle-7c3aed?style=flat)](https://github.com/drizzle-team/drizzle-orm)
[![Neon](https://img.shields.io/badge/DB-Neon-00C6A7?style=flat)](https://neon.tech)
[![Stripe](https://img.shields.io/badge/Payments-Stripe-635bff?style=flat&logo=stripe)](https://stripe.com)

This repository is a Next.js application used for the Lingo portfolio project. Explore the live playground at the badge above or run it locally.

## Table of Contents

- [Technologies](#technologies)
- [Features](#features)
- [Quick start](#quick-start)
- [Scripts](#scripts)
- [Database](#database)
- [Stripe & Webhooks](#stripe--webhooks)
- [Testing & Linting](#testing--linting)
- [Building & Running in Production](#building--running-in-production)
- [Live demo (Playground)](#live-demo-playground)
- [Contributing](#contributing)
- [Notes & Security](#notes--security)

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

## Technologies

- Framework: `Next.js`
- Language: `TypeScript`
- Styling: `Tailwind CSS`
- Authentication: `Clerk`
- ORM: `Drizzle ORM`
- Database: `Neon` (Postgres-compatible)
- Payments: `Stripe`
- State: `Zustand`
- UI: `Radix UI`, `Sonner`, `Lucide`
- Bundler / Tools: `tsx`, `ESLint`

## Features

- Authenticated user flows and profile handling
- Courses, lessons, units, and challenges UI
- Progress tracking, leaderboard, and shop
- Stripe integration for payments and webhooks
- Admin area (React Admin) with CRUD for content

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

## Live demo (Playground)

The app is deployed on Vercel and available as a live playground:

https://lingo-next-maig.vercel.app/

Feel free to explore the live site to preview features and try the app without running it locally.

## Contributing

- To suggest changes or improvements, open a PR or an issue with a short description.
- If you open a PR that modifies code, run `npm run lint` and verify the dev server runs locally.
