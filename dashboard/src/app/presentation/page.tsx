"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Navbar } from "@/components/navbar";

const SLIDE_COUNT = 7;

export default function PresentationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(idx, SLIDE_COUNT - 1));
    slideRefs.current[clamped]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (
        e.key === "ArrowDown" ||
        e.key === "PageDown" ||
        e.key === " " ||
        e.key === "j"
      ) {
        e.preventDefault();
        goToSlide(currentSlide + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || e.key === "k") {
        e.preventDefault();
        goToSlide(currentSlide - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSlide(SLIDE_COUNT - 1);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.slideIdx ?? "0",
            );
            setCurrentSlide(idx);
          }
        });
      },
      { root, threshold: [0.6] },
    );

    slideRefs.current.forEach((slide) => slide && observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  const registerSlide = (idx: number) => (el: HTMLElement | null) => {
    slideRefs.current[idx] = el;
  };

  return (
    <>
      <Navbar />

      <div
        ref={containerRef}
        className="h-[calc(100vh-3rem)] overflow-y-auto snap-y snap-mandatory scroll-smooth bg-white"
      >
        {/* Slide 1 — Problem */}
        <Slide idx={0} registerSlide={registerSlide}>
          <div className="max-w-4xl mx-auto text-center">
            <SlideEyebrow>The problem</SlideEyebrow>
            <h2 className="mt-6 text-[clamp(32px,4.5vw,64px)] leading-[1.05] font-semibold tracking-[-0.02em]">
              Every modern product is built on{" "}
              <span className="text-danger">someone else&apos;s API</span> —
              and every API hides a ToS page that quietly changes.
            </h2>
            <p className="mt-8 text-[19px] text-muted max-w-2xl mx-auto">
              OpenAI, Stripe, AWS, Plaid, Twilio, Shopify, GitHub. One silent
              edit about data retention, model training, or rate limits and
              your product is suddenly out of compliance — or broken.
            </p>
            <p className="mt-6 text-[15px] font-mono uppercase tracking-widest text-muted/70">
              No one is reading the diff.
            </p>
          </div>
        </Slide>

        {/* Slide 2 — Stakes */}
        <Slide idx={1} registerSlide={registerSlide}>
          <div className="max-w-5xl mx-auto">
            <SlideEyebrow className="text-center block">
              The cost of missing a line
            </SlideEyebrow>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
              <StatCard
                big="47%"
                label="of engineering teams discover ToS violations in production"
              />
              <StatCard
                big="$2.3M"
                label="average settlement when an API provider terminates mid-contract"
              />
              <StatCard
                big="14 days"
                label="median notice period before providers enforce new clauses"
              />
            </div>
            <p className="mt-12 text-center text-[19px] text-muted">
              One silent edit on a page nobody reads can cost you{" "}
              <span className="text-foreground font-medium">
                two million dollars and a weekend.
              </span>
            </p>
          </div>
        </Slide>

        {/* Slide 3 — Title */}
        <Slide idx={2} registerSlide={registerSlide}>
          <div className="flex flex-col items-center text-center animate-fade-in-up">
            <Image
              src="/perry-logo.png"
              alt="Perry"
              width={520}
              height={170}
              priority
              className="h-auto w-[clamp(260px,38vw,520px)]"
            />
            <p className="mt-10 text-[clamp(24px,3vw,40px)] leading-tight font-medium tracking-tight text-foreground max-w-3xl">
              Terms changed.{" "}
              <span className="text-muted">You didn&apos;t notice.</span> Perry
              did.
            </p>
          </div>
        </Slide>

        {/* Slide 4 — Meet Perry */}
        <Slide idx={3} registerSlide={registerSlide}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[13px] text-muted bg-white border border-border-light rounded-full px-4 py-1.5 mb-8 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-glow" />
              Meet Perry
            </div>
            <h2 className="text-[clamp(36px,5vw,72px)] leading-[1.02] font-semibold tracking-[-0.03em]">
              The ToS intelligence layer for your engineering org.
            </h2>
            <p className="mt-8 text-[21px] leading-relaxed text-muted max-w-2xl mx-auto">
              Perry watches every public Terms of Service page you depend on,
              detects the diff the moment it happens, and tells your engineers
              what changed, what it breaks, and which file to fix — as a
              GitHub Issue opened directly in your own repo.
            </p>
          </div>
        </Slide>

        {/* Slide 5 — How it works */}
        <Slide idx={4} registerSlide={registerSlide}>
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-14">
              <SlideEyebrow>Architecture</SlideEyebrow>
              <h2 className="mt-6 text-[clamp(30px,4vw,52px)] font-semibold tracking-tight">
                Four services. One zero-knowledge pipeline.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <PipelineStep
                num="01"
                title="Crawler"
                body="Snapshots ToS pages and SHA-256 hashes the content. A hash mismatch means the page just changed."
              />
              <PipelineStep
                num="02"
                title="Brain"
                body="Pulls the diff through GPT-4o with an Instructor schema and produces a typed, structured advisory."
              />
              <PipelineStep
                num="03"
                title="Dispatcher"
                body="Signs an RS256 JWT, mints a scoped GitHub installation token per customer, and broadcasts."
              />
              <PipelineStep
                num="04"
                title="Edge Bot"
                body="Runs inside your GitHub Action, scans your manifest for affected code, and opens an Issue in your repo."
              />
            </div>
          </div>
        </Slide>

        {/* Slide 6 — Zero-knowledge moat */}
        <Slide idx={5} registerSlide={registerSlide}>
          <div className="max-w-4xl mx-auto text-center">
            <SlideEyebrow>What makes Perry different</SlideEyebrow>
            <h2 className="mt-6 text-[clamp(40px,5.5vw,80px)] leading-[1.02] font-semibold tracking-[-0.03em]">
              Your IP never{" "}
              <span className="bg-foreground text-white px-3 rounded-2xl">
                leaves your servers.
              </span>
            </h2>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <ComparisonCard
                tone="bad"
                title="Other tools"
                body="Scan your codebase from the outside. Your proprietary prompts, schemas, and business logic sit on a vendor server."
              />
              <ComparisonCard
                tone="good"
                title="Perry"
                body="Broadcasts a structured advisory. The match-against-your-code step runs inside your own GitHub Action. We only see public ToS pages."
              />
            </div>
          </div>
        </Slide>

        {/* Slide 7 — Demo */}
        <Slide idx={6} registerSlide={registerSlide}>
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <SlideEyebrow>Live demo</SlideEyebrow>
            <h2 className="mt-6 text-[clamp(44px,6vw,88px)] leading-[0.98] font-semibold tracking-[-0.03em]">
              Let&apos;s catch one{" "}
              <span className="italic" style={{ color: "#239C94" }}>
                live<span style={{ color: "#E89D3A" }}>.</span>
              </span>
            </h2>
            <p className="mt-8 text-[21px] text-muted max-w-2xl mx-auto">
              Imagine a fintech built on Stripe, OpenAI, and AWS. One of them
              quietly edits a clause. Watch Perry crawl, analyze, dispatch,
              and open an Issue — end-to-end, in under ten seconds.
            </p>
            <div className="mt-12">
              <button
                type="button"
                onClick={() => {
                  window.open(
                    "http://localhost:3001/",
                    "_blank",
                    "noopener,noreferrer",
                  );
                  window.location.href = "http://localhost:3000/demo";
                }}
                className="inline-flex items-center gap-2.5 bg-foreground text-white text-[15px] font-medium px-7 py-3 rounded-full transition-all hover:bg-foreground/85 active:scale-[0.97] shadow-lg shadow-black/10"
              >
                Start Demo Mode
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </Slide>

      </div>

      {/* Progress dots */}
      <nav
        aria-label="Slide navigation"
        className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40"
      >
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentSlide
                ? "bg-foreground scale-125"
                : "bg-foreground/20 hover:bg-foreground/50"
            }`}
          />
        ))}
      </nav>

      {/* Slide counter */}
      <div className="fixed bottom-5 right-6 text-[12px] font-mono text-muted/70 bg-white/80 backdrop-blur-md border border-border-light rounded-full px-3 py-1 z-40">
        {currentSlide + 1} / {SLIDE_COUNT}
      </div>
    </>
  );
}

function Slide({
  idx,
  registerSlide,
  children,
}: {
  idx: number;
  registerSlide: (idx: number) => (el: HTMLElement | null) => void;
  children: React.ReactNode;
}) {
  return (
    <section
      ref={registerSlide(idx)}
      data-slide-idx={idx}
      className="h-[calc(100vh-3rem)] w-full snap-start flex items-center justify-center px-6"
    >
      {children}
    </section>
  );
}

function SlideEyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`text-[12px] font-mono uppercase tracking-[0.2em] text-muted/70 ${className}`}
    >
      {children}
    </span>
  );
}

function StatCard({ big, label }: { big: string; label: string }) {
  return (
    <div className="bg-surface border border-border-light rounded-2xl p-6 text-left">
      <div className="text-[44px] font-semibold tracking-tight leading-none">
        {big}
      </div>
      <div className="mt-3 text-[14px] leading-snug text-muted">{label}</div>
    </div>
  );
}

function PipelineStep({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-white border border-border-light rounded-2xl p-5">
      <div className="text-[11px] font-mono text-muted/60 uppercase tracking-widest">
        {num}
      </div>
      <div className="mt-3 text-[18px] font-semibold tracking-tight">
        {title}
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">{body}</p>
    </div>
  );
}

function ComparisonCard({
  tone,
  title,
  body,
}: {
  tone: "good" | "bad";
  title: string;
  body: string;
}) {
  const accent =
    tone === "good"
      ? "border-success/40 bg-success/5"
      : "border-border-light bg-surface";
  const badgeColor = tone === "good" ? "text-success" : "text-danger";
  const icon = tone === "good" ? "✓" : "✕";
  return (
    <div className={`rounded-2xl border p-6 ${accent}`}>
      <div
        className={`inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-widest ${badgeColor}`}
      >
        <span className="text-[14px]">{icon}</span>
        {title}
      </div>
      <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">
        {body}
      </p>
    </div>
  );
}
