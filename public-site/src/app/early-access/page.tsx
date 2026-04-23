import Link from "next/link";
import { Navbar } from "@/components/navbar";

const WAITLIST_URL = "http://karlsellergren.me/perry-waitlist";

export const metadata = {
  title: "Early access — Perry",
  description:
    "Perry is in closed early access for CTOs and engineering leads at teams running on third-party APIs.",
};

export default function EarlyAccessPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      <section className="flex-1 px-6 py-28 sm:py-36">
        <div className="max-w-2xl mx-auto text-center">
          <span
            className="text-[12px] font-mono uppercase tracking-[0.2em]"
            style={{ color: "var(--eyebrow)" }}
          >
            Early access
          </span>

          <h1 className="mt-6 text-[clamp(32px,4.2vw,56px)] leading-[1.1] font-semibold tracking-[-0.03em]">
            We&apos;re onboarding{" "}
            <span className="underline decoration-[5px] decoration-[var(--accent-amber)] underline-offset-[5px]">
              a handful
            </span>{" "}
            of teams at a time.
          </h1>

          <p className="mt-6 text-[17px] leading-relaxed text-muted">
            Perry is in closed early access. Join the waitlist and we&apos;ll
            reach out as we open the next batch of installs.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 items-center justify-center">
            <a
              href={WAITLIST_URL}
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
            <Link
              href="/"
              className="text-[14px] text-muted hover:text-foreground transition-colors px-4 py-2"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border-light px-6 py-10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[13px] text-muted">Early access — Lund, 2026</p>
        </div>
      </footer>
    </div>
  );
}
