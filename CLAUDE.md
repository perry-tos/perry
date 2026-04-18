# Perry — ToS Change Intelligence Platform

## What This Is

Perry monitors public Terms of Service pages, detects changes via AI-powered diff analysis, and broadcasts structured alerts to customer GitHub repos — **without ever touching customer code**. Zero-knowledge architecture: customer IP never leaves their VPC.

## Architecture (4 Microservices)

```
[Crawler] → detects ToS change → [Brain] → analyzes diff, broadcasts → [Edge Bot on customer's GitHub Actions]
                                                                              ↓
[Dashboard] ← onboarding/demo UI ← Supabase ← stores orgs/repos       [Opens Issue locally]
```

| Service | Dir | Owner | Stack |
|---------|-----|-------|-------|
| Dashboard (Control Plane) | `dashboard/` | Dev 4 | Next.js App Router, Tailwind, Supabase |
| Crawler (Data Ingestion) | `crawler/` | Dev 2 | Python, Playwright, BeautifulSoup4, html2text |
| Brain (AI Engine + Dispatcher) | `brain/` | Dev 3 | Python, FastAPI, Instructor, Pydantic, OpenAI, PyJWT |
| Edge Bot (Zero-Knowledge CI) | `edge-bot/` | Dev 1 | Node.js 20, @actions/core, @actions/github, @actions/glob |

## Key Technical Decisions

- **SHA-256 content hashing** before LLM calls — prevents duplicate alerts and saves cost
- **RS256 JWT → GitHub Installation Token** flow for broadcast auth
- **Instructor + Pydantic** for guaranteed structured JSON from GPT-4o
- **Wayback Machine CDX API** for seeding historical ToS baselines
- **playwright-stealth** to bypass Cloudflare on API doc pages
- **ncc-compiled single-file** GitHub Action for the edge bot

## Supabase Schema

```sql
CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  github_installation_id bigint UNIQUE NOT NULL,
  company_name text
);

CREATE TABLE repositories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid REFERENCES organizations(id),
  repo_full_name text UNIQUE NOT NULL
);
```

## Development

```bash
# Crawler
cd crawler && pip install -r requirements.txt && python main.py

# Brain
cd brain && pip install -r requirements.txt && uvicorn main:app --reload --port 8000

# Dashboard
cd dashboard && npm install && npm run dev

# Edge Bot (local test)
cd edge-bot && npm install && npm run build
```

## Environment Variables

| Variable | Service | Description |
|----------|---------|-------------|
| `SUPABASE_URL` | brain, dashboard | Supabase project URL |
| `SUPABASE_KEY` | brain, dashboard | Supabase anon/service key |
| `OPENAI_API_KEY` | brain | GPT-4o for diff analysis |
| `GITHUB_APP_ID` | brain | GitHub App ID for JWT signing |
| `GITHUB_APP_PRIVATE_KEY` | brain | RS256 .pem key contents |
| `NEXT_PUBLIC_SUPABASE_URL` | dashboard | Client-side Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | dashboard | Client-side Supabase key |

## Hackathon Context

- **Team:** 4 university students (3 DS + 1 physics) at Lund
- **Time budget:** ~10 hours total
- **Judges care about:** real-world relevance, technical execution, presentation quality, potential impact
- **Demo strategy:** "God Mode" button on dashboard triggers simulated ToS change through full pipeline
- **Prior win:** 1st place Lund AI Society Hackathon with Nimbus (EU cloud migration auditor)

## Time Budget (10 hours)

| Phase | Hours | What |
|-------|-------|------|
| Setup & scaffolding | 1.0 | Repos, env, Supabase tables, GitHub App |
| Crawler | 2.0 | Playwright scraper + hash dedup + Wayback seeding |
| Brain | 2.5 | FastAPI + Instructor schema + JWT dispatch |
| Dashboard | 2.0 | Next.js onboarding + God Mode demo panel |
| Edge Bot | 1.5 | GitHub Action + manifest parser + issue template |
| Integration & demo prep | 1.0 | Wire services, rehearse demo |

## Conventions

- Python: use `ruff` for formatting, type hints everywhere, Pydantic models for all data shapes
- TypeScript: use `prettier`, strict mode, prefer `const` and arrow functions
- All API endpoints return JSON with consistent error shapes: `{ "error": string, "detail": string }`
- Git: conventional commits (`feat:`, `fix:`, `chore:`), short branches, PR per service
- Never commit `.env`, `.pem` files, or `node_modules`
