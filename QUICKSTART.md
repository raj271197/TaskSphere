# Quickstart

## Run locally

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Minimum env setup

```bash
MONGODB_URI=
MONGODB_DB=tasksphere
NEXT_PUBLIC_API_BASE_URL=
ENABLE_FILE_FALLBACK=true
```

## Useful checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Production checklist

```bash
ENABLE_FILE_FALLBACK=false
MONGODB_URI=<your atlas connection string>
MONGODB_DB=tasksphere
NEXT_PUBLIC_API_BASE_URL=https://your-hostname.com
```
