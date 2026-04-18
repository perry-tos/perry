"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Navbar } from "@/components/navbar";

const SLIDE_COUNT = 6;

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
        {/* Slide 1 — Problem (Stripe) */}
        <Slide idx={0} registerSlide={registerSlide}>
          <div className="max-w-4xl mx-auto text-center">
            <SlideEyebrow>The problem</SlideEyebrow>
            <h2 className="mt-6 text-[clamp(32px,4.5vw,64px)] leading-[1.05] font-semibold tracking-[-0.02em]">
              Overnight, Stripe gave{" "}
              <span className="underline decoration-[6px] decoration-[#E89D3A] underline-offset-[6px]">
                two new partners
              </span>{" "}
              access to your customers&apos; data.
            </h2>
            <p className="mt-8 text-[15px] font-mono uppercase tracking-widest text-muted/70">
              You have no idea.
            </p>
          </div>
        </Slide>

        {/* Slide 2 — Why it keeps happening */}
        <Slide idx={1} registerSlide={registerSlide}>
          <div className="max-w-4xl mx-auto text-center">
            <SlideEyebrow>Why it keeps happening</SlideEyebrow>
            <h2 className="mt-6 text-[clamp(32px,4.5vw,64px)] leading-[1.05] font-semibold tracking-[-0.02em]">
              Countless dependencies.{" "}
              <span className="underline decoration-[6px] decoration-[#E89D3A] underline-offset-[6px]">
                Stripe could have been one of them.
              </span>
            </h2>
            <p className="mt-8 text-[15px] font-mono uppercase tracking-widest text-muted/70">
              You can&apos;t possibly track them all.
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
              <span className="text-muted">You didn&apos;t notice.</span>{" "}
              <span className="underline decoration-[6px] decoration-[#E89D3A] underline-offset-[6px]">
                Perry did.
              </span>
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
              Providers write ToS for lawyers. Perry writes them for you.
            </h2>
          </div>
        </Slide>

        {/* Slide 5 — Three zeros */}
        <Slide idx={4} registerSlide={registerSlide}>
          <div className="max-w-5xl mx-auto w-full">
            <div className="text-center">
              <SlideEyebrow>A no-brainer to install</SlideEyebrow>
              <h2 className="mt-6 text-[clamp(36px,5vw,72px)] font-semibold tracking-[-0.03em]">
                Three zeros.
              </h2>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
              <ZeroCard
                heading="Zero onboarding."
                body="One-click install."
              />
              <ZeroCard
                heading="Zero code access."
                body="Your code never leaves your company."
              />
              <ZeroCard
                heading="Zero noise."
                body="Only providers you actually use."
              />
            </div>
          </div>
        </Slide>

        {/* Slide 6 — Demo */}
        <Slide idx={5} registerSlide={registerSlide}>
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <SlideEyebrow>Live demo</SlideEyebrow>
            <h2 className="mt-6 text-[clamp(44px,6vw,88px)] leading-[0.98] font-semibold tracking-[-0.03em]">
              Let&apos;s catch one{" "}
              <span className="italic" style={{ color: "#239C94" }}>
                live<span style={{ color: "#E89D3A" }}>.</span>
              </span>
            </h2>
            <p className="mt-8 text-[21px] text-muted max-w-2xl mx-auto">
              A fifteen-person AI startup using Meridian Pay. A clause quietly
              changes.
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
      className={`text-[12px] font-mono uppercase tracking-[0.2em] text-[#5C2A2A] ${className}`}
    >
      {children}
    </span>
  );
}

function ZeroCard({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="bg-surface border border-border-light rounded-2xl p-6 text-left">
      <div className="text-[28px] font-semibold tracking-tight leading-tight">
        {heading}
      </div>
      <div className="mt-3 text-[15px] leading-snug text-muted">{body}</div>
    </div>
  );
}
