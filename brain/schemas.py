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
        description="Clause reference from the new document, e.g. '§3.2'",
    )
    description: str = Field(
        ...,
        description="Plain-language description of what changed in this clause",
    )
    developer_impact: str = Field(
        ...,
        description=(
            "Concrete impact on engineering: affected endpoints, fields, "
            "quotas, retention windows, or billing tiers"
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
        description="One-paragraph executive summary scoped to this package",
    )
    breaking_changes: list[BreakingChange] = Field(default_factory=list)
    recommended_actions: list[str] = Field(
        default_factory=list,
        description="Imperative, package-scoped action items",
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
        description="Provider-wide executive summary of the diff",
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
