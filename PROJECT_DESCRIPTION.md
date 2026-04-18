# Project Description

TaskSphere is a full-stack task management dashboard built on Next.js pages router. The app exposes a small but production-usable API, persists data to MongoDB when configured, and automatically falls back to local JSON storage during development if the database is unavailable.

## Goals

- Deliver a recruiter-ready project instead of a disconnected frontend demo.
- Make the project deployable on Render, Vercel, or any Node-compatible host.
- Ensure the same codebase handles frontend rendering and backend API routes.
- Provide environment-driven configuration with no hardcoded localhost URLs.

## Backend design

- `src/pages/api/health.ts`: deployment and runtime health endpoint.
- `src/pages/api/tasks/index.ts`: list and create tasks.
- `src/pages/api/tasks/[id].ts`: fetch, update, and delete a specific task.
- `src/server/mongodb.ts`: cached MongoDB client for serverless-friendly reuse.
- `src/server/taskStore.ts`: storage abstraction that selects MongoDB first and file fallback second.

Validation is handled with Zod so invalid requests fail fast with readable API errors.

## Frontend design

- `src/components/TaskDashboard.tsx`: dashboard UI for loading, creating, editing, moving, and deleting tasks.
- `src/components/Navbar.tsx`: lightweight site navigation.
- `src/lib/api.ts`: central API URL helper so the frontend is deployment-safe.

The dashboard intentionally exercises all CRUD operations exposed by the backend.

## Storage strategy

Production:

- Use MongoDB Atlas with `MONGODB_URI` and `MONGODB_DB`.
- Set `ENABLE_FILE_FALLBACK=false` so database failures surface immediately.

Development:

- Leave `MONGODB_URI` blank and keep `ENABLE_FILE_FALLBACK=true`.
- Seed data in `data/tasks.json` is copied into `data/runtime/tasks.json` at runtime.

## Deployment notes

- `next.config.mjs` sets security headers and pins `outputFileTracingRoot` to the repository root.
- `render.yaml` provides a ready-to-use Render service definition.
- The app relies on same-origin API routes by default, but supports a public `NEXT_PUBLIC_API_BASE_URL` when needed.

## Validation summary

- Lint passes with ESLint CLI.
- TypeScript type-check passes.
- Production build passes.
- Local production smoke test passed for health, create, read, update, and delete.
