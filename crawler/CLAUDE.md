# Crawler — Data Ingestion Service

## Responsibility

Monitors public ToS/API documentation pages, extracts clean text, detects changes via content hashing, and triggers the Brain when a real change occurs.

## Stack

- Python 3.11+
- Playwright (with `playwright-stealth` for Cloudflare bypass)
- BeautifulSoup4 (DOM cleanup)
- html2text (HTML → Markdown conversion for token savings)
- hashlib (SHA-256 content dedup)
- Supabase Python client (store hashes and historical snapshots)

## Key Files

| File | Purpose |
|------|---------|
| `main.py` | Entry point — orchestrates crawl → clean → hash → trigger |
| `scraper.py` | Playwright-based page fetcher with stealth config |
| `cleaner.py` | BS4 stripping of nav/header/footer/script/style + html2text |
| `hasher.py` | SHA-256 hash comparison against last stored hash |
| `wayback.py` | Wayback Machine CDX API client for historical baselines |
| `config.py` | Target URLs, Supabase connection, timing config |

## Architecture Notes

- Strip `<nav>`, `<header>`, `<footer>`, `<script>`, `<style>` before conversion
- Hash the **Markdown output**, not raw HTML (HTML can change cosmetically without content change)
- If hash matches last DB entry → stop (no LLM call, no alert)
- If hash differs → POST `old.md` + `new.md` to Brain's `/diff-analyze`
- Wayback CDX API: `https://web.archive.org/cdx/search/cdx?url={url}&output=json` for seeding

## Testing

```bash
# Test scraper against a known URL
python -m pytest tests/ -v

# Manual crawl
python main.py --url "https://openai.com/policies/terms-of-use" --once
```

## Common Pitfalls

- Playwright needs `playwright install chromium` after pip install
- Some ToS pages load content via JS — always wait for `networkidle` or specific selector
- Rate limit Wayback API calls (no auth required but they throttle)
- html2text can mangle complex tables — test with real pages early
