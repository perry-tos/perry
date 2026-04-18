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
}


def get_registry(provider: str) -> list[RegistryEntry]:
    return PACKAGE_REGISTRY.get(provider.lower().strip(), [])
