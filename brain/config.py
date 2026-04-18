import os

from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv()

ANTHROPIC_API_KEY: str | None = os.getenv("ANTHROPIC_API_KEY")
GITHUB_APP_ID: str | None = os.getenv("GITHUB_APP_ID")

_raw_private_key: str = os.getenv("GITHUB_APP_PRIVATE_KEY", "")
_private_key_path: str = os.getenv("GITHUB_APP_PRIVATE_KEY_PATH", "")
if not _raw_private_key and _private_key_path and os.path.exists(_private_key_path):
    with open(_private_key_path, "r") as _pem_file:
        _raw_private_key = _pem_file.read()
GITHUB_APP_PRIVATE_KEY: str = _raw_private_key.replace("\\n", "\n")

SUPABASE_URL: str | None = os.getenv("SUPABASE_URL")
SUPABASE_KEY: str | None = os.getenv("SUPABASE_KEY")

ANTHROPIC_MODEL: str = os.getenv("ANTHROPIC_MODEL", "claude-sonnet-4-6")
ANTHROPIC_MAX_TOKENS: int = int(os.getenv("ANTHROPIC_MAX_TOKENS", "4096"))

_supabase_client: Client | None = None


def get_supabase() -> Client:
    global _supabase_client
    if _supabase_client is not None:
        return _supabase_client
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise RuntimeError("SUPABASE_URL and SUPABASE_KEY must be set in the environment")
    _supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
    return _supabase_client
