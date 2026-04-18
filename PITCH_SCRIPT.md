# Perry — Pitch Script

## 0:00–1:00 — The problem

SPEAKER 1

Today, every modern product is built on top of someone else's API. OpenAI for intelligence. Stripe for payments. AWS for infrastructure. Plaid, Twilio, Shopify, GitHub — the list keeps growing.

And behind each of those APIs sits a Terms of Service page. A page that quietly changes.

How often, you ask?

**"Last year alone, OpenAI rewrote its data-use policy three times. Stripe changed chargeback terms without sending an email. AWS updated its GenAI clauses on a Friday night. And 47% of engineering teams only discover a ToS violation once it's already in production."**

Most teams don't read these pages. Legal can't possibly read every page for every vendor, every week. And engineering was never supposed to.

But the moment one of those clauses changes — about data retention, about model training, about attribution, about rate limits — your product is suddenly out of compliance. Or worse, broken. And you don't find out until a provider rate-limits you, terminates mid-contract, or a customer's lawyer does.

One silent edit on a page nobody reads can cost you two million dollars and a weekend.

---

## 1:00–1:30 — What Perry is

SPEAKER 1

That's why we built **Perry**.

Perry watches every public Terms of Service page your company depends on, detects the diff the moment it happens, and tells your engineers exactly what changed, what it breaks, and which file to fix — as a GitHub Issue opened directly in your own repo.

It is built for the people who actually have to solve this problem in real life: platform engineers, backend teams, and the legal-engineering liaisons who get paged when a provider quietly rewrites a clause.

And the part that makes Perry different: **your code never leaves your servers.** We don't scan your codebase. We broadcast a structured advisory, and the match-against-your-code step runs inside your own GitHub Action. We only ever see public ToS pages.

Instead of finding out in production, teams find out the moment the page changes.

---

## 1:30–3:00 — Demo walkthrough

SPEAKER 2

So imagine we're a fintech startup. We use Stripe for payments, OpenAI for our support copilot, and AWS for everything else. Let's see what happens when one of them quietly edits a clause.

- Open the Perry dashboard
- Click **Start Demo Mode** — "God Mode"
- Watch the pipeline light up, step by step:
  1. **Crawler** detects a change on the OpenAI ToS page — SHA-256 hash no longer matches the last snapshot.
  2. **Brain** pulls the diff, runs it through GPT-4o with a structured Instructor schema, and produces a typed advisory: *"Section 3.2 now prohibits storing model output for longer than 30 days without user consent."*
  3. **Dispatcher** signs an RS256 JWT, mints a scoped GitHub installation token for our org, and broadcasts.
  4. **Edge Bot** — running inside our own GitHub Action — receives the advisory, scans our manifest for code paths that store OpenAI responses, and opens an Issue in our repo.
- Switch to the customer's GitHub tab. The Issue is already there. Title, affected files, suggested remediation.

End-to-end: under ten seconds. Zero code left our servers. And the engineer on-call knows before the provider's enforcement window even begins.

That's Perry.
