"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { UPDATE_MARKER, BAD_PARAGRAPH, BAD_PHRASES } from "@/lib/tos-generator";

// ── Animation timings (total = 10s) ──────────────────────────────
const SCROLL_DURATION_MS = 3000;
const PRE_TYPE_PAUSE_MS = 400;
const TYPE_DURATION_MS = 4600;
const HIGHLIGHT_HOLD_MS = 900;
const PUBLISH_DURATION_MS = 1100;

type DemoPhase =
  | "idle"
  | "scrolling"
  | "typing"
  | "highlighting"
  | "publishing"
  | "published";

export default function MeridianPage() {
  const [tosContent, setTosContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const [typedChars, setTypedChars] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const anchorRef = useRef<HTMLDivElement>(null);

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

  // Smooth-scroll the window over a fixed duration with ease-in-out.
  const animatedScrollTo = useCallback((targetY: number, duration: number) => {
    return new Promise<void>((resolve) => {
      const startY = window.scrollY;
      const delta = targetY - startY;
      const startT = performance.now();
      const ease = (t: number) =>
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const step = (now: number) => {
        const elapsed = now - startT;
        const t = Math.min(1, elapsed / duration);
        window.scrollTo(0, startY + delta * ease(t));
        if (t < 1) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });
  }, []);

  const handleUpdate = useCallback(async () => {
    if (phase !== "idle") return;

    // 1. Scroll deep into the ToS — the injection point
    setPhase("scrolling");
    const rect = anchorRef.current?.getBoundingClientRect();
    if (rect) {
      const targetY = window.scrollY + rect.top - window.innerHeight / 2;
      await animatedScrollTo(targetY, SCROLL_DURATION_MS);
    }

    // 2. Small suspenseful pause, then typewriter the bad paragraph
    await new Promise((r) => setTimeout(r, PRE_TYPE_PAUSE_MS));
    setPhase("typing");
    const total = BAD_PARAGRAPH.length;
    const stepMs = TYPE_DURATION_MS / total;
    for (let i = 1; i <= total; i++) {
      setTypedChars(i);
      // Keep the typing cursor visible inside the viewport as it grows
      if (i % 40 === 0) {
        anchorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      await new Promise((r) => setTimeout(r, stepMs));
    }

    // 3. Highlight the predatory phrases + warning flags
    setPhase("highlighting");
    await new Promise((r) => setTimeout(r, HIGHLIGHT_HOLD_MS));

    // 4. Persist to API & show publishing state
    setPhase("publishing");
    const newContent = tosContent.replace(
      UPDATE_MARKER,
      `${UPDATE_MARKER}\n\n${BAD_PARAGRAPH}`,
    );
    const savePromise = fetch("/api/tos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newContent }),
    }).then((r) => r.json());

    const [saved] = await Promise.all([
      savePromise,
      new Promise((r) => setTimeout(r, PUBLISH_DURATION_MS)),
    ]);

    setTosContent(newContent);
    setLastUpdated(saved.lastUpdated);
    setWordCount(saved.wordCount);
    setPhase("published");
  }, [tosContent, phase, animatedScrollTo]);

  // Split the ToS around the marker for the injection point
  const [beforeAnchor, afterAnchor] = tosContent
    ? splitOnce(tosContent, UPDATE_MARKER)
    : ["", ""];

  const showInjected = phase !== "idle" && phase !== "scrolling";
  const showHighlights = phase === "highlighting" || phase === "publishing" || phase === "published";

  return (
    <div className="min-h-screen bg-ivory bg-grain text-navy-950">
      {/* ── Navbar ──────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-navy-950 border-b border-gold-500/20">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-gold-500 flex items-center justify-center">
              <span className="font-display text-gold-400 text-base leading-none">M</span>
            </div>
            <span className="font-display text-white text-lg tracking-wide">MERIDIAN</span>
          </div>
          <a
            href="#terms"
            className="text-[12px] tracking-widest uppercase text-white/80 hover:text-gold-400 transition-colors"
          >
            Legal
          </a>
        </div>
      </nav>

      {/* ── Hero (full viewport) ─────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 bg-weave text-white">
        <div className="relative max-w-3xl mx-auto text-center">
          <h1 className="animate-fade-up font-display text-5xl md:text-6xl leading-[1.1] text-white">
            The data infrastructure for
            <span className="text-gold-400 italic"> modern </span>
            institutions.
          </h1>
          <p className="animate-fade-up-delay mt-6 text-lg text-white/80 font-light leading-relaxed">
            Meridian operates the private data rails behind global finance, insurance, and healthcare.
          </p>
        </div>
      </section>

      {/* ── Terms of Service ──────────────────────────────── */}
      <section id="terms" className="bg-ivory">
        {/* Document header banner */}
        <div className="bg-navy-950 text-ivory py-10 px-6 border-b border-gold-500/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-[10px] tracking-[0.35em] uppercase text-gold-400 mb-2">— Document Control</div>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-4xl md:text-5xl text-ivory">
                Master Terms of Service
              </h2>
              <div className="text-[10px] tracking-[0.2em] uppercase text-ivory/60 space-y-1 text-right">
                <div>Reference: MRD-TOS-2026-04</div>
                <div>Classification: <span className="text-gold-400">PUBLIC</span></div>
                <div>Jurisdiction: State of Delaware</div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin / demo control bar (sticky) */}
        <div className="sticky top-16 z-40 bg-bone border-y border-navy-950/15 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4 text-xs text-navy-900/70">
              {!isLoading && (
                <>
                  <span className="font-semibold text-navy-950">v4.2</span>
                  <span>·</span>
                  <span>{wordCount.toLocaleString()} words</span>
                  <span>·</span>
                  <span>
                    Updated{" "}
                    {new Date(lastUpdated).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </>
              )}
              {phase === "published" && (
                <span className="text-[10px] tracking-[0.2em] uppercase bg-navy-950 text-gold-400 px-2 py-1">
                  Filed
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {phase === "publishing" && (
                <div className="w-28 h-1 bg-navy-950/10 overflow-hidden">
                  <div
                    className="h-full bg-gold-500 progress-fill"
                    style={{ ["--duration" as string]: `${PUBLISH_DURATION_MS}ms` }}
                  />
                </div>
              )}
              <button
                onClick={handleUpdate}
                disabled={phase !== "idle"}
                className="text-[11px] tracking-[0.15em] uppercase bg-navy-950 hover:bg-navy-800 disabled:bg-navy-950/40 text-gold-400 disabled:cursor-not-allowed px-4 py-2 font-semibold transition-colors flex items-center gap-2"
              >
                {phase === "idle" && "Update Terms"}
                {phase === "scrolling" && "Navigating…"}
                {phase === "typing" && "Drafting §7.A…"}
                {phase === "highlighting" && "Reviewing…"}
                {phase === "publishing" && "Filing…"}
                {phase === "published" && "Filed ✓"}
              </button>
            </div>
          </div>
        </div>

        {/* Document body */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-navy-900/60 text-sm">
              Loading document…
            </div>
          ) : (
            <div className="tos-text whitespace-pre-wrap max-w-none bg-white border border-navy-950/10 p-8 shadow-sm">
              {beforeAnchor}
              <div ref={anchorRef} className="scroll-mt-48" />

              {showInjected && (
                <InjectedParagraph
                  typedChars={typedChars}
                  isTyping={phase === "typing"}
                  showHighlights={showHighlights}
                />
              )}

              {afterAnchor}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-navy-950 text-ivory/60 text-[10px] tracking-[0.2em] uppercase py-8 px-6 border-t border-gold-500/20">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div>© 2004–2026 Meridian Global Holdings, LLC · All rights reserved</div>
            <div>NYSE: MRDN · SEC Filings · Privacy · Cookies</div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Injected paragraph with typewriter + highlights + flags ── */
function InjectedParagraph({
  typedChars,
  isTyping,
  showHighlights,
}: {
  typedChars: number;
  isTyping: boolean;
  showHighlights: boolean;
}) {
  const displayed = BAD_PARAGRAPH.slice(0, typedChars);
  const rendered = showHighlights
    ? renderWithHighlights(BAD_PARAGRAPH)
    : displayed;

  return (
    <div className="paragraph-drop my-8 relative">
      {/* Demo label — clear callout above */}
      <div className="flex items-center gap-2 mb-2 text-[10px] tracking-[0.25em] uppercase text-red-700 font-semibold">
        <span className="inline-block w-2 h-2 bg-red-600 animate-pulse" />
        New clause added · §7.A · April 18, 2026
      </div>

      <div className="border-l-4 border-red-700 bg-red-50/80 px-6 py-5 font-sans text-[14px] leading-[1.55] text-navy-950 relative">
        <div className="text-[9px] tracking-[0.22em] uppercase text-red-700 font-bold mb-2">
          7.A Expanded Data Monetization Rights
        </div>
        <p className="text-[14px] font-medium">
          {rendered}
          {isTyping && <span className="caret" />}
        </p>

        {showHighlights && (
          <div className="mt-5 pt-4 border-t border-red-200 grid md:grid-cols-2 gap-2">
            {BAD_PHRASES.map((b, i) => (
              <div
                key={b.phrase}
                className="warning-flag flex items-start gap-2 text-[11px] leading-snug"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <span className="shrink-0 mt-[1px] w-4 h-4 rounded-full bg-red-700 text-white text-[9px] font-bold flex items-center justify-center">
                  !
                </span>
                <div>
                  <div className="font-semibold text-red-800">{b.reason}</div>
                  <div className="text-red-700/70 italic">“{b.phrase}”</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* Walk the BAD_PARAGRAPH and wrap each BAD_PHRASE in a <mark> */
function renderWithHighlights(text: string): React.ReactNode[] {
  const spans: { start: number; end: number; idx: number }[] = [];
  BAD_PHRASES.forEach((b, idx) => {
    const start = text.indexOf(b.phrase);
    if (start !== -1) spans.push({ start, end: start + b.phrase.length, idx });
  });
  spans.sort((a, b) => a.start - b.start);

  const out: React.ReactNode[] = [];
  let cursor = 0;
  spans.forEach((s, i) => {
    if (s.start > cursor) out.push(text.slice(cursor, s.start));
    out.push(
      <span
        key={`h-${i}`}
        className="bad-phrase"
        style={{ animationDelay: `${i * 120}ms` }}
      >
        {text.slice(s.start, s.end)}
      </span>,
    );
    cursor = s.end;
  });
  if (cursor < text.length) out.push(text.slice(cursor));
  return out;
}

function splitOnce(text: string, sep: string): [string, string] {
  const idx = text.indexOf(sep);
  if (idx === -1) return [text, ""];
  return [text.slice(0, idx), text.slice(idx + sep.length)];
}
