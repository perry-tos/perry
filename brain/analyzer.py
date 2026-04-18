import instructor
from openai import OpenAI

from config import OPENAI_API_KEY, OPENAI_MODEL
from schemas import DiffAnalysis

_client: instructor.Instructor | None = None


def _get_client() -> instructor.Instructor:
    global _client
    if _client is not None:
        return _client
    if not OPENAI_API_KEY:
        raise RuntimeError("OPENAI_API_KEY must be set in the environment")
    _client = instructor.from_openai(OpenAI(api_key=OPENAI_API_KEY))
    return _client


SYSTEM_PROMPT = """You are Perry, an expert SaaS compliance analyst.

You compare two versions of a provider's Terms of Service (or equivalent API policy /
developer agreement) and produce a structured change report.

Rules:
- Focus on substantive changes. Ignore whitespace-only edits and cosmetic rewording.
- severity:
    CRITICAL -> breaking API changes, data-ownership shifts, immediate legal exposure.
    HIGH     -> action needed within ~30 days, pricing or rate-limit reductions,
                changes to data retention, auth, or SLAs.
    MEDIUM   -> default behavior shifts that are opt-out or future-dated.
    LOW      -> cosmetic rewording, clarifications, no behavioral change.
- breaking_changes must cite a clause reference (e.g. "§3.2", "Section 4.1",
  "Rate Limits heading"). Prefer the exact reference from the new document.
- developer_impact must be concrete: mention SDK versions, endpoints, fields, quotas,
  retention periods, or billing tiers when available.
- recommended_actions must be imperative and actionable
  (e.g. "Pin openai==1.14 until audit complete", "Rotate tier-1 rate-limit alerts
  to fire at 3,500 RPM").
- dev_action_required is true iff at least one recommended_action requires engineering
  work.
- Echo the provider name exactly as supplied by the user.
"""


def analyze_diff(old_markdown: str, new_markdown: str, provider: str) -> DiffAnalysis:
    client = _get_client()
    user_content = (
        f"Provider: {provider}\n\n"
        f"--- OLD ToS ---\n{old_markdown}\n\n"
        f"--- NEW ToS ---\n{new_markdown}"
    )
    return client.chat.completions.create(
        model=OPENAI_MODEL,
        response_model=DiffAnalysis,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_content},
        ],
        temperature=0.1,
        max_retries=2,
    )
