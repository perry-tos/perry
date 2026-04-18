# Brain — AI Engine & Dispatcher

## Responsibility

Receives old/new ToS markdown from the Crawler, uses GPT-4o with structured output to analyze the diff, then broadcasts the alert to all registered customer GitHub repos via GitHub App authentication.

## Stack

- Python 3.11+
- FastAPI + uvicorn
- Instructor (structured LLM output)
- Pydantic v2 (strict schema validation)
- OpenAI Python SDK (GPT-4o)
- PyJWT (RS256 JWT generation for GitHub App auth)
- Requests / httpx (GitHub API calls)
- Supabase Python client

## Key Files

| File | Purpose |
|------|---------|
| `main.py` | FastAPI app with `/diff-analyze` endpoint |
| `analyzer.py` | Instructor-wrapped OpenAI client, Pydantic output schema |
| `dispatcher.py` | JWT generation → Installation Token → repository_dispatch broadcast |
| `schemas.py` | All Pydantic models (input, output, GitHub payloads) |
| `config.py` | Env vars, Supabase client init |

## Pydantic Output Schema (Strict)

```python
class TosChange(BaseModel):
    affected_api_sdk: str
    severity: Literal["CRITICAL", "HIGH", "MEDIUM", "LOW"]
    executive_summary: str
    dev_action_required: bool
    changes: list[str]
```

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
  "source_url": "string"
}

Response 200:
{
  "affected_api_sdk": "OpenAI API",
  "severity": "HIGH",
  "executive_summary": "...",
  "dev_action_required": true,
  "changes": ["...", "..."]
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

- Instructor requires `instructor.from_openai(OpenAI())` — don't use raw client
- PyJWT: use `jwt.encode(payload, key, algorithm="RS256")` — the key must be the raw PEM string
- GitHub Installation Tokens expire in 1 hour — generate fresh per broadcast cycle
- `repository_dispatch` payload max is ~10KB — keep `changes` list concise
