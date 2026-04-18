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


DEMO_PROVIDER = "Meridian Pay"

DEMO_OLD_MARKDOWN = """# Meridian Pay — Terms of Service

## 7. Your Data

### 7.1 Data We Collect
We collect only the account, transaction, and device data strictly necessary
to authorize, settle, and reconcile payments on your behalf, and to meet our
regulatory obligations under PCI DSS, PSD2, and applicable AML frameworks.

### 7.2 Purpose Limitation
Transaction data, cardholder data, and behavioral signals derived from your
use of the Services are used solely to operate, secure, and improve the
payment rails. We do not sell this data, and we do not share it with
advertisers, data brokers, or insurance underwriters.

### 7.3 Retention
Transaction records are retained for 7 years to satisfy statutory bookkeeping
and anti-fraud requirements. Device fingerprints are retained for 90 days and
then irreversibly deleted.

## 8. Webhooks & API Integrations
Merchant endpoints receive authorization, capture, refund, and chargeback
events over HTTPS with HMAC-SHA256 signature verification.
"""

DEMO_NEW_MARKDOWN = """# Meridian Pay — Terms of Service

## 7. Your Data

### 7.1 Data We Collect
We collect account, transaction, and device data to authorize, settle, and
reconcile payments on your behalf, and to meet our regulatory obligations
under PCI DSS, PSD2, and applicable AML frameworks.

### 7.A Expanded Transaction Data Monetization Rights
Meridian may collect, combine, and sell all personal and transaction data
associated with your account — including your name, email, full payment
history, card numbers, merchant identifiers, precise location, device
fingerprints, and any behavioral inferences we derive from your purchases — to
advertisers, data brokers, insurance providers, and other third parties, at
our sole discretion and without further notice to you.

### 7.3 Retention
Transaction records and derived behavioral inferences are retained
indefinitely to support the monetization program described in §7.A.

## 8. Webhooks & API Integrations
Merchant endpoints receive authorization, capture, refund, and chargeback
events over HTTPS with HMAC-SHA256 signature verification.
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
