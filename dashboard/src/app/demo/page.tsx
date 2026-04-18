"use client";

import { Navbar } from "@/components/navbar";
import { DEMO_OLD_TOS, DEMO_NEW_TOS } from "@/lib/mock-data";
import { useState } from "react";

type PipelineStage =
  | "idle"
  | "crawling"
  | "analyzing"
  | "dispatching"
  | "complete"
  | "error";

type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
type Ecosystem = "pypi" | "npm" | "cargo" | "go" | "maven" | "rubygems";

interface BreakingChange {
  clause_ref: string;
  description: string;
  developer_impact: string;
}

interface PackageChange {
  package_name: string;
  ecosystem: Ecosystem;
  severity: Severity;
  summary: string;
  breaking_changes: BreakingChange[];
  recommended_actions: string[];
  dev_action_required: boolean;
}

interface DiffAnalysis {
  provider: string;
  overall_severity: Severity;
  summary: string;
  packages: PackageChange[];
}

interface DispatchRow {
  repo: string;
  ok: boolean;
  detail: string;
}

interface BroadcastResult {
  dispatched: number;
  failed: number;
  results: DispatchRow[];
}

interface TriggerDemoResponse {
  analysis: DiffAnalysis;
  broadcast: BroadcastResult;
}

const BRAIN_URL: string =
  process.env.NEXT_PUBLIC_BRAIN_URL ?? "https://perry-ax0m.onrender.com";

const stages: { key: Exclude<PipelineStage, "idle" | "error">; label: string }[] = [
  { key: "crawling", label: "Detecting ToS change" },
  { key: "analyzing", label: "AI analyzing diff" },
  { key: "dispatching", label: "Broadcasting to repos" },
  { key: "complete", label: "Issues opened" },
];

const severityColor: Record<Severity, string> = {
  CRITICAL: "text-red-600 bg-red-50 border-red-200",
  HIGH: "text-orange-600 bg-orange-50 border-orange-200",
  MEDIUM: "text-yellow-600 bg-yellow-50 border-yellow-200",
  LOW: "text-green-600 bg-green-50 border-green-200",
};

