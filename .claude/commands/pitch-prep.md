Help structure and refine our hackathon pitch. Optimize for clarity, narrative arc, and judge impact.

## Pitch Structure (3-5 minutes)

### 1. The Hook (30 sec)
- Open with a concrete, scary scenario: "Last Tuesday, OpenAI quietly changed their ToS. If you're using their API, your data rights just changed — and you probably don't know yet."
- Establish urgency and relevance

### 2. The Problem (45 sec)
- Companies depend on dozens of API providers (OpenAI, Stripe, AWS, etc.)
- ToS changes happen silently and frequently
- Legal and engineering teams are blindsided
- Real examples: OpenAI training data clause changes, Stripe fee structure updates
- No existing tool monitors this systematically

### 3. The Solution — Perry (45 sec)
- "Perry watches ToS pages so you don't have to"
- AI-powered diff analysis with severity classification
- Zero-knowledge architecture: your code never leaves your infrastructure
- Automated GitHub Issues alert the right teams

### 4. Live Demo (90 sec)
- Walk through the God Mode demo flow
- Show the real-time pipeline: detect → analyze → broadcast → issue
- Highlight the professional issue template

### 5. Architecture Deep Dive (30 sec)
- Zero-knowledge broadcast pattern diagram
- Why this matters: IP protection, compliance, trust

### 6. Impact & Vision (30 sec)
- Every company using third-party APIs needs this
- Expandable to privacy policies, DPAs, SLAs
- EU AI Act compliance angle: automated monitoring of AI provider terms

## What to Do

1. Read the current codebase to understand what's actually built (not just planned)
2. Draft the full pitch script with specific talking points
3. Identify the **"wow moment"** — what will make judges remember us
4. Prepare answers for likely judge questions:
   - "How is this different from a simple web scraper?"
   - "What happens with false positives?"
   - "How do you handle ToS pages that require login?"
   - "What's the business model?"
5. Suggest any last-minute visual improvements to the dashboard for demo impact
