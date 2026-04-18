import json

import instructor
from anthropic import Anthropic

from config import ANTHROPIC_API_KEY, ANTHROPIC_MAX_TOKENS, ANTHROPIC_MODEL
from registry import get_registry
from schemas import DiffAnalysis

_client: instructor.Instructor | None = None


def _get_client() -> instructor.Instructor:
    global _client
    if _client is not None:
        return _client
    if not ANTHROPIC_API_KEY:
        raise RuntimeError("ANTHROPIC_API_KEY must be set in the environment")
    _client = instructor.from_anthropic(Anthropic(api_key=ANTHROPIC_API_KEY))
    return _client


SYSTEM_PROMPT = """You are Perry, an expert SaaS compliance analyst.

You compare two versions of a provider's Terms of Service (or equivalent API
policy / developer agreement) and produce a structured, per-package change
report for downstream CI bots that open GitHub issues in customer repos.

Inputs you receive:
- The provider name.
- A CANDIDATE PACKAGES registry: the SDKs and libraries through which
  customers integrate with this provider. Each entry has a package_name,
  ecosystem, and a short description of its surface area.
- The OLD and NEW ToS markdown.

Rules:
- For each candidate package, decide whether the diff materially affects it.
  "Materially affects" means a developer using that package would have to
  change code, configuration, pinned versions, runtime behavior, cost
  modeling, or data-handling practice.
- OMIT packages with no material impact. Do not emit a package whose
  breaking_changes and recommended_actions would both be empty.
- Do NOT invent packages. Only emit packages whose (package_name, ecosystem)
  pair appears verbatim in the provided registry.
- Ignore whitespace-only edits and cosmetic rewording.
- Package severity scale:
    CRITICAL -> breaking API changes, data-ownership shifts, or immediate
                legal exposure affecting THIS package.
    HIGH     -> action needed within ~30 days; pricing / rate-limit
                reductions; changes to data retention, auth, or SLAs.
    MEDIUM   -> default behavior shifts that are opt-out or future-dated.
    LOW      -> clarifications with no behavioral change.
- overall_severity is the maximum severity across the emitted packages.
  If no packages are affected, set overall_severity to LOW and write a
  summary explaining why the diff is non-impactful for this provider's SDKs.
- breaking_changes must cite a clause reference from the NEW document
  (e.g. "§3.2", "Section 4.1", "Rate Limits heading").
- developer_impact must name concrete nouns: SDK methods, endpoints, fields,
  quotas, retention windows, billing tiers.
- recommended_actions must be imperative and package-scoped, e.g.
  "Pin openai<2.0 until audit complete",
  "Call client.data_controls.opt_out() before 2026-05-01".
- A package's dev_action_required is true iff at least one of its
  recommended_actions requires engineering work on code touching that
  package.
- Echo the provider name exactly as supplied by the user.
"""


def analyze_diff(old_markdown: str, new_markdown: str, provider: str) -> DiffAnalysis:
    client = _get_client()
    registry = get_registry(provider)
    registry_json = json.dumps(
        [entry.model_dump() for entry in registry],
        indent=2,
    )
    user_content = (
        f"Provider: {provider}\n\n"
        f"--- CANDIDATE PACKAGES ---\n{registry_json}\n\n"
        f"--- OLD ToS ---\n{old_markdown}\n\n"
        f"--- NEW ToS ---\n{new_markdown}"
    )
    return client.messages.create(
        model=ANTHROPIC_MODEL,
        max_tokens=ANTHROPIC_MAX_TOKENS,
        response_model=DiffAnalysis,
        system=SYSTEM_PROMPT,
        messages=[
            {"role": "user", "content": user_content},
        ],
        temperature=0.1,
        max_retries=2,
    )