export default function DemoPage() {
  const [stage, setStage] = useState<PipelineStage>("idle");
  const [analysis, setAnalysis] = useState<DiffAnalysis | null>(null);
  const [broadcast, setBroadcast] = useState<BroadcastResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const runDemo = async (): Promise<void> => {
    setAnalysis(null);
    setBroadcast(null);
    setErrorMessage(null);
    setStage("crawling");

    const crawlDelay: Promise<void> = new Promise((r) => setTimeout(r, 900));

    const fetchPromise: Promise<TriggerDemoResponse> = (async () => {
      const response: Response = await fetch(`${BRAIN_URL}/trigger-demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const text: string = await response.text().catch(() => "");
        throw new Error(`Brain returned ${response.status}: ${text.slice(0, 200)}`);
      }
      return (await response.json()) as TriggerDemoResponse;
    })();

    try {
      await crawlDelay;
      setStage("analyzing");

      const data: TriggerDemoResponse = await fetchPromise;

      setAnalysis(data.analysis);
      setStage("dispatching");
      await new Promise((r) => setTimeout(r, 800));

      setBroadcast(data.broadcast);
      setStage("complete");
    } catch (error: unknown) {
      const message: string =
        error instanceof Error ? error.message : "Unknown error";
      setErrorMessage(message);
      setStage("error");
    }
  };

  const reset = (): void => {
    setStage("idle");
    setAnalysis(null);
    setBroadcast(null);
    setErrorMessage(null);
  };

  const isRunning: boolean =
    stage === "crawling" || stage === "analyzing" || stage === "dispatching";

  return (
    <div className="flex flex-col min-h-full bg-surface">
      <Navbar />

      <div className="max-w-6xl mx-auto w-full px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-[28px] font-semibold tracking-tight">
                Live Demo
              </h1>
              <span className="text-[11px] font-mono text-white bg-foreground px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Demo Mode
              </span>
            </div>
            <p className="text-[15px] text-muted">
              Simulate a ToS change and watch the full pipeline execute in real
              time
            </p>
          </div>
          <div className="flex items-center gap-3">
            {stage !== "idle" && (
              <button
                onClick={reset}
                className="text-[13px] font-medium text-muted px-4 py-2 rounded-full border border-border-light transition-colors hover:bg-white hover:text-foreground"
              >
                Reset
              </button>
            )}
            <button
              onClick={runDemo}
              disabled={isRunning}
              className="text-[13px] font-medium bg-foreground text-white px-5 py-2 rounded-full transition-all hover:bg-foreground/85 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {stage === "idle"
                ? "Trigger ToS Change"
                : stage === "complete"
                  ? "Run Again"
                  : stage === "error"
                    ? "Retry"
                    : "Running..."}
            </button>
          </div>
        </div>

        {/* Pipeline Progress */}
        <div className="bg-white border border-border-light rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between">
            {stages.map((s, i) => {
              const stageIndex: number = stages.findIndex(
                (x) => x.key === stage,
              );
              const isActive: boolean = s.key === stage;
              const isDone: boolean = stageIndex > i;
              const isErrored: boolean = stage === "error";

              return (
                <div key={s.key} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all ${
                        isErrored
                          ? "bg-red-100 text-red-600"
                          : isDone
                            ? "bg-success text-white"
                            : isActive
                              ? "bg-foreground text-white animate-pulse"
                              : "bg-border-light text-muted"
                      }`}
                    >
                      {isDone ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span
                      className={`mt-2 text-[12px] font-medium ${
                        isActive || isDone ? "text-foreground" : "text-muted"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < stages.length - 1 && (
                    <div
                      className={`h-[2px] flex-1 mx-2 rounded-full transition-colors ${
                        isDone ? "bg-success" : "bg-border-light"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {stage === "error" && errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
              <div className="flex-1">
                <div className="text-[14px] font-semibold text-red-700 mb-1">
                  Pipeline failed
                </div>
                <div className="text-[13px] text-red-600 font-mono break-all">
                  {errorMessage}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: ToS Diff */}
          <div className="space-y-6">
            <div className="bg-white border border-border-light rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-border-light flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-[13px] font-medium text-muted">
                  Old Terms (March 2025)
                </span>
              </div>
              <pre className="p-5 text-[12px] leading-relaxed text-foreground/70 font-mono overflow-x-auto whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                {DEMO_OLD_TOS}
              </pre>
            </div>

            <div className="bg-white border border-border-light rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-border-light flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-[13px] font-medium text-muted">
                  New Terms (April 2026)
                </span>
              </div>
              <pre className="p-5 text-[12px] leading-relaxed text-foreground/70 font-mono overflow-x-auto whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                {DEMO_NEW_TOS}
              </pre>
            </div>
          </div>

          {/* Right: Results */}
          <div className="space-y-6">
            {/* Provider-wide summary */}
            <div className="bg-white border border-border-light rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-border-light">
                <span className="text-[13px] font-medium text-muted">
                  AI Analysis
                </span>
              </div>
              {analysis ? (
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[15px] font-semibold">
                      {analysis.provider}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${severityColor[analysis.overall_severity]}`}
                    >
                      {analysis.overall_severity}
                    </span>
                    <span className="text-[12px] text-muted">
                      {analysis.packages.length} affected package
                      {analysis.packages.length === 1 ? "" : "s"}
                    </span>
                  </div>
                  <p className="text-[14px] text-muted leading-relaxed">
                    {analysis.summary}
                  </p>
                </div>
              ) : (
                <div className="p-12 text-center text-[14px] text-muted">
                  {stage === "idle"
                    ? "Trigger a ToS change to see the analysis"
                    : stage === "error"
                      ? "No analysis — pipeline failed"
                      : "Analyzing (this may take up to 30s)..."}
                </div>
              )}
            </div>

            {/* Per-package cards */}
            {analysis?.packages.map((pkg) => (
              <div
                key={`${pkg.ecosystem}:${pkg.package_name}`}
                className="bg-white border border-border-light rounded-2xl overflow-hidden"
              >
                <div className="px-5 py-3 border-b border-border-light flex items-center gap-3 flex-wrap">
                  <span className="text-[14px] font-mono font-semibold">
                    {pkg.package_name}
                  </span>
                  <span className="text-[11px] font-mono text-muted bg-surface px-2 py-0.5 rounded-md border border-border-light">
                    {pkg.ecosystem}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${severityColor[pkg.severity]}`}
                  >
                    {pkg.severity}
                  </span>
                  {pkg.dev_action_required && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-foreground text-white">
                      Action Required
                    </span>
                  )}
                </div>
                <div className="p-5 space-y-4">
                  <p className="text-[14px] text-muted leading-relaxed">
                    {pkg.summary}
                  </p>

                  {pkg.breaking_changes.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[12px] font-semibold text-foreground uppercase tracking-wider">
                        Breaking changes
                      </span>
                      {pkg.breaking_changes.map((change, i) => (
                        <div
                          key={i}
                          className="border-l-2 border-danger pl-3 space-y-1"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-danger">
                              {change.clause_ref}
                            </span>
                          </div>
                          <div className="text-[13px] text-foreground/80">
                            {change.description}
                          </div>
                          <div className="text-[12px] text-muted italic">
                            Impact: {change.developer_impact}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {pkg.recommended_actions.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[12px] font-semibold text-foreground uppercase tracking-wider">
                        Recommended actions
                      </span>
                      {pkg.recommended_actions.map((action, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-[13px]"
                        >
                          <span className="text-success mt-0.5 shrink-0 font-mono">
                            →
                          </span>
                          <span className="text-foreground/80">{action}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Dispatch Status */}
            <div className="bg-white border border-border-light rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-border-light flex items-center justify-between">
                <span className="text-[13px] font-medium text-muted">
                  Dispatch Status
                </span>
                {broadcast && (
                  <span className="text-[12px] text-muted">
                    {broadcast.dispatched} dispatched
                    {broadcast.failed > 0
                      ? ` · ${broadcast.failed} failed`
                      : ""}
                  </span>
                )}
              </div>
              {broadcast && broadcast.results.length > 0 ? (
                <div className="divide-y divide-border-light">
                  {broadcast.results.map((row) => (
                    <div
                      key={row.repo}
                      className="px-5 py-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="text-muted shrink-0"
                        >
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        <span className="text-[13px] font-mono truncate">
                          {row.repo}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            row.ok ? "bg-success" : "bg-danger"
                          }`}
                        />
                        <span
                          className={`text-[12px] font-medium ${
                            row.ok ? "text-success" : "text-danger"
                          }`}
                          title={row.detail}
                        >
                          {row.ok ? "Issue opened" : "Failed"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-[14px] text-muted">
                  {stage === "idle"
                    ? "No dispatches yet"
                    : stage === "complete" && broadcast
                      ? "No registered repos to dispatch to"
                      : stage === "error"
                        ? "Pipeline failed before dispatch"
                        : "Waiting for analysis..."}
                </div>
              )}
            </div>

            {/* JSON Output */}
            {analysis && (
              <div className="bg-foreground rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
                  <span className="text-[13px] font-medium text-white/50">
                    Raw JSON Response
                  </span>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        JSON.stringify({ analysis, broadcast }, null, 2),
                      )
                    }
                    className="text-[11px] text-white/40 hover:text-white/70 transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <pre className="p-5 text-[12px] leading-relaxed text-white/70 font-mono overflow-x-auto max-h-[400px] overflow-y-auto">
                  {JSON.stringify({ analysis, broadcast }, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
