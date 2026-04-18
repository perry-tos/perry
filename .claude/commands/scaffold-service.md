Scaffold a service with all boilerplate files so the developer can start writing logic immediately.

Usage: /scaffold-service <service-name>

Where service-name is one of: crawler, brain, dashboard, edge-bot

## What to Generate

### For `crawler`:
- `requirements.txt` with: playwright, playwright-stealth, beautifulsoup4, html2text, supabase, requests, python-dotenv
- `main.py` — entry point with CLI args
- `scraper.py` — Playwright page fetcher skeleton
- `cleaner.py` — BS4 + html2text pipeline skeleton
- `hasher.py` — SHA-256 comparison skeleton
- `wayback.py` — CDX API client skeleton
- `config.py` — env var loading
- `.env.example`
- `tests/` directory with a basic test file

### For `brain`:
- `requirements.txt` with: fastapi, uvicorn, instructor, pydantic, openai, PyJWT, cryptography, requests, supabase, python-dotenv
- `main.py` — FastAPI app with `/diff-analyze` and `/health` endpoints
- `analyzer.py` — Instructor + Pydantic schema
- `dispatcher.py` — JWT + GitHub dispatch logic
- `schemas.py` — All Pydantic models
- `config.py` — env var loading
- `.env.example`
- `tests/` directory

### For `dashboard`:
- Run `npx create-next-app@latest` with App Router, TypeScript, Tailwind, ESLint
- Add `@supabase/supabase-js` dependency
- Create route structure: `app/page.tsx`, `app/dashboard/page.tsx`, `app/demo/page.tsx`
- Create `app/api/webhooks/github/route.ts` skeleton
- Create `lib/supabase.ts` and `lib/types.ts`
- `.env.local.example`

### For `edge-bot`:
- `package.json` with @actions/core, @actions/github, @actions/glob, typescript, @vercel/ncc
- `tsconfig.json` — strict mode, ES2020, Node module resolution
- `action.yml` — GitHub Action metadata
- `src/index.ts` — main entry skeleton
- `src/scanner.ts` — manifest parser skeleton
- `src/issue-template.ts` — issue markdown template
- Example workflow file at `examples/tos-scan.yml`
- Build scripts in package.json

## Rules
- Read the service's CLAUDE.md first for exact specifications
- Include real dependency versions (not `*`)
- Add inline TODOs where the developer needs to implement logic
- Keep skeletons minimal — just the structure, types, and function signatures
- Include `.gitignore` appropriate for the stack
- $ARGUMENTS contains the service name
