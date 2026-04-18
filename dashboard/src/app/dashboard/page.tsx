"use client";

import { Navbar } from "@/components/navbar";
import { mockAlerts, mockOrganizations } from "@/lib/mock-data";
import { useState } from "react";

const severityConfig = {
  CRITICAL: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    dot: "bg-red-500",
  },
  HIGH: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    dot: "bg-orange-500",
  },
  MEDIUM: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
    dot: "bg-yellow-500",
  },
  LOW: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    dot: "bg-green-500",
  },
};

export default function DashboardPage() {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-full bg-surface">
      <Navbar />

      <div className="max-w-6xl mx-auto w-full px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[28px] font-semibold tracking-tight">
              Dashboard
            </h1>
            <p className="text-[15px] text-muted mt-1">
              Monitor ToS changes across your organization
            </p>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-muted bg-white border border-border-light rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-glow" />
            All systems operational
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Providers monitored" value="214" />
          <StatCard label="Active organizations" value="3" />
          <StatCard label="Alerts this week" value="4" />
          <StatCard
            label="Action required"
            value="2"
            valueColor="text-danger"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alert Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-border-light rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border-light flex items-center justify-between">
                <h2 className="text-[15px] font-semibold">Recent Alerts</h2>
                <span className="text-[12px] text-muted">Last 7 days</span>
              </div>

              <div className="divide-y divide-border-light">
                {mockAlerts.map((alert) => {
                  const config = severityConfig[alert.severity];
                  const isExpanded = selectedAlert === alert.id;

                  return (
                    <button
                      key={alert.id}
                      onClick={() =>
                        setSelectedAlert(isExpanded ? null : alert.id)
                      }
                      className="w-full text-left px-5 py-4 transition-colors hover:bg-surface/50"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${config.dot}`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-[15px] font-semibold">
                              {alert.provider}
                            </span>
                            <span
                              className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.text} ${config.border} border`}
                            >
                              {alert.severity}
                            </span>
                            {alert.actionRequired && (
                              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-foreground text-white">
                                Action Required
                              </span>
                            )}
                          </div>
                          <p className="text-[14px] text-muted leading-relaxed">
                            {alert.summary}
                          </p>

                          {isExpanded && (
                            <div className="mt-4 space-y-2">
                              {alert.changes.map((change, i) => (
                                <div
                                  key={i}
                                  className="flex items-start gap-2 text-[13px] text-foreground/80"
                                >
                                  <span className="text-muted mt-0.5 shrink-0">
                                    &bull;
                                  </span>
                                  <span>{change}</span>
                                </div>
                              ))}
                              <a
                                href={alert.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-2 text-[13px] text-accent hover:underline"
                              >
                                View source &rarr;
                              </a>
                            </div>
                          )}

                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-[12px] text-muted">
                              {alert.detectedAt}
                            </span>
                            <span className="text-[12px] text-muted">
                              {isExpanded ? "Click to collapse" : "Click to expand"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Organizations */}
            <div className="bg-white border border-border-light rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border-light">
                <h2 className="text-[15px] font-semibold">Organizations</h2>
              </div>
              <div className="divide-y divide-border-light">
                {mockOrganizations.map((org) => (
                  <div key={org.id} className="px-5 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[14px] font-semibold">
                        {org.name}
                      </span>
                      <span className="text-[12px] text-muted">
                        {org.installedAt}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {org.repos.map((repo) => (
                        <span
                          key={repo}
                          className="text-[11px] font-mono text-muted bg-surface px-2 py-0.5 rounded-md border border-border-light"
                        >
                          {repo}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-border-light rounded-2xl p-5">
              <h2 className="text-[15px] font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <ActionButton label="Add organization" />
                <ActionButton label="Configure alerts" />
                <ActionButton label="View all providers" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  valueColor = "text-foreground",
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="bg-white border border-border-light rounded-2xl p-5">
      <div className="text-[12px] text-muted mb-1">{label}</div>
      <div className={`text-[28px] font-semibold tracking-tight ${valueColor}`}>
        {value}
      </div>
    </div>
  );
}

function ActionButton({ label }: { label: string }) {
  return (
    <button className="w-full flex items-center justify-between text-[14px] text-foreground px-4 py-2.5 rounded-xl border border-border-light transition-colors hover:bg-surface hover:border-border">
      {label}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-muted"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );
}
