"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const CRITICAL_SNIPPET = "permanently and irrecoverably deleted from all Evil Incorporation systems";

export default function EvilCorpPage() {
  const [tosContent, setTosContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const tosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/tos")
      .then((r) => r.json())
      .then((data) => {
        setTosContent(data.content);
        setWordCount(data.wordCount);
        setLastUpdated(data.lastUpdated);
        setIsLoading(false);
      });
  }, []);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setSaveSuccess(false);
    // Set plaintext content for editing
    requestAnimationFrame(() => {
      if (tosRef.current) {
        tosRef.current.innerText = tosContent;
      }
    });
  }, [tosContent]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    // Restore content from state
    if (tosRef.current) {
      tosRef.current.innerText = tosContent;
    }
  }, [tosContent]);

  const handleUpdate = useCallback(async () => {
    if (!tosRef.current) return;
    setIsSaving(true);
    const newContent = tosRef.current.innerText;

    const res = await fetch("/api/tos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newContent }),
    });
    const data = await res.json();

    setTosContent(newContent);
    setWordCount(data.wordCount);
    setLastUpdated(data.lastUpdated);
    setIsEditing(false);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  }, []);

  const scrollToTos = () => {
    document.getElementById("terms")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* ── Navbar ────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-bold text-sm">
              E
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Evil Incorporation
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#platform" className="hover:text-white transition-colors">Platform</a>
            <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
            <a href="#enterprise" className="hover:text-white transition-colors">Enterprise</a>
            <a href="#developers" className="hover:text-white transition-colors">Developers</a>
            <a href="#terms" className="hover:text-white transition-colors">Legal</a>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-1.5">
              Sign In
            </button>
            <button className="text-sm bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded-lg transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px]" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 mb-8 text-xs text-zinc-400">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Now processing 847B data points daily
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Empowering Enterprise
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
                Through Intelligence
              </span>
            </h1>
          </div>
          <p className="animate-fade-in-delay text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Evil Incorporation delivers next-generation data intelligence, cloud
            infrastructure, and AI-powered analytics to the world&apos;s most
            ambitious organizations. Your data. Our insights. Unlimited
            potential.
          </p>
          <div className="animate-fade-in-delay flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-red-600/20">
              Start Free Trial
            </button>
            <button className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 px-8 py-3 rounded-lg text-sm font-medium transition-all">
              Schedule Demo
            </button>
          </div>
          <div className="mt-16 flex items-center justify-center gap-8 text-zinc-500 text-xs">
            <span>Trusted by 10,000+ organizations</span>
            <span className="w-px h-4 bg-zinc-800" />
            <span>SOC 2 Type II</span>
            <span className="w-px h-4 bg-zinc-800" />
            <span>ISO 27001</span>
            <span className="w-px h-4 bg-zinc-800" />
            <span>GDPR Compliant*</span>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────── */}
      <section id="platform" className="py-24 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            One Platform. Infinite Possibilities.
          </h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-16">
            From real-time analytics to predictive modeling, Evil Incorporation
            provides everything your organization needs to turn raw data into
            competitive advantage.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "{}",
                title: "Unified Data Fabric",
                description:
                  "Connect, ingest, and harmonize data from any source with our proprietary data fabric technology. Process petabytes in real-time with sub-millisecond latency.",
              },
              {
                icon: "AI",
                title: "Autonomous AI Engine",
                description:
                  "Our self-learning AI models continuously analyze your data to surface actionable insights, predict trends, and automate decision-making at enterprise scale.",
              },
              {
                icon: ">>",
                title: "Hyper-Scale Cloud",
                description:
                  "Deploy across 47 global regions with automatic scaling, geo-redundancy, and guaranteed 99.999% uptime. Your infrastructure, our obsession.",
              },
              {
                icon: "||",
                title: "Compliance Shield",
                description:
                  "Navigate complex regulatory landscapes with built-in compliance frameworks for GDPR, CCPA, HIPAA, SOX, and 200+ regulatory standards worldwide.",
              },
              {
                icon: "<>",
                title: "Developer Platform",
                description:
                  "Build on our comprehensive API ecosystem with 500+ endpoints, native SDKs for 12 languages, and a thriving marketplace of 3,000+ integrations.",
              },
              {
                icon: "[]",
                title: "Zero-Trust Security",
                description:
                  "Enterprise-grade security with end-to-end encryption, hardware-backed key management, and continuous threat monitoring across all touchpoints.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700 transition-colors"
              >
                <div className="w-10 h-10 bg-red-600/10 border border-red-600/20 rounded-lg flex items-center justify-center text-red-500 text-sm font-mono mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-zinc-900 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "847B+", label: "Data points processed daily" },
            { value: "10,000+", label: "Enterprise customers" },
            { value: "99.999%", label: "Platform uptime" },
            { value: "47", label: "Global data regions" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-bold text-red-500 mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA → Terms ───────────────────────────────── */}
      <section className="py-20 px-6 border-t border-zinc-900 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Transform Your Data Strategy?
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto mb-8">
          Join thousands of organizations already using Evil Incorporation to
          unlock the full potential of their data assets.
        </p>
        <button className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-lg text-sm font-medium transition-all mb-16">
          Start Your Free Trial
        </button>
        <div className="flex items-center justify-center gap-2 text-zinc-600 text-xs">
          <button onClick={scrollToTos} className="hover:text-zinc-400 transition-colors underline underline-offset-2">
            Terms of Service
          </button>
          <span>·</span>
          <span>Privacy Policy</span>
          <span>·</span>
          <span>Cookie Policy</span>
          <span>·</span>
          <span>Acceptable Use</span>
        </div>
        <div
          className="mt-8 animate-bounce-slow cursor-pointer text-zinc-700"
          onClick={scrollToTos}
        >
          <svg
            className="mx-auto w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* ── Terms of Service ──────────────────────────── */}
      <section
        id="terms"
        className="border-t border-zinc-900 bg-zinc-950"
      >
        {/* Admin bar */}
        <div className="sticky top-16 z-40 bg-zinc-900/90 backdrop-blur-xl border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-semibold text-zinc-300">
                Terms of Service
              </h2>
              {!isLoading && (
                <>
                  <span className="text-xs text-zinc-600">
                    {wordCount.toLocaleString()} words
                  </span>
                  <span className="text-xs text-zinc-600">
                    Last updated: {new Date(lastUpdated).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </>
              )}
              {isEditing && (
                <span className="flex items-center gap-1.5 text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  Editing
                </span>
              )}
              {saveSuccess && (
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Terms updated successfully
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-md transition-colors border border-zinc-700"
                >
                  Edit Terms
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={isSaving}
                    className="text-xs bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white px-4 py-1.5 rounded-md transition-colors flex items-center gap-1.5"
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Publishing...
                      </>
                    ) : (
                      "Publish Changes"
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ToS content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-zinc-600 text-sm">
              Loading terms of service...
            </div>
          ) : isEditing ? (
            <div
              ref={tosRef}
              contentEditable
              suppressContentEditableWarning
              className="tos-text whitespace-pre-wrap max-w-none focus:outline-none"
            />
          ) : (
            <div
              ref={tosRef}
              className="tos-text whitespace-pre-wrap max-w-none"
              dangerouslySetInnerHTML={{ __html: escapeHtml(tosContent) }}
            />
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-900 py-8 px-6 text-center text-zinc-700 text-xs">
          <p>
            &copy; 2024-2026 Evil Incorporation Holdings, LLC. All rights
            reserved.
          </p>
          <p className="mt-1">
            Evil Incorporation&trade; is a registered trademark. Document
            Reference: EI-TOS-2024-Q1-REV47
          </p>
        </div>
      </section>
    </div>
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
