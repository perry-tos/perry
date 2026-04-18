# Dashboard — Control Plane

## Responsibility

Onboarding UI for customers to install the GitHub App, webhook receiver for installation events, and a "God Mode" demo panel for triggering simulated ToS changes during the hackathon presentation.

## Stack

- Next.js 14+ (App Router)
- TailwindCSS
- Supabase JS client (@supabase/supabase-js)
- TypeScript (strict mode)

## Key Files/Routes

| Path | Purpose |
|------|---------|
| `app/page.tsx` | Landing page with "Protect My Org" CTA |
| `app/dashboard/page.tsx` | Main dashboard — registered orgs, alert history |
| `app/demo/page.tsx` | God Mode panel — trigger simulated ToS changes |
| `app/api/webhooks/github/route.ts` | GitHub App webhook receiver |
| `lib/supabase.ts` | Supabase client initialization |
| `lib/types.ts` | Shared TypeScript types |

## Webhook Handler

The `/api/webhooks/github` route:
1. Validates HMAC SHA-256 signature from `X-Hub-Signature-256` header
2. Checks event type from `X-GitHub-Event` header
3. On `installation.created`: upserts `organization` + `repositories` into Supabase
4. Returns 200 OK

```typescript
// Signature validation
const sig = headers.get("X-Hub-Signature-256");
const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
hmac.update(body);
const expected = `sha256=${hmac.digest("hex")}`;
if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
  return Response.json({ error: "Invalid signature" }, { status: 401 });
}
```

## God Mode (Demo Panel)

For the hackathon demo — hardcoded buttons that:
1. Call the Brain's `/diff-analyze` with pre-prepared old/new ToS markdown
2. Show the real-time flow: crawl detected → brain analyzed → dispatch sent → issue opened
3. Display the structured JSON response on screen

This bypasses the Crawler entirely for reliable, repeatable demos.

## Development

```bash
npm install
npm run dev  # http://localhost:3000
```

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=        # server-side only, for webhook handler
GITHUB_WEBHOOK_SECRET=       # for HMAC validation
BRAIN_API_URL=http://localhost:8000  # Brain service URL
```

## Conventions

- All server-side logic in Route Handlers (`app/api/`)
- Client components use `"use client"` directive
- Tailwind only — no CSS modules or styled-components
- Supabase queries use the typed client from `lib/supabase.ts`
