from typing import Literal

from pydantic import BaseModel, Field

Severity = Literal["CRITICAL", "HIGH", "MEDIUM", "LOW"]
Ecosystem = Literal["pypi", "npm", "cargo", "go", "maven", "rubygems"]


class DiffAnalyzeRequest(BaseModel):
    old_markdown: str = Field(..., description="Previous ToS version as markdown")
    new_markdown: str = Field(..., description="Current ToS version as markdown")
    provider: str = Field(..., description="Provider/company name, e.g. 'OpenAI'")


class BreakingChange(BaseModel):
    clause_ref: str = Field(
        ...,
        description="Short clause ref from the NEW doc, e.g. '§3.2'. No sentences.",
    )
    description: str = Field(
        ...,
        description=(
            "What the NEW clause says, ~25 words max. Plain, no hedging."
        ),
    )
    developer_impact: str = Field(
        ...,
        description=(
            "Concrete nouns only (SDK methods, endpoints, fields, quotas, "
            "retention windows, billing tiers). ~15 words max."
        ),
    )


class PackageChange(BaseModel):
    package_name: str = Field(
        ...,
        description="Package identifier matching a manifest entry (e.g. 'openai')",
    )
    ecosystem: Ecosystem = Field(
        ...,
        description="Package ecosystem — tells the edge bot which manifest to scan",
    )
    severity: Severity = Field(
        ...,
        description="Severity scoped to this package's exposure",
    )
    summary: str = Field(
        ...,
        description=(
            "ONE sentence, ~25 words max, scoped to this SDK's surface. "
            "What changed for code using this package."
        ),
    )
    breaking_changes: list[BreakingChange] = Field(default_factory=list)
    recommended_actions: list[str] = Field(
        default_factory=list,
        description=(
            "Imperative, tech-specific action items, ~12 words each. "
            "Name SDK methods, version pins, or config flags."
        ),
    )
    dev_action_required: bool = Field(
        ...,
        description="True iff this package requires engineering work",
    )


class DiffAnalysis(BaseModel):
    provider: str = Field(..., description="Provider/company name whose ToS changed")
    overall_severity: Severity = Field(
        ...,
        description="Maximum severity across all affected packages",
    )
    summary: str = Field(
        ...,
        description=(
            "Provider-wide headline: 1-2 sentences, ~40 words max. Lead with "
            "the biggest change and its dev-facing consequence. No legal prose."
        ),
    )
    packages: list[PackageChange] = Field(
        default_factory=list,
        description=(
            "One entry per SDK/library materially affected by the diff. "
            "Unaffected packages are omitted."
        ),
    )


class BroadcastResult(BaseModel):
    dispatched: int
    failed: int
    results: list[dict]
