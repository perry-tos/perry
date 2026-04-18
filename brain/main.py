import asyncio

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from analyzer import analyze_diff
from dispatcher import broadcast_alert
from schemas import BroadcastResult, DiffAnalysis, DiffAnalyzeRequest

app = FastAPI(title="Perry Brain", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


DEMO_PROVIDER = "OpenAI"

DEMO_OLD_MARKDOWN = """# OpenAI Terms of Use

## 3. Content

### 3.1 Your Content
You retain your ownership rights in Content that you submit to the Services
("Input"). Subject to your compliance with these Terms, OpenAI hereby assigns to
you all of its right, title and interest in and to Output.

### 3.2 Use of Content to Improve Services
We do not use Content that you provide to or receive from our API ("API Content")
to develop or improve our Services. We may use Content from Services other than
our API ("Non-API Content") to help develop and improve our Services.

### 3.3 Data Retention
API Content is retained for 30 days for abuse-monitoring purposes and then
permanently deleted, unless otherwise required by law.

## 4. Rate Limits
Default tier-1 accounts are granted 10,000 RPM on gpt-4o endpoints.
"""

DEMO_NEW_MARKDOWN = """# OpenAI Terms of Use

## 3. Content

### 3.1 Your Content
You retain your ownership rights in Content that you submit to the Services
("Input"). Subject to your compliance with these Terms, OpenAI hereby assigns to
you all of its right, title and interest in and to Output.

### 3.2 Use of Content to Improve Services
Effective May 1, 2026, OpenAI may use API Content submitted via the
`/v1/chat/completions` and `/v1/responses` endpoints to train and improve our
models, unless (a) you are subscribed to an Enterprise plan, or (b) you have
explicitly opted out via the Data Controls dashboard at least 24 hours before
the effective date.

### 3.3 Data Retention
API Content subject to Section 3.2 will be retained for up to 90 days to support
model-training pipelines. Enterprise and opted-out traffic remains on the prior
30-day retention window.

## 4. Rate Limits
Effective immediately, the default tier-1 rate limit for gpt-4o endpoints is
reduced from 10,000 RPM to 3,500 RPM. Per-token pricing is unchanged.
Customers requiring the prior limit must request a tier upgrade.
"""


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/diff-analyze", response_model=DiffAnalysis)
def diff_analyze(request: DiffAnalyzeRequest) -> DiffAnalysis:
    try:
        return analyze_diff(request.old_markdown, request.new_markdown, request.provider)
    except RuntimeError as error:
        raise HTTPException(status_code=500, detail=str(error)) from error


@app.post("/broadcast", response_model=BroadcastResult)
async def broadcast(analysis: DiffAnalysis) -> BroadcastResult:
    try:
        return await broadcast_alert(analysis)
    except RuntimeError as error:
        raise HTTPException(status_code=500, detail=str(error)) from error


@app.post("/trigger-demo")
async def trigger_demo() -> dict:
    try:
        analysis = await asyncio.to_thread(
            analyze_diff,
            DEMO_OLD_MARKDOWN,
            DEMO_NEW_MARKDOWN,
            DEMO_PROVIDER,
        )
    except RuntimeError as error:
        raise HTTPException(status_code=500, detail=f"analyzer: {error}") from error

    try:
        broadcast_result = await broadcast_alert(analysis)
    except RuntimeError as error:
        raise HTTPException(
            status_code=500,
            detail=f"dispatcher: {error}",
        ) from error

    return {
        "analysis": analysis.model_dump(),
        "broadcast": broadcast_result.model_dump(),
    }
