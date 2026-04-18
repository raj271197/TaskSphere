# TaskSphere

TaskSphere is a production-ready Next.js task manager with a typed frontend, API-backed CRUD flows, MongoDB support, and a safe local fallback for development.

## What was fixed

- Replaced the disconnected demo widgets with a real task dashboard.
- Added backend API routes for task CRUD: `GET/POST /api/tasks` and `GET/PUT/DELETE /api/tasks/:id`.
- Added `/api/health` so deployments can verify storage readiness.
- Added MongoDB connection handling with env-based configuration and graceful file fallback.
- Removed hardcoded localhost assumptions by using `NEXT_PUBLIC_API_BASE_URL`.
- Upgraded Next.js to `15.5.15` to remove the previously reported critical vulnerability.
- Added production security headers, ESLint, TypeScript validation, Render deployment config, and environment documentation.
- Removed stale unused assets and outdated classroom-project content.

## Stack

- Next.js 15
- React 19
- TypeScript
- MongoDB Atlas
- Zod validation
- CSS Modules

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm start
```

## Environment variables

Create `.env.local` for development and set the same values in your production host:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=tasksphere
NEXT_PUBLIC_API_BASE_URL=
ENABLE_FILE_FALLBACK=true
```

Notes:

- `MONGODB_URI`: required for MongoDB Atlas or any MongoDB deployment.
- `MONGODB_DB`: database name used by the task collection.
- `NEXT_PUBLIC_API_BASE_URL`: leave empty for same-origin local development. Set it to your public app URL in production if needed.
- `ENABLE_FILE_FALLBACK`: keep `true` for local development convenience, set `false` in production.

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Add your MongoDB connection string, or leave `MONGODB_URI` unset to use local file fallback.
4. Start the app with `npm run dev`.
5. Open `http://localhost:3000`.

If MongoDB is not configured, the app still works using local JSON persistence under `data/runtime/tasks.json`.

## API summary

### Health

- `GET /api/health`

Returns the current storage mode and whether the app is using MongoDB or file fallback.

### Tasks

- `GET /api/tasks`
- `POST /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

Payload shape:

```json
{
  "title": "Prepare Render deployment",
  "description": "Add environment variables and smoke test the hosted API.",
  "status": "todo",
  "priority": "high",
  "dueDate": "2026-04-30T00:00:00.000Z"
}
```

## Production deployment

### Render

The repository includes [render.yaml](./render.yaml).

Render settings:

- Build command: `npm install && npm run build`
- Start command: `npm start`
- Node version: `20.11.1`

Required environment variables:

- `MONGODB_URI`
- `MONGODB_DB`
- `NEXT_PUBLIC_API_BASE_URL`
- `ENABLE_FILE_FALLBACK=false`

Recommended `NEXT_PUBLIC_API_BASE_URL` value:

```bash
https://your-render-service.onrender.com
```

### Vercel

Use the same environment variables. Vercel will run `npm run build` automatically and serve the Next.js app without extra routing work.

## Validation completed

These checks pass in the current repository state:

```bash
npm run lint
npm run typecheck
npm run build
```

Production API smoke test also passed locally using `npm start`, including create, update, and delete operations.

## Project structure

```text
TaskSphere/
├── data/
│   └── tasks.json
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.module.css
│   │   ├── Navbar.tsx
│   │   ├── TaskDashboard.module.css
│   │   └── TaskDashboard.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   └── env.ts
│   ├── pages/
│   │   ├── api/
│   │   │   ├── health.ts
│   │   │   └── tasks/
│   │   │       ├── [id].ts
│   │   │       └── index.ts
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── about.tsx
│   │   └── index.tsx
│   ├── server/
│   │   ├── mongodb.ts
│   │   └── taskStore.ts
│   ├── styles/
│   │   └── globals.css
│   └── types/
│       └── task.ts
├── .env.example
├── .eslintrc.json
├── .eslintignore
├── next.config.mjs
├── package.json
├── render.yaml
└── tsconfig.json
```
