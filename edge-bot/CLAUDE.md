# Edge Bot — Zero-Knowledge GitHub Action

## Responsibility

Open-source GitHub Action that customers install. Triggered by `repository_dispatch` from the Brain, scans local dependency manifests for the affected SDK, and opens a GitHub Issue if found. **Customer code never leaves their VPC.**

## Stack

- Node.js 20
- @actions/core (inputs, outputs, logging)
- @actions/github (Octokit for issue creation)
- @actions/glob (file discovery)
- Vercel ncc (single-file compilation)

## Key Files

| File | Purpose |
|------|---------|
| `src/index.ts` | Main entry — reads dispatch payload, scans manifests, opens issue |
| `src/scanner.ts` | Parses package.json, requirements.txt, go.mod, pom.xml |
| `src/issue-template.ts` | Markdown template for the GitHub Issue |
| `action.yml` | GitHub Action metadata |
| `dist/index.js` | ncc-compiled single file (committed to repo) |

## How It Works

1. Triggered by: `on: repository_dispatch: types: [tos_alert_broadcast]`
2. Reads `github.context.payload.client_payload` containing the Brain's analysis
3. Uses `@actions/glob` to find manifests up to depth 3 (ignoring `node_modules`)
4. Parses each manifest type natively (JSON.parse for package.json, line-by-line for requirements.txt)
5. If `affected_api_sdk` found in any manifest → opens Issue via Octokit
6. **Zero outbound network requests** beyond GitHub's own API (issue creation uses the runner's native token)

## Customer Workflow File

```yaml
# .github/workflows/tos-scan.yml
name: ToS Change Scanner
on:
  repository_dispatch:
    types: [tos_alert_broadcast]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: perry-tos/edge-bot@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

## Manifest Parsing Rules

| File | How to detect SDK |
|------|-------------------|
| `package.json` | Check `dependencies` + `devDependencies` keys |
| `requirements.txt` | Line starts with package name (before `==`, `>=`, etc.) |
| `go.mod` | `require` block entries |
| `pom.xml` | `<groupId>` + `<artifactId>` matching |

## Build

```bash
npm install
npm run build        # tsc
npm run package      # ncc build dist/index.js -o dist
```

## Testing

```bash
# Unit tests
npm test

# Local simulation (set INPUT_ env vars)
INPUT_GITHUB-TOKEN=fake \
GITHUB_EVENT_PATH=test/fixtures/dispatch.json \
node dist/index.js
```

## Common Pitfalls

- `ncc` output MUST be committed — GitHub Actions runs from the repo, not npm
- Don't regex across arbitrary source files — only parse known manifest formats
- `@actions/glob` patterns: use `**/package.json` with `!**/node_modules/**`
- The `github-token` input is the repo's `GITHUB_TOKEN`, not a PAT
