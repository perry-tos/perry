# Brain — AI Engine & Dispatcher

## Responsibility

Receives old/new ToS markdown from the Crawler, uses Claude Sonnet with structured output to analyze the diff, then broadcasts the alert to all registered customer GitHub repos via GitHub App authentication.

## Stack

- Python 3.11+
- FastAPI + uvicorn
- Instructor (structured LLM output)
- Pydantic v2 (strict schema validation)
- Anthropic Python SDK (Claude Sonnet)
- PyJWT (RS256 JWT generation for GitHub App auth)
- Requests / httpx (GitHub API calls)
- Supabase Python client

## Key Files

| File | Purpose |
|------|---------|
| `main.py` | FastAPI app with `/diff-analyze`, `/broadcast`, `/trigger-demo` endpoints |
| `analyzer.py` | Instructor-wrapped Anthropic client; feeds registry slice + diff to Claude |
| `dispatcher.py` | JWT generation → Installation Token → repository_dispatch broadcast |
| `schemas.py` | Pydantic models: `DiffAnalysis`, `PackageChange`, `BreakingChange`, `BroadcastResult` |
| `registry.py` | Static per-provider SDK registry (candidate packages the LLM assigns changes to) |
| `config.py` | Env vars, Supabase client init, GitHub App PEM loading |

## Pydantic Output Schema (Strict)

One `DiffAnalysis` per ToS diff, containing one `PackageChange` per materially
affected SDK. Unaffected packages are omitted. The edge bot iterates
`packages` and opens one GitHub issue per matched package in the customer repo.

```python
class BreakingChange(BaseModel):
    clause_ref: str              # "§3.2", "Section 4.1", etc. (from NEW doc)
    description: str
    developer_impact: str

class PackageChange(BaseModel):
    package_name: str            # "openai", "@anthropic-ai/sdk", ...
    ecosystem: Literal["pypi", "npm", "cargo", "go", "maven", "rubygems"]
    severity: Literal["CRITICAL", "HIGH", "MEDIUM", "LOW"]
    summary: str                 # package-scoped
    breaking_changes: list[BreakingChange]
    recommended_actions: list[str]
    dev_action_required: bool

class DiffAnalysis(BaseModel):
    provider: str
    overall_severity: Literal["CRITICAL", "HIGH", "MEDIUM", "LOW"]  # max across packages
    summary: str                 # provider-wide exec summary
    packages: list[PackageChange]
```

## Package Registry

`registry.py::PACKAGE_REGISTRY` is a static dict keyed by lowercased provider
name. Each entry lists candidate SDKs/libraries with their ecosystem and a
surface description. The analyzer passes the provider's slice of the registry
into the LLM prompt; the LLM may only emit packages whose
`(package_name, ecosystem)` pair appears in that slice. Add new providers by
appending to the dict.

## GitHub App Auth Flow

1. Build JWT: `{"iat": now, "exp": now+600, "iss": GITHUB_APP_ID}` signed with RS256 `.pem`
2. Exchange: `POST /app/installations/{id}/access_tokens` with JWT Bearer
3. Broadcast: `POST /repos/{owner}/{repo}/dispatches` with `event_type: "tos_alert_broadcast"` and `client_payload` containing the Pydantic JSON

## API Contract

```
POST /diff-analyze
Content-Type: application/json

{
  "old_markdown": "string",
  "new_markdown": "string",
  "provider": "OpenAI"
}

Response 200:
{
  "provider": "OpenAI",
  "overall_severity": "HIGH",
  "summary": "...",
  "packages": [
    {
      "package_name": "openai",
      "ecosystem": "pypi",
      "severity": "HIGH",
      "summary": "...",
      "breaking_changes": [
        {"clause_ref": "§3.2", "description": "...", "developer_impact": "..."}
      ],
      "recommended_actions": ["..."],
      "dev_action_required": true
    }
  ]
}
```

## Testing

```bash
uvicorn main:app --reload --port 8000
# Test endpoint
curl -X POST http://localhost:8000/diff-analyze \
  -H "Content-Type: application/json" \
  -d '{"old_markdown": "old text", "new_markdown": "new text", "source_url": "https://example.com/tos"}'
```

## Common Pitfalls

- Instructor requires `instructor.from_anthropic(Anthropic())` — don't use raw client
- Anthropic's `messages.create` needs an explicit `max_tokens` (set via `ANTHROPIC_MAX_TOKENS`) and `system` is a top-level kwarg, not a role in `messages`
- PyJWT: use `jwt.encode(payload, key, algorithm="RS256")` — the key must be the raw PEM string
- GitHub Installation Tokens expire in 1 hour — generate fresh per broadcast cycle
- `repository_dispatch` payload max is ~10KB — keep per-package `breaking_changes` and `recommended_actions` lists concise; with 3+ packages this limit can bite
- The LLM must only emit packages from the registry slice it was given — the prompt enforces this, but verify on new providers before shipping
- If the provider isn't in `PACKAGE_REGISTRY`, the analyzer still runs but returns `packages: []` with an explanatory summary
