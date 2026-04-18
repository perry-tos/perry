<div align="center">
<img width="300" alt="Image" src="https://github.com/user-attachments/assets/aafa9167-1c0d-4d2a-8876-1c0d9bbab613" />
</div>

<p align="center"><i>Your vendors write ToS updates for lawyers. Perry writes them for you.</i></p>

<br/>

Perry watches the public Terms of Service (ToS) pages of the providers your team depends on. When a ToS change actually affects a package you're using, it alerts you in the way you choose (Github Issue, Email, etc.) a recommendation on what changed and what to do next, in plain English. The best part about it? Your code never leaves your repo.

## The problem

Small engineering teams quickly stack up a list of providers their product depends on: Stripe for payments. Anthropic for AI. Twilio for messaging. Auth0 for identity. Every one of those providers quietly pushes policy updates several times a year. The updates are public. They're also written for lawyers, buried on legal pages nobody at a fast-moving startup has time to read.

So the updates don't get read. The relevant ones get noticed months later, when a customer complains, an auditor flags it, or something breaks. Big companies handle this with legal staff. Small companies just don't.

Perry closes that loop.

## How it works

Four services, wired together:

```
  Crawler  --->  Brain   --->  GitHub App  --->  Edge Bot  --->  Issue/Email
 (Python)     (FastAPI +     repository_      (Action in
               Claude)         dispatch       customer CI)

              Dashboard (Next.js): onboarding + demo trigger
```

1. **Crawler** polls each provider's ToS page, normalizes the text, and SHA-256s it. If the hash matches the last snapshot, nothing happens. If not, it hands old + new markdown to the brain.
2. **Brain** (FastAPI + Instructor + Claude Sonnet) diffs the two versions against a per-provider SDK registry, and returns a structured `DiffAnalysis` - one `PackageChange` per affected SDK, each with plain-language breaking changes and recommended actions.
3. **Dispatcher** (inside the brain) signs a GitHub App JWT, swaps it for an installation token per customer org, and fires `repository_dispatch` with the analysis as the `client_payload`.
4. **Edge Bot** - a zero-knowledge GitHub Action - receives the dispatch inside the customer's own runner, scans local `package.json` files for any affected package, and opens a deduplicated Issue if there's a match. The only call it makes is back to GitHub's own issue API. Your dependency list never leaves the runner.

The point of that last step: Perry doesn't know what packages you have installed, and doesn't need to. Matching happens locally.

## A few decisions worth calling out

- **Hash before LLM.** Content hashing on normalized text means we never pay for a Claude call when a provider just reformatted a paragraph.
- **Instructor + Pydantic.** Guaranteed structured JSON from Claude. The dispatcher relies on the shape - no free-form parsing.
- **GitHub App, not PATs.** Each install grants its own scoped access. We never hold customer tokens, and revoking Perry is one click.
- **Single-file compiled action.** The edge bot is an `ncc`-bundled JS file you can read end-to-end. No hidden dependencies pulled at runtime.

## Repo layout

```
brain/       FastAPI service: /diff-analyze, /broadcast, /trigger-demo
crawler/     Playwright-based ToS poller with Wayback seeding
dashboard/   Next.js onboarding and "God Mode" demo panel
edge-bot/    GitHub Action, published as perry-tos/edge-bot
supabase/    github-webhook function + schema
```

## Running it locally

You need a Supabase project, an Anthropic API key, a GitHub App, and at least one dummy repo to install the App on. Fortunately, you can visit the test repo we've setup at [perry-test-target](https://github.com/perry-tos/perry-test-target).

### If you would like to run everything locally

**Supabase.** Create the `organizations` and `repositories` tables (schema in the top-level `CLAUDE.md`). Insert one org with the `github_installation_id` from your test install, and one repository row pointing at the dummy repo.

**Brain.**

```bash
cd brain
pip install -r requirements.txt
# Fill in .env with ANTHROPIC_API_KEY, GITHUB_APP_ID,
# GITHUB_APP_PRIVATE_KEY (or _PATH), SUPABASE_URL, SUPABASE_KEY
uvicorn main:app --reload --port 8000
```

**Dashboard.**

```bash
cd dashboard && npm install && npm run dev
```

**Edge Bot.** In the dummy repo, add `.github/workflows/perry.yml`:

```yaml
on:
  repository_dispatch:
    types: [tos_alert_broadcast]
permissions:
  contents: read
  issues: write
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          sparse-checkout: "**/package.json"
          sparse-checkout-cone-mode: false
      - uses: perry-tos/edge-bot@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

Make sure the repo's `package.json` lists a package the brain knows about (see `brain/registry.py`). Install the Perry GitHub App on the repo - the App needs **Contents: write**, otherwise `repository_dispatch` returns 403.

### If you want to try out our hosted brain

You can trigger a ToS rewrite of Meridian (our PoC company that the test repo depends on) with the following request:

```bash
curl -X POST https://perry-ax0m.onrender.com/trigger-demo | jq
```
