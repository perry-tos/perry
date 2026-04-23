import EarlyAccessForm from '@/components/EarlyAccessForm';
import { Navbar } from '@/components/navbar';
import Image from 'next/image';
import Link from 'next/link';

const GITHUB_APP_INSTALL_URL = '#install';

const providers = [
  'OpenAI',
  'Stripe',
  'AWS',
  'Twilio',
  'Google Cloud',
  'Anthropic',
  'Azure',
  'Vercel',
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface to-white" />
        <div className="relative max-w-4xl mx-auto px-6 pt-28 pb-20 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 text-[13px] text-muted bg-white border border-border-light rounded-full px-4 py-1.5 mb-8 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-glow" />
              Monitoring 200+ API providers in real time
            </div>
          </div>

          <h1 className="animate-fade-in-up-delay-1 text-[52px] leading-[1.08] font-semibold tracking-[-0.03em] text-foreground max-w-3xl mx-auto">
            Terms changed.
            <br />
            <span className="text-muted">You didn&apos;t notice.</span>
            <br />
            Perry did.
          </h1>

          <p className="animate-fade-in-up-delay-2 mt-6 text-[19px] leading-relaxed text-muted max-w-xl mx-auto">
            AI-powered monitoring for Terms of Service changes across every API your company depends
            on. One click to protect your entire org.
          </p>

          <div className="animate-fade-in-up-delay-3 mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={GITHUB_APP_INSTALL_URL}
              className="inline-flex items-center gap-2.5 bg-foreground text-white text-[15px] font-medium px-7 py-3 rounded-full transition-all hover:bg-foreground/85 active:scale-[0.97] shadow-lg shadow-black/10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Protect My Org
            </a>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 text-[15px] font-medium text-muted px-7 py-3 rounded-full transition-colors hover:text-foreground hover:bg-black/[0.03]"
            >
              Watch Demo
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
            </Link>
          </div>
        </div>
      </section>

      {/* Provider Ticker */}
      <section className="border-y border-border-light bg-surface py-5 overflow-hidden">
        <div className="flex items-center gap-8 animate-[scroll_20s_linear_infinite] whitespace-nowrap">
          {[...providers, ...providers].map((name, i) => (
            <span
              key={i}
              className="text-[13px] font-medium text-muted/60 uppercase tracking-widest"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-[34px] font-semibold tracking-tight">How Perry works</h2>
          <p className="mt-3 text-[17px] text-muted max-w-lg mx-auto">
            From detection to action in seconds. Your code never leaves your infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StepCard
            step="01"
            title="Detect"
            description="Perry continuously monitors ToS pages across 200+ API providers. Changes are detected within minutes."
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            }
          />
          <StepCard
            step="02"
            title="Analyze"
            description="AI compares old and new terms, classifying severity and identifying what requires developer action."
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            }
          />
          <StepCard
            step="03"
            title="Broadcast"
            description="A structured alert is sent to your GitHub repos via repository dispatch. No code is transmitted — only the advisory."
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            }
          />
          <StepCard
            step="04"
            title="Act"
            description="An edge bot on your runner scans local dependencies and opens a GitHub Issue if you're affected. Code stays in your VPC."
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            }
          />
        </div>
      </section>

      {/* Zero Knowledge */}
      <section className="bg-foreground text-white">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[13px] font-medium text-white/50 uppercase tracking-widest mb-4">
                Zero-Knowledge Architecture
              </p>
              <h2 className="text-[34px] font-semibold tracking-tight leading-tight">
                Your code never
                <br />
                leaves your VPC.
              </h2>
              <p className="mt-4 text-[17px] text-white/60 leading-relaxed">
                Perry broadcasts structured advisories — not code scanners. The open-source edge bot
                runs entirely on your GitHub Actions runner, scanning your private dependencies
                locally. We never see your source code, your dependencies, or your infrastructure.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <ZeroKnowledgeItem text="No source code transmitted" />
                <ZeroKnowledgeItem text="No dependency lists shared" />
                <ZeroKnowledgeItem text="Open-source edge bot — audit it yourself" />
                <ZeroKnowledgeItem text="Runs on your own GitHub Actions runner" />
              </div>
            </div>

            <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 font-mono text-[13px] leading-relaxed">
              <div className="flex items-center gap-2 mb-4 text-white/30">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <span className="ml-2 text-[11px]">tos-scan.yml</span>
              </div>
              <pre className="text-white/70 overflow-x-auto">
                <code>{`name: ToS Change Scanner
on:
  repository_dispatch:
    types: [tos_alert_broadcast]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: perry-tos/edge-bot@v1
        with:
          github-token: \${{ secrets.GITHUB_TOKEN }}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Stat value="200+" label="Providers monitored" />
          <Stat value="< 5 min" label="Detection time" />
          <Stat value="0 bytes" label="Of your code shared" />
          <Stat value="1 click" label="To protect your org" />
        </div>
      </section>

      {/* Early Access */}
      <section
        id="early-access"
        className="border-t border-border-light bg-gradient-to-b from-white to-surface"
      >
        <div className="max-w-3xl mx-auto px-6 py-24">
          <div className="text-center mb-12">
            <p className="text-[13px] font-medium text-muted uppercase tracking-widest mb-4">
              Early Access
            </p>
            <h2 className="text-[34px] font-semibold tracking-tight">Join the private beta</h2>
            <p className="mt-3 text-[17px] text-muted max-w-lg mx-auto">
              Sign up below and be among the first to try out Perry.
            </p>
          </div>
          <EarlyAccessForm />
        </div>
      </section>

      {/* CTA */}
      <section id="install" className="bg-surface border-t border-border-light">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-[34px] font-semibold tracking-tight">Start protecting your org</h2>
          <p className="mt-3 text-[17px] text-muted max-w-md mx-auto">
            Install the GitHub App, and Perry handles the rest. No configuration needed.
          </p>
          <a
            href={GITHUB_APP_INSTALL_URL}
            className="mt-8 inline-flex items-center gap-2.5 bg-foreground text-white text-[15px] font-medium px-8 py-3.5 rounded-full transition-all hover:bg-foreground/85 active:scale-[0.97] shadow-lg shadow-black/10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Install GitHub App
          </a>
          <p className="mt-4 text-[13px] text-muted">Free during beta. Takes 30 seconds.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-light py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center text-[13px] text-muted">
            <Image
              src="/perry-logo.png"
              alt="Perry"
              width={66}
              height={22}
              className="h-5 w-auto"
            />
          </div>
          <p className="text-[13px] text-muted">Built at Lund University Hackathon 2026</p>
        </div>
      </footer>
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
  icon,
}: {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group relative bg-white border border-border-light rounded-2xl p-6 transition-all hover:shadow-[var(--card-shadow-hover)] hover:border-border">
      <div className="text-[11px] font-mono text-muted/50 uppercase tracking-widest mb-4">
        {step}
      </div>
      <div className="text-muted mb-3">{icon}</div>
      <h3 className="text-[17px] font-semibold mb-2">{title}</h3>
      <p className="text-[14px] text-muted leading-relaxed">{description}</p>
    </div>
  );
}

function ZeroKnowledgeItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#34c759"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span className="text-[15px] text-white/80">{text}</span>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-[40px] font-semibold tracking-tight">{value}</div>
      <div className="text-[14px] text-muted mt-1">{label}</div>
    </div>
  );
}
