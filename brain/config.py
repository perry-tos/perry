import os

from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv()

OPENAI_API_KEY: str | None = os.getenv("OPENAI_API_KEY")
GITHUB_APP_ID: str | None = os.getenv("GITHUB_APP_ID")

_raw_private_key: str = os.getenv("GITHUB_APP_PRIVATE_KEY", "")
GITHUB_APP_PRIVATE_KEY: str = _raw_private_key.replace("\\n", "\n")

SUPABASE_URL: str | None = os.getenv("SUPABASE_URL")
SUPABASE_KEY: str | None = os.getenv("SUPABASE_KEY")

OPENAI_MODEL: str = os.getenv("OPENAI_MODEL", "gpt-4o")

_supabase_client: Client | None = None


def get_supabase() -> Client:
    global _supabase_client
    if _supabase_client is not None:
        return _supabase_client
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise RuntimeError("SUPABASE_URL and SUPABASE_KEY must be set in the environment")
    _supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
    return _supabase_client
