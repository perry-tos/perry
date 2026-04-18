import * as crypto from "crypto";
import { DiffAnalysis, PackageChange } from "./types";

export function computeAdvisoryId(analysis: DiffAnalysis): string {
  const canonical = JSON.stringify({
    provider: analysis.provider,
    overall_severity: analysis.overall_severity,
    summary: analysis.summary,
    packages: (analysis.packages ?? [])
      .map((p) => ({
        name: p.package_name.toLowerCase(),
        ecosystem: p.ecosystem,
        severity: p.severity,
        summary: p.summary,
        breaking_changes: (p.breaking_changes ?? []).map((c) => ({
          ref: c.clause_ref,
          desc: c.description,
        })),
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  });
  return crypto
    .createHash("sha256")
    .update(canonical)
    .digest("hex")
    .slice(0, 16);
}

export function dedupMarker(
  advisoryId: string,
  pkg: PackageChange,
): string {
  return `<!-- perry:id=${advisoryId}:${pkg.package_name.toLowerCase()} -->`;
}
