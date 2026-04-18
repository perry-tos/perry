# Perry — Edge Bot

Zero-knowledge GitHub Action that opens an issue when a third-party provider's
Terms of Service change affects an npm dependency in your repo.

The Action runs entirely on the GitHub Actions runner. Your dependency list,
package versions, and source code never leave the runner. The only outbound
traffic is the GitHub Issues API call to your own repo.

## Install (60 seconds)

1. **Install the Perry GitHub App** on the repos you want monitored.
   That gives Perry the `repository_dispatch` permission so the brain can
   broadcast advisories to the repo without you touching any secrets.

2. **Add a workflow file** at `.github/workflows/perry.yml`:

   ```yaml
   name: Perry — ToS Change Watcher

   on:
     repository_dispatch:
       types: [tos_alert_broadcast]

   permissions:
     contents: read
     issues: write

   jobs:
     scan:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
           with:
             sparse-checkout: |
               package.json
               **/package.json
             sparse-checkout-cone-mode: false
         - uses: perry-tos/edge-bot@v1
           with:
             github-token: ${{ secrets.GITHUB_TOKEN }}
   ```

   That's all. No API keys, no env vars, no shared secrets.

## How it works

1. The Perry brain detects a ToS change for some provider, classifies the
   diff per affected SDK, and dispatches a `tos_alert_broadcast` event with
   the full advisory payload to every installed repo.
2. This Action receives the broadcast on the runner, scans `package.json`
   files locally, and filters the broadcast to only the packages your repo
   actually depends on.
3. For each affected package, it opens (or updates) a GitHub issue in your
   repo with the breaking changes and recommended actions.

The "broadcast and filter" pattern is what keeps things zero-knowledge: the
brain never learns which packages you depend on. It just shouts the advisory
into every repo, and the runner — which already has access to your manifest —
decides whether to act.

## Inputs

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `github-token` | yes | — | Token with `issues: write`. Pass `secrets.GITHUB_TOKEN`. |
| `package-glob` | no | `**/package.json` | Glob for manifests to scan. Files under `node_modules/` are always skipped. |

## Outputs

| Name | Description |
|------|-------------|
| `issues_created` | Number of issues created or updated this run. |
| `affected_packages` | Comma-separated list of package names that matched. |

## Scope

Currently only `package.json` (npm) is supported. PyPI, Cargo, Go modules,
Maven and RubyGems will be added later — the broadcast schema already carries
those ecosystems, so the brain side is ready when we ship parsers for them.

## Local development

```bash
cd edge-bot
npm install
npm run all   # tsc + ncc bundle into dist/index.js

# Simulate a dispatch locally
GITHUB_REPOSITORY=perry-tos/demo-app \
GITHUB_EVENT_NAME=repository_dispatch \
GITHUB_EVENT_PATH=$(pwd)/test/fixtures/dispatch.json \
INPUT_GITHUB-TOKEN=ghp_fake_will_fail_at_octokit \
INPUT_PACKAGE-GLOB=test/fixtures/package.json \
node dist/index.js
```

The Octokit call will fail with a fake token, but you'll see the matcher
identify `openai` (and skip `@openai/agents`, which isn't in the fixture's
`package.json`) before that point.

## Roadmap

- Email notifications via SMTP/Resend
- Self-hostable advisory dashboard (Docker container)
- Additional ecosystems: pypi, cargo, go, maven, rubygems
