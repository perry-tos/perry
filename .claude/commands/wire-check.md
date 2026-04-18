Verify that all four microservices can communicate with each other correctly.

## Integration Points to Check

### 1. Crawler → Brain
- Crawler POSTs to Brain's `/diff-analyze` endpoint
- Verify: URL configuration, request body shape matches Brain's expected input
- Check: Brain is importable/runnable, endpoint exists and accepts the right schema

### 2. Brain → Supabase
- Brain queries `organizations` and `repositories` tables for dispatch targets
- Verify: Supabase client is configured, tables exist, query returns expected shape

### 3. Brain → GitHub API (Dispatch)
- Brain generates JWT → exchanges for installation token → sends repository_dispatch
- Verify: JWT generation code exists, env vars for APP_ID and PEM are referenced
- Check: dispatch payload matches what Edge Bot expects in `client_payload`

### 4. Dashboard → Supabase
- Dashboard reads/writes organizations and repositories
- Verify: Supabase client initialization, correct table names, type safety

### 5. Dashboard Webhook → Supabase
- GitHub sends `installation.created` → Dashboard upserts org + repos
- Verify: HMAC validation code, correct event handling, upsert logic

### 6. Dashboard God Mode → Brain
- Demo panel calls Brain's `/diff-analyze` directly
- Verify: URL configuration, CORS settings on Brain if cross-origin

### 7. Brain Dispatch → Edge Bot
- `repository_dispatch` with `event_type: "tos_alert_broadcast"` triggers the action
- Verify: Edge Bot's `action.yml` and workflow trigger match the dispatch event type
- Check: `client_payload` field names match what Edge Bot reads

## Output

For each integration point:
- **Status**: Connected / Partial / Missing
- **What's working**: specific code references
- **What's missing**: specific gaps to fix
- **Fix**: concrete code to add

Prioritize fixes by demo impact — what breaks the live demo vs. what's nice-to-have.
