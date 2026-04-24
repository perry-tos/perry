import Image from "next/image";
import { HeroGrid } from "@/components/hero-grid";
import { Navbar } from "@/components/navbar";
import { WaitlistForm } from "@/components/waitlist-form";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-32 pb-36 sm:pt-48 sm:pb-52">
        <HeroGrid />
        <div className="relative max-w-4xl mx-auto text-center">
          <span
            className="animate-fade-in-up inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.2em]"
            style={{ color: "var(--eyebrow)" }}
          >
            <span
              className="w-[6px] h-[6px] rounded-full animate-pulse-dot"
              style={{ backgroundColor: "var(--accent-teal)" }}
              aria-hidden="true"
            />
            Vendor terms, watched
          </span>

          <h1 className="animate-fade-in-up-delay-1 mt-8 text-[clamp(44px,6.2vw,88px)] leading-[1.02] font-semibold tracking-[-0.035em]">
            Terms changed.{" "}
            <span style={{ color: "var(--accent-teal)" }}>
              You didn&apos;t notice.
            </span>{" "}
            <span className="underline decoration-[6px] decoration-[var(--accent-amber)] underline-offset-[6px]">
              Perry did.
            </span>
          </h1>

          <p className="animate-fade-in-up-delay-2 mt-8 text-[clamp(17px,1.8vw,20px)] leading-relaxed text-muted max-w-xl mx-auto">
            Your vendors write ToS for lawyers, Perry writes them for you.
          </p>

          <div className="animate-fade-in-up-delay-3 mt-12">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 bg-foreground text-white text-[15px] font-medium px-7 py-3.5 rounded-full transition-colors transition-transform duration-200 hover:bg-accent-teal active:scale-[0.97] shadow-sm"
            >
              Sign up for the waitlist
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* What Perry does */}
      <section className="border-t border-border-light bg-surface px-6 py-28 sm:py-36">
        <div className="max-w-3xl mx-auto text-center">
          <SectionEyebrow>What is Perry</SectionEyebrow>
          <h2 className="mt-6 text-[clamp(32px,4vw,56px)] font-semibold tracking-[-0.03em] leading-[1.05]">
            We read the{" "}
            <span className="underline decoration-[6px] decoration-[var(--accent-amber)] underline-offset-[6px]">
              fine print
            </span>{" "}
            so you don&apos;t have to.
          </h2>
          <p className="mt-8 text-[17px] leading-[1.7] text-muted">
            Every business runs on outside services - payment tools, cloud
            storage, AI systems. All of them change their terms often, buried
            in long pages nobody reads. Perry reads every update for you.
            When something changes that actually matters, you get a short
            note in plain English - what changed, why it matters, what to do.
          </p>
        </div>
      </section>

      {/* Advisory artefact */}
      <section className="border-t border-border-light px-6 py-28 sm:py-36">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <SectionEyebrow>An advisory, translated</SectionEyebrow>
            <h2 className="mt-6 text-[clamp(32px,4vw,56px)] font-semibold tracking-[-0.03em] leading-[1.05]">
              Legalese in.{" "}
              <span style={{ color: "var(--accent-teal)" }}>
                Plain English out.
              </span>
            </h2>
          </div>

          <div className="mt-16 bg-white border border-border-light rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04),0_12px_40px_-12px_rgba(0,0,0,0.08)]">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left — legalese */}
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-border-light">
                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted mb-6">
                  Source · Provider legal page
                </div>
                <p className="font-mono text-[12.5px] leading-[1.75] text-muted break-words">
                  4.2 Sub-Processors. Provider may engage additional
                  sub-processors to assist in the processing of Personal
                  Data. Provider will notify Customer of intended additions
                  or replacements by posting updates on the Legal
                  Information page. Continued use of the Services
                  constitutes acceptance of such updates.
                </p>
              </div>

              {/* Right — Perry translation */}
              <div className="p-8 md:p-10 bg-white">
                <div className="flex items-center gap-2 mb-6">
                  <Image
                    src="/perry-logo.png"
                    alt=""
                    width={56}
                    height={18}
                    className="h-[14px] w-auto opacity-90"
                  />
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted">
                    Advisory
                  </span>
                </div>
                <p className="text-[16px] leading-[1.55] text-foreground">
                  Two new outside companies will start handling your
                  customers&rsquo; personal data —{" "}
                  <span
                    className="italic"
                    style={{ color: "var(--accent-teal)" }}
                  >
                    without your review
                  </span>
                  .
                </p>
                <p className="mt-4 text-[14.5px] leading-[1.65] text-muted">
                  You probably need to tell your own customers. Update your
                  privacy terms before this change takes effect.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Three zeros */}
      <section className="border-t border-border-light bg-surface px-6 py-28 sm:py-36">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <SectionEyebrow>A no-brainer to install</SectionEyebrow>
            <h2 className="mt-6 text-[clamp(32px,4vw,56px)] font-semibold tracking-[-0.03em] leading-[1.05]">
              Three{" "}
              <span style={{ color: "var(--accent-teal)" }}>zeros</span>.
            </h2>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
            <ZeroCard
              heading="onboarding"
              body="One-click install. No paperwork, no vendor review, no kickoff call."
            />
            <ZeroCard
              heading="code access"
              body="Perry runs inside your own GitHub setup. Your code never leaves your company."
            />
            <ZeroCard
              heading="noise"
              body="Only the providers you actually use. Only the changes that actually affect your code."
            />
          </div>
        </div>
      </section>

      {/* Closing CTA — Waitlist form */}
      <section
        id="waitlist"
        className="border-t border-border-light px-6 py-20 sm:py-36"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <SectionEyebrow>Waitlist</SectionEyebrow>
            <h2 className="mt-6 text-[clamp(32px,4vw,56px)] font-semibold tracking-[-0.03em] leading-[1.05]">
              Be the first to{" "}
              <span className="underline decoration-[6px] decoration-[var(--accent-amber)] underline-offset-[6px]">
                try Perry
              </span>
              .
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-muted">
              Drop your email — we&apos;ll reach out when Perry launches.
            </p>
          </div>

          <div className="mt-10">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-light px-6 py-10 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image
            src="/perry-logo.png"
            alt="Perry"
            width={66}
            height={22}
            className="h-5 w-auto opacity-80"
          />
          <p className="text-[13px] text-muted">Early access — Lund, 2026</p>
        </div>
      </footer>
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[12px] font-mono uppercase tracking-[0.2em]"
      style={{ color: "var(--eyebrow)" }}
    >
      {children}
    </span>
  );
}

function ZeroCard({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="text-left bg-white border border-border-light rounded-2xl p-8 md:p-9 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_12px_40px_-20px_rgba(0,0,0,0.08)]">
      <div className="text-[clamp(30px,3vw,40px)] font-semibold tracking-[-0.02em] leading-[1.05]">
        <span className="underline decoration-[6px] decoration-[var(--accent-amber)] underline-offset-[6px]">
          Zero
        </span>{" "}
        <span className="text-muted">{heading}.</span>
      </div>
      <p
        className="mt-5 text-[15px] leading-[1.65] text-foreground/80"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  );
}
