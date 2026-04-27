import Image from "next/image";
import { HeroGrid } from "@/components/hero-grid";
import { Navbar } from "@/components/navbar";
import { WaitlistForm } from "@/components/waitlist-form";

const tosChanges: { company: string; change: string; date: string }[] = [
  {
    company: "Anthropic",
    change:
      "Consumer data used for model training by default; retention extended 30d → 5yr",
    date: "Sep 2025",
  },
  {
    company: "Vercel",
    change:
      "Hobby plan code opted into AI training by default; arbitration extended to US",
    date: "Mar 2026",
  },
  {
    company: "OpenAI",
    change:
      "Usage policy now restricts medical, legal, and financial advice via API",
    date: "Oct 2025",
  },
  {
    company: "Stripe",
    change: "New $15 fee introduced for counter-disputes",
    date: "Jun 2025",
  },
  {
    company: "Anthropic",
    change:
      "Usage policy expanded for agentic capabilities (Claude Code, Computer Use)",
    date: "Sep 2025",
  },
  {
    company: "Twilio",
    change: "A2P 10DLC verification retries now charged per attempt",
    date: "Aug 2025",
  },
  {
    company: "OpenAI",
    change:
      "New Services Agreement and Data Processing Addendum take effect",
    date: "Jan 2026",
  },
  {
    company: "AWS",
    change:
      "Customer Agreement permits charging fallback payment method on primary failure",
    date: "Feb 2025",
  },
  {
    company: "Google Cloud",
    change: "Workspace now governed by Google Cloud Terms of Service",
    date: "Oct 2025",
  },
  {
    company: "Stripe",
    change:
      "Services Agreement and Connected Account Agreement updated",
    date: "Nov 2025",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      {/* Hero + ticker fill exactly one viewport */}
      <div className="flex flex-col min-h-[calc(100svh-3.5rem)]">
        {/* Hero */}
        <section className="relative overflow-hidden px-6 py-20 sm:py-24 flex-1 flex flex-col justify-center">
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

            <h1 className="animate-fade-in-up-delay-1 mt-8 text-[clamp(34px,4.73vw,68px)] leading-[1.02] font-thin tracking-[-0.035em]">
              Terms changed.
              <br />
              <span style={{ color: "var(--accent-teal)" }}>
                You didn&apos;t notice.
              </span>
              <br />
              <span className="underline decoration-[3px] md:decoration-[6px] decoration-[var(--accent-amber)] underline-offset-[6px]">
                Perry did.
              </span>
            </h1>

            <p className="animate-fade-in-up-delay-2 mt-8 text-[clamp(17px,1.8vw,20px)] leading-relaxed text-muted max-w-xl mx-auto">
              Your vendors write ToS for lawyers, Perry writes them for you.
            </p>

            <div className="animate-fade-in-up-delay-3 mt-12">
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 bg-foreground text-white text-[15px] font-light px-7 py-3.5 rounded-full transition-colors transition-transform duration-200 hover:bg-accent-teal active:scale-[0.97] shadow-sm"
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

        {/* ToS change ticker — recent real-world changes Perry tracks */}
        <section
          className="relative overflow-hidden border-t border-border-light bg-white py-3.5"
          aria-label="Recently observed terms-of-service changes"
        >
          <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center gap-2">
            <span
              className="w-[6px] h-[6px] rounded-full animate-pulse-dot"
              style={{ backgroundColor: "var(--accent-teal)" }}
              aria-hidden="true"
            />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "var(--eyebrow)" }}
            >
              Live
            </span>
          </div>

          <div
            className="flex items-center animate-[scroll_180s_linear_infinite] whitespace-nowrap w-max sm:pl-30"
            aria-hidden="true"
          >
            {[...tosChanges, ...tosChanges].map((item, i) => (
              <ToSTickerItem key={i} {...item} />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-linear-to-r from-white via-white/90 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-linear-to-l from-white via-white/90 to-transparent" />
        </section>
      </div>

      {/* What Perry does */}
      <section className="border-t border-border-light px-6 py-28 sm:py-36">
        <div className="max-w-3xl mx-auto text-center">
          <SectionEyebrow>What is Perry</SectionEyebrow>
          <h2 className="mt-6 text-[clamp(32px,4vw,56px)] font-normal tracking-[-0.03em] leading-[1.05]">
            We read the{" "}
            <span className="underline decoration-[3px] md:decoration-[6px] decoration-[var(--accent-amber)] underline-offset-[6px]">
              fine print
            </span>{" "}
            so you don&apos;t have to.
          </h2>
          <p className="mt-8 text-[17px] leading-[1.7] text-muted">
            Every business runs on outside services - payment tools, cloud
            storage, AI systems. All of them change their terms often, buried in
            long pages nobody reads. Perry reads every update for you. When
            something changes that actually matters, you get a short note in
            plain English - what changed, why it matters, what to do.
          </p>
        </div>
      </section>

      {/* How Perry works — the four-step flow */}
      <section className="border-t border-border-light px-6 py-28 sm:py-36  bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-[clamp(32px,4vw,56px)] font-normal tracking-[-0.03em] leading-[1.05]">
              How Perry{" "}
              <span className="underline decoration-[3px] md:decoration-[6px] decoration-[var(--accent-amber)] underline-offset-[6px]">
                works
              </span>
            </h2>
            <p className="mt-6 text-[17px] leading-[1.65] text-muted">
              From detection to action in seconds. Your code never leaves your
              infrastructure.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <StepCard
              number="01"
              title="Detect"
              body="Perry continuously monitors ToS pages across 200+ API providers. Changes are detected within minutes."
              icon={<SearchIcon />}
            />
            <StepCard
              number="02"
              title="Analyze"
              body="AI compares old and new terms, classifying severity and identifying what requires developer action."
              icon={<PencilIcon />}
            />
            <StepCard
              number="03"
              title="Broadcast"
              body={
                <>
                  A structured alert is sent to your GitHub repos via repository
                  dispatch. No code is transmitted, only the advisory.
                </>
              }
              icon={<ZapIcon />}
            />
            <StepCard
              number="04"
              title="Act"
              body="An edge bot on your runner scans local dependencies and opens a GitHub Issue if you're affected. Code stays in your VPC."
              icon={<ShieldIcon />}
            />
          </div>
        </div>
      </section>

      {/* Advisory artefact */}
      <section className="border-t border-border-light px-6 py-28 sm:py-36">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <SectionEyebrow>An advisory, translated</SectionEyebrow>
            <h2 className="mt-6 text-[clamp(32px,4vw,56px)] font-normal tracking-[-0.03em] leading-[1.05]">
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
                  sub-processors to assist in the processing of Personal Data.
                  Provider will notify Customer of intended additions or
                  replacements by posting updates on the Legal Information page.
                  Continued use of the Services constitutes acceptance of such
                  updates.
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
                  customers&rsquo; personal data -{" "}
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
            <h2 className="mt-6 text-[clamp(32px,4vw,56px)] font-normal tracking-[-0.03em] leading-[1.05]">
              Three <span style={{ color: "var(--accent-teal)" }}>zeros</span>.
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
        className="scroll-mt-16 border-t border-border-light px-6 py-20 sm:py-36"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <SectionEyebrow>Waitlist</SectionEyebrow>
            <h2 className="mt-6 text-[clamp(32px,4vw,56px)] font-normal tracking-[-0.03em] leading-[1.05]">
              <span className="whitespace-nowrap underline decoration-[3px] md:decoration-[6px] decoration-[var(--accent-amber)] underline-offset-[6px]">
                Be the first
              </span>{" "}
              to try <span style={{ color: "var(--accent-teal)" }}>Perry</span>.
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-muted">
              Drop your email - we&apos;ll reach out when Perry launches.
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
          <p className="text-[13px] text-muted">Early access - Lund, 2026</p>
        </div>
      </footer>
    </div>
  );
}

function ToSTickerItem({
  company,
  change,
  date,
}: {
  company: string;
  change: string;
  date: string;
}) {
  return (
    <span className="inline-flex items-center gap-4 text-[13px] leading-none pr-10 border-r border-border-light/70 mr-10 last:border-r-0">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/70 tabular-nums">
        {date}
      </span>
      <span className="font-light text-foreground tracking-tight">
        {company}
      </span>
      <span className="text-muted/90">{change}</span>
    </span>
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

function StepCard({
  number,
  title,
  body,
  icon,
}: {
  number: string;
  title: string;
  body: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-border-light rounded-2xl p-6">
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-teal)]">
        {number}
      </div>
      <div className="mt-6 text-foreground/80">{icon}</div>
      <h3 className="mt-6 text-[18px] font-medium tracking-[-0.01em]">
        {title}
      </h3>
      <p className="mt-3 text-[14.5px] leading-[1.65] text-muted">{body}</p>
    </div>
  );
}

function StepIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      color="#239c94"
    >
      {children}
    </svg>
  );
}

function SearchIcon() {
  return (
    <StepIcon>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </StepIcon>
  );
}

function PencilIcon() {
  return (
    <StepIcon>
      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z" />
    </StepIcon>
  );
}

function ZapIcon() {
  return (
    <StepIcon>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </StepIcon>
  );
}

function ShieldIcon() {
  return (
    <StepIcon>
      <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" />
    </StepIcon>
  );
}

function ZeroCard({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="text-left bg-white border border-border-light rounded-2xl p-8 md:p-9 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_12px_40px_-20px_rgba(0,0,0,0.08)]">
      <div
        className="text-[clamp(30px,3vw,40px)] font-medium tracking-[-0.02em] leading-[1.05]"
        style={{ fontFamily: "var(--font-geist), sans-serif" }}
      >
        <span className="underline decoration-[3px] md:decoration-[6px] decoration-[var(--accent-amber)] underline-offset-[6px]">
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
