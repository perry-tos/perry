import * as core from "@actions/core";
import * as github from "@actions/github";
import { DiffAnalysis, PackageChange } from "./types";
import { dedupMarker } from "./advisory";
import { formatIssueBody, formatIssueTitle } from "./issue-template";

type Octokit = ReturnType<typeof github.getOctokit>;

const PERRY_LABEL = "perry";

export async function ensurePerryLabel(
  octokit: Octokit,
  owner: string,
  repo: string,
): Promise<void> {
  try {
    await octokit.rest.issues.getLabel({ owner, repo, name: PERRY_LABEL });
  } catch (err) {
    const status = (err as { status?: number }).status;
    if (status !== 404) return;
    try {
      await octokit.rest.issues.createLabel({
        owner,
        repo,
        name: PERRY_LABEL,
        color: "ededed",
        description: "Opened by the Perry ToS watcher",
      });
    } catch {
      // Race or insufficient permission — issue creation will still succeed.
    }
  }
}

export async function createOrUpdateIssue(
  octokit: Octokit,
  owner: string,
  repo: string,
  advisoryId: string,
  analysis: DiffAnalysis,
  pkg: PackageChange,
  manifestPaths: string[],
): Promise<{ number: number; action: "created" | "updated" }> {
  const marker = dedupMarker(advisoryId, pkg);
  const title = formatIssueTitle(analysis, pkg);
  const body = formatIssueBody(analysis, pkg, manifestPaths, marker);
  const labels = [PERRY_LABEL, `perry:severity:${pkg.severity.toLowerCase()}`];

  const existing = await findExistingIssue(octokit, owner, repo, marker);

  if (existing) {
    await octokit.rest.issues.update({
      owner,
      repo,
      issue_number: existing.number,
      title,
      body,
      state: "open",
      labels,
    });
    core.info(`Updated existing issue #${existing.number} for ${pkg.package_name}`);
    return { number: existing.number, action: "updated" };
  }

  const created = await octokit.rest.issues.create({
    owner,
    repo,
    title,
    body,
    labels,
  });
  core.info(`Created issue #${created.data.number} for ${pkg.package_name}`);
  return { number: created.data.number, action: "created" };
}

async function findExistingIssue(
  octokit: Octokit,
  owner: string,
  repo: string,
  marker: string,
): Promise<{ number: number } | null> {
  const issues = await octokit.paginate(octokit.rest.issues.listForRepo, {
    owner,
    repo,
    labels: PERRY_LABEL,
    state: "all",
    per_page: 100,
  });

  for (const issue of issues) {
    if (issue.body && issue.body.includes(marker)) {
      return { number: issue.number };
    }
  }
  return null;
}
