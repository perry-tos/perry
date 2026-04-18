"use client";

import { Navbar } from "@/components/navbar";
import { DEMO_OLD_TOS, DEMO_NEW_TOS } from "@/lib/mock-data";
import { useState } from "react";

type PipelineStage = "idle" | "crawling" | "analyzing" | "dispatching" | "complete";

interface AnalysisResult {
  affected_api_sdk: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  executive_summary: string;
  dev_action_required: boolean;
  changes: string[];
}

const mockResult: AnalysisResult = {
  affected_api_sdk: "openai",
  severity: "CRITICAL",
  executive_summary:
    "OpenAI has changed their default data usage policy. API inputs will now be used for model training unless you opt out via a new API endpoint. The previous email-based opt-out is being deprecated. Data retention has been extended from 30 to 90 days.",
  dev_action_required: true,
  changes: [
    "Section 3.2: API inputs may now be used for model training by default — previously excluded",
    "Section 3.4: Email opt-out deprecated, replaced with /v1/organization/data-controls endpoint",
    "Section 7.1: Data retention extended from 30 to 90 days for abuse monitoring",
  ],
};

const stages: { key: PipelineStage; label: string; duration: number }[] = [
  { key: "crawling", label: "Detecting ToS change", duration: 1200 },
  { key: "analyzing", label: "AI analyzing diff", duration: 2500 },
  { key: "dispatching", label: "Broadcasting to repos", duration: 800 },
  { key: "complete", label: "Issues opened", duration: 0 },
];

export default function DemoPage() {
  const [stage, setStage] = useState<PipelineStage>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [dispatchedRepos, setDispatchedRepos] = useState<string[]>([]);

  const runDemo = async () => {
    setResult(null);
    setDispatchedRepos([]);

    for (const s of stages) {
      setStage(s.key);
      if (s.duration > 0) {
        await new Promise((r) => setTimeout(r, s.duration));
      }
      if (s.key === "analyzing") {
        setResult(mockResult);
      }
      if (s.key === "dispatching") {
        setDispatchedRepos([
          "acme/api-gateway",
          "acme/ml-pipeline",
          "datalab/llm-trainer",
        ]);
      }
    }
  };

  const reset = () => {
    setStage("idle");
    setResult(null);
    setDispatchedRepos([]);
  };

  const severityColor = {
    CRITICAL: "text-red-600 bg-red-50 border-red-200",
    HIGH: "text-orange-600 bg-orange-50 border-orange-200",
    MEDIUM: "text-yellow-600 bg-yellow-50 border-yellow-200",
    LOW: "text-green-600 bg-green-50 border-green-200",
  };

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
                God Mode
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
              disabled={stage !== "idle" && stage !== "complete"}
              className="text-[13px] font-medium bg-foreground text-white px-5 py-2 rounded-full transition-all hover:bg-foreground/85 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {stage === "idle"
                ? "Trigger ToS Change"
                : stage === "complete"
                  ? "Run Again"
                  : "Running..."}
            </button>
          </div>
        </div>

        {/* Pipeline Progress */}
        <div className="bg-white border border-border-light rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between">
            {stages.map((s, i) => {
              const stageIndex = stages.findIndex((x) => x.key === stage);
              const thisIndex = i;
              const isActive = s.key === stage;
              const isDone = stageIndex > thisIndex;
              const isPending = stageIndex < thisIndex;

              return (
                <div key={s.key} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all ${
                        isDone
                          ? "bg-success text-white"
                          : isActive
                            ? "bg-foreground text-white animate-pulse"
                            : isPending
                              ? "bg-border-light text-muted"
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
            {/* Analysis Result */}
            <div className="bg-white border border-border-light rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-border-light">
                <span className="text-[13px] font-medium text-muted">
                  AI Analysis
                </span>
              </div>
              {result ? (
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[15px] font-semibold">
                      {result.affected_api_sdk}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${severityColor[result.severity]}`}
                    >
                      {result.severity}
                    </span>
                    {result.dev_action_required && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-foreground text-white">
                        Action Required
                      </span>
                    )}
                  </div>
                  <p className="text-[14px] text-muted leading-relaxed">
                    {result.executive_summary}
                  </p>
                  <div className="space-y-2">
                    <span className="text-[12px] font-semibold text-foreground uppercase tracking-wider">
                      Changes
                    </span>
                    {result.changes.map((change, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-[13px]"
                      >
                        <span className="text-danger mt-0.5 shrink-0 font-mono">
                          ~
                        </span>
                        <span className="text-foreground/80">{change}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center text-[14px] text-muted">
                  {stage === "idle"
                    ? "Trigger a ToS change to see the analysis"
                    : "Analyzing..."}
                </div>
              )}
            </div>

            {/* Dispatch Status */}
            <div className="bg-white border border-border-light rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-border-light">
                <span className="text-[13px] font-medium text-muted">
                  Dispatch Status
                </span>
              </div>
              {dispatchedRepos.length > 0 ? (
                <div className="divide-y divide-border-light">
                  {dispatchedRepos.map((repo) => (
                    <div
                      key={repo}
                      className="px-5 py-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="text-muted"
                        >
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        <span className="text-[13px] font-mono">{repo}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-success" />
                        <span className="text-[12px] text-success font-medium">
                          Issue opened
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-[14px] text-muted">
                  {stage === "idle"
                    ? "No dispatches yet"
                    : "Waiting for analysis..."}
                </div>
              )}
            </div>

            {/* JSON Output */}
            {result && (
              <div className="bg-foreground rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
                  <span className="text-[13px] font-medium text-white/50">
                    Raw JSON Response
                  </span>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        JSON.stringify(result, null, 2)
                      )
                    }
                    className="text-[11px] text-white/40 hover:text-white/70 transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <pre className="p-5 text-[12px] leading-relaxed text-white/70 font-mono overflow-x-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
