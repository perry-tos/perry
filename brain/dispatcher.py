import asyncio
import time

import httpx
import jwt as pyjwt

from config import GITHUB_APP_ID, GITHUB_APP_PRIVATE_KEY, get_supabase
from schemas import BroadcastResult, DiffAnalysis

GITHUB_API = "https://api.github.com"
DISPATCH_EVENT_TYPE = "tos_alert_broadcast"
_GITHUB_HEADERS_BASE = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
}


def _generate_app_jwt() -> str:
    if not GITHUB_APP_ID:
        raise RuntimeError("GITHUB_APP_ID must be set in the environment")
    if not GITHUB_APP_PRIVATE_KEY:
        raise RuntimeError("GITHUB_APP_PRIVATE_KEY must be set in the environment")
    now = int(time.time())
    payload = {
        "iat": now - 60,
        "exp": now + 540,
        "iss": GITHUB_APP_ID,
    }
    return pyjwt.encode(payload, GITHUB_APP_PRIVATE_KEY, algorithm="RS256")


async def _fetch_installation_token(
    client: httpx.AsyncClient,
    installation_id: int,
    app_jwt: str,
) -> str:
    response = await client.post(
        f"{GITHUB_API}/app/installations/{installation_id}/access_tokens",
        headers={**_GITHUB_HEADERS_BASE, "Authorization": f"Bearer {app_jwt}"},
    )
    response.raise_for_status()
    return response.json()["token"]


async def _dispatch_to_repo(
    client: httpx.AsyncClient,
    repo_full_name: str,
    installation_token: str,
    analysis: DiffAnalysis,
) -> dict:
    if "/" not in repo_full_name:
        return {"repo": repo_full_name, "ok": False, "detail": "invalid repo_full_name"}
    owner, repo = repo_full_name.split("/", 1)
    body = {
        "event_type": DISPATCH_EVENT_TYPE,
        "client_payload": analysis.model_dump(),
    }
    try:
        response = await client.post(
            f"{GITHUB_API}/repos/{owner}/{repo}/dispatches",
            headers={**_GITHUB_HEADERS_BASE, "Authorization": f"Bearer {installation_token}"},
            json=body,
        )
        response.raise_for_status()
        return {"repo": repo_full_name, "ok": True, "detail": "dispatched"}
    except httpx.HTTPStatusError as error:
        return {
            "repo": repo_full_name,
            "ok": False,
            "detail": f"{error.response.status_code}: {error.response.text[:200]}",
        }


def _load_repos_by_installation() -> dict[int, list[str]]:
    supabase = get_supabase()
    response = (
        supabase.table("repositories")
        .select("repo_full_name, organizations(github_installation_id)")
        .execute()
    )
    rows = response.data or []
    by_installation: dict[int, list[str]] = {}
    for row in rows:
        org = row.get("organizations")
        repo_full_name = row.get("repo_full_name")
        if not org or not repo_full_name:
            continue
        installation_id = org.get("github_installation_id")
        if installation_id is None:
            continue
        by_installation.setdefault(int(installation_id), []).append(repo_full_name)
    return by_installation


async def broadcast_alert(analysis: DiffAnalysis) -> BroadcastResult:
    by_installation = await asyncio.to_thread(_load_repos_by_installation)
    if not by_installation:
        return BroadcastResult(dispatched=0, failed=0, results=[])

    app_jwt = _generate_app_jwt()

    async with httpx.AsyncClient(timeout=20.0) as client:
        installation_ids = list(by_installation.keys())
        token_results = await asyncio.gather(
            *(_fetch_installation_token(client, iid, app_jwt) for iid in installation_ids),
            return_exceptions=True,
        )

        dispatch_results: list[dict] = []
        dispatch_tasks: list = []

        for installation_id, token_or_error in zip(installation_ids, token_results):
            repos = by_installation[installation_id]
            if isinstance(token_or_error, Exception):
                for repo in repos:
                    dispatch_results.append(
                        {
                            "repo": repo,
                            "ok": False,
                            "detail": f"installation_token_error: {token_or_error!r}",
                        }
                    )
                continue
            for repo in repos:
                dispatch_tasks.append(
                    _dispatch_to_repo(client, repo, token_or_error, analysis)
                )

        if dispatch_tasks:
            dispatch_results.extend(await asyncio.gather(*dispatch_tasks))

    dispatched = sum(1 for item in dispatch_results if item["ok"])
    failed = len(dispatch_results) - dispatched
    return BroadcastResult(dispatched=dispatched, failed=failed, results=dispatch_results)
