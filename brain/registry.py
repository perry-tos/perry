from typing import Literal

from pydantic import BaseModel

Ecosystem = Literal["pypi", "npm", "cargo", "go", "maven", "rubygems"]


class RegistryEntry(BaseModel):
    package_name: str
    ecosystem: Ecosystem
    surface: str


PACKAGE_REGISTRY: dict[str, list[RegistryEntry]] = {
    "openai": [
        RegistryEntry(
            package_name="openai",
            ecosystem="npm",
            surface=(
                "Official Node.js SDK. Covers chat completions, responses, "
                "embeddings, files, assistants, audio, images, batch, and "
                "fine-tuning. Affected by any API-surface, auth, rate-limit, "
                "data-retention, or training-opt-out change."
            ),
        ),
        RegistryEntry(
            package_name="@langchain/openai",
            ecosystem="npm",
            surface=(
                "LangChain JS OpenAI integration. Affected by SDK-breaking "
                "changes, model deprecations, and response-shape changes."
            ),
        ),
    ],
    "anthropic": [
        RegistryEntry(
            package_name="@anthropic-ai/sdk",
            ecosystem="npm",
            surface=(
                "Official Node.js SDK. Covers messages API, streaming, tool "
                "use, and batch. Affected by API-surface, auth, rate-limit, "
                "or data-retention changes."
            ),
        ),
    ],
    "meridian pay": [
        RegistryEntry(
            package_name="meridian-node",
            ecosystem="npm",
            surface=(
                "Official Node.js SDK. Covers card authorization, capture, "
                "refunds, payouts, stablecoin settlement, webhook signature "
                "verification, and customer/PII storage. Affected by any "
                "data-handling, privacy, retention, monetization, or "
                "consent-flow change."
            ),
        ),
        RegistryEntry(
            package_name="meridian-python",
            ecosystem="pypi",
            surface=(
                "Official Python SDK. Same surface as meridian-node — "
                "authorization, settlement, reconciliation, webhooks, and "
                "customer data storage. Affected by any data-handling, "
                "privacy, retention, monetization, or consent-flow change."
            ),
        ),
    ],
}


def get_registry(provider: str) -> list[RegistryEntry]:
    return PACKAGE_REGISTRY.get(provider.lower().strip(), [])
