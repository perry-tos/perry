from typing import Literal

from pydantic import BaseModel, Field


class DiffAnalyzeRequest(BaseModel):
    old_markdown: str = Field(..., description="Previous ToS version as markdown")
    new_markdown: str = Field(..., description="Current ToS version as markdown")
    provider: str = Field(..., description="Provider/company name, e.g. 'OpenAI'")


class BreakingChange(BaseModel):
    clause_ref: str = Field(
        ...,
        description="Section or clause reference, e.g. '§3.2' or 'Section 4.1'",
    )
    description: str = Field(
        ...,
        description="Plain-language description of what changed in this clause",
    )
    developer_impact: str = Field(
        ...,
        description=(
            "Concrete impact on engineering: affected SDKs, endpoints, "
            "rate limits, retention windows, or behavioral defaults"
        ),
    )


class DiffAnalysis(BaseModel):
    provider: str = Field(..., description="Provider/company name whose ToS changed")
    severity: Literal["CRITICAL", "HIGH", "MEDIUM", "LOW"] = Field(
        ...,
        description=(
            "CRITICAL = breaking API/data-ownership changes or immediate legal exposure. "
            "HIGH = action needed within 30 days, pricing/rate-limit reductions. "
            "MEDIUM = default behavior shifts that are opt-out or future-dated. "
            "LOW = cosmetic rewording, no behavioral change."
        ),
    )
    summary: str = Field(
        ...,
        description="One-paragraph executive summary of the overall change",
    )
    breaking_changes: list[BreakingChange] = Field(default_factory=list)
    recommended_actions: list[str] = Field(
        default_factory=list,
        description="Concrete, imperative action items for engineering teams",
    )
    dev_action_required: bool = Field(
        ...,
        description="True iff at least one recommended_action requires engineering work",
    )


class BroadcastResult(BaseModel):
    dispatched: int
    failed: int
    results: list[dict]
