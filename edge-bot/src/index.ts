import * as core from "@actions/core";
import * as github from "@actions/github";
import { discoverNpmPackages } from "./scanner";
import { isDiffAnalysis, PackageChange } from "./types";
import { computeAdvisoryId } from "./advisory";
import { createOrUpdateIssue, ensurePerryLabel } from "./issue";

const EXPECTED_EVENT = "repository_dispatch";
const EXPECTED_ACTION = "tos_alert_broadcast";

async function run(): Promise<void> {
  try {
    const token = core.getInput("github-token", { required: true });
    const pattern = core.getInput("package-glob") || "**/package.json";

    const ctx = github.context;
    if (ctx.eventName !== EXPECTED_EVENT) {
      core.warning(
        `Perry expects a "${EXPECTED_EVENT}" event but received "${ctx.eventName}". ` +
          `Continuing in case the broadcast was attached manually.`,
      );
    }

    const action = (ctx.payload as { action?: string }).action;
    if (ctx.eventName === EXPECTED_EVENT && action !== EXPECTED_ACTION) {
      core.info(
        `Skipping: repository_dispatch action is "${action}", not "${EXPECTED_ACTION}".`,
      );
      core.setOutput("issues_created", "0");
      core.setOutput("affected_packages", "");
      return;
    }

    const payload = (ctx.payload as { client_payload?: unknown }).client_payload;
    if (!isDiffAnalysis(payload)) {
      core.setFailed(
        "Missing or invalid client_payload. The Perry brain must dispatch the DiffAnalysis schema.",
      );
      return;
    }

    const advisoryId = computeAdvisoryId(payload);
    core.info(
      `Broadcast: provider="${payload.provider}", overall_severity=${payload.overall_severity}, advisoryId=${advisoryId}`,
    );

    const npmPackages: PackageChange[] = (payload.packages ?? []).filter(
      (p) => p.ecosystem === "npm",
    );
    if (npmPackages.length === 0) {
      core.info("Broadcast contains no npm packages. Nothing to scan.");
      finishOutputs([], 0);
      return;
    }

    const { byName, manifestCount } = await discoverNpmPackages(pattern);
    core.info(
      `Scanned ${manifestCount} package.json file(s) and found ${byName.size} unique dependencies.`,
    );

    const matched = npmPackages
      .map((pkg) => {
        const paths = byName.get(pkg.package_name.toLowerCase());
        return paths ? { pkg, paths } : null;
      })
      .filter((m): m is { pkg: PackageChange; paths: string[] } => m !== null);

    if (matched.length === 0) {
      core.info(
        "None of the broadcast's npm packages are declared in this repo. Nothing to do.",
      );
      finishOutputs([], 0);
      await writeSummary(payload.provider, payload.overall_severity, npmPackages.length, byName.size, 0, 0);
      return;
    }

    const matchedNames = matched.map((m) => m.pkg.package_name);
    core.info(`Affected packages in this repo: ${matchedNames.join(", ")}`);

    const octokit = github.getOctokit(token);
    const { owner, repo } = ctx.repo;
    await ensurePerryLabel(octokit, owner, repo);

    let issuesTouched = 0;
    for (const { pkg, paths } of matched) {
      try {
        await createOrUpdateIssue(octokit, owner, repo, advisoryId, payload, pkg, paths);
        issuesTouched += 1;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        core.error(`Failed to create/update issue for ${pkg.package_name}: ${msg}`);
      }
    }

    finishOutputs(matchedNames, issuesTouched);
    await writeSummary(
      payload.provider,
      payload.overall_severity,
      npmPackages.length,
      byName.size,
      matched.length,
      issuesTouched,
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    core.setFailed(`perry edge-bot failed: ${msg}`);
  }
}

function finishOutputs(matchedNames: string[], count: number): void {
  core.setOutput("issues_created", String(count));
  core.setOutput("affected_packages", matchedNames.join(","));
}

async function writeSummary(
  provider: string,
  severity: string,
  broadcastNpmCount: number,
  localDepCount: number,
  matchedCount: number,
  issuesTouched: number,
): Promise<void> {
  await core.summary
    .addHeading("Perry — ToS Change Watcher")
    .addRaw(`Provider: **${provider}**`)
    .addEOL()
    .addRaw(`Overall severity: **${severity}**`)
    .addEOL()
    .addTable([
      [
        { data: "Metric", header: true },
        { data: "Value", header: true },
      ],
      ["NPM packages in broadcast", String(broadcastNpmCount)],
      ["Dependencies in this repo", String(localDepCount)],
      ["Affected packages", String(matchedCount)],
      ["Issues created/updated", String(issuesTouched)],
      ["Dependency data sent off-runner", "None"],
    ])
    .write();
}

void run();
