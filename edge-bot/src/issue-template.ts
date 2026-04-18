import { DiffAnalysis, PackageChange, Severity } from "./types";

const SEVERITY_LABEL: Record<Severity, string> = {
  CRITICAL: "[CRITICAL]",
  HIGH: "[HIGH]",
  MEDIUM: "[MEDIUM]",
  LOW: "[LOW]",
};

export function formatIssueTitle(
  analysis: DiffAnalysis,
  pkg: PackageChange,
): string {
  return `${SEVERITY_LABEL[pkg.severity]} ${analysis.provider} ToS change affects ${pkg.package_name}`;
}

export function formatIssueBody(
  analysis: DiffAnalysis,
  pkg: PackageChange,
  manifestPaths: string[],
  marker: string,
): string {
  const lines: string[] = [];

  lines.push(`## ${analysis.provider} updated their Terms of Service`);
  lines.push("");
  lines.push(`This advisory affects \`${pkg.package_name}\`, which is declared in:`);
  for (const p of manifestPaths) lines.push(`- \`${p}\``);
  lines.push("");

  lines.push("| | |");
  lines.push("|---|---|");
  lines.push(`| **Provider** | ${analysis.provider} |`);
  lines.push(`| **Package** | \`${pkg.package_name}\` (${pkg.ecosystem}) |`);
  lines.push(`| **Package severity** | ${pkg.severity} |`);
  lines.push(`| **Overall severity** | ${analysis.overall_severity} |`);
  lines.push(`| **Engineering action required** | ${pkg.dev_action_required ? "Yes" : "No"} |`);
  lines.push("");

  lines.push("### Package summary");
  lines.push("");
  lines.push(pkg.summary);
  lines.push("");

  if (pkg.breaking_changes && pkg.breaking_changes.length > 0) {
    lines.push("### Breaking changes");
    lines.push("");
    for (const change of pkg.breaking_changes) {
      lines.push(`#### ${change.clause_ref}`);
      lines.push("");
      lines.push(change.description);
      lines.push("");
      lines.push(`**Developer impact:** ${change.developer_impact}`);
      lines.push("");
    }
  }

  if (pkg.recommended_actions && pkg.recommended_actions.length > 0) {
    lines.push("### Recommended actions");
    lines.push("");
    for (const action of pkg.recommended_actions) {
      lines.push(`- [ ] ${action}`);
    }
    lines.push("");
  }

  lines.push("### Provider-wide context");
  lines.push("");
  lines.push(analysis.summary);
  lines.push("");

  lines.push("---");
  lines.push("");
  lines.push(
    "*Created by [Perry](https://github.com/perry-tos/edge-bot). " +
      "Your dependency list never left this repository — Perry compared " +
      "the broadcast against your local `package.json` inside the runner.*",
  );
  lines.push("");
  lines.push(marker);

  return lines.join("\n");
}
