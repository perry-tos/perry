export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export type Ecosystem =
  | "pypi"
  | "npm"
  | "cargo"
  | "go"
  | "maven"
  | "rubygems";

export interface BreakingChange {
  clause_ref: string;
  description: string;
  developer_impact: string;
}

export interface PackageChange {
  package_name: string;
  ecosystem: Ecosystem;
  severity: Severity;
  summary: string;
  breaking_changes?: BreakingChange[];
  recommended_actions?: string[];
  dev_action_required: boolean;
}

export interface DiffAnalysis {
  provider: string;
  overall_severity: Severity;
  summary: string;
  packages?: PackageChange[];
}

export function isDiffAnalysis(value: unknown): value is DiffAnalysis {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.provider === "string" &&
    typeof v.summary === "string" &&
    typeof v.overall_severity === "string" &&
    ["CRITICAL", "HIGH", "MEDIUM", "LOW"].includes(v.overall_severity as string)
  );
}
