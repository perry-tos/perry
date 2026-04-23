import Link from "next/link";
import { EarlyAccessForm } from "@/components/early-access-form";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Early access — Perry",
  description:
    "Request early access to Perry — AI-powered ToS change monitoring for teams running on third-party APIs.",
};

export default function EarlyAccessPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      <section className="flex-1 px-6 py-28 sm:py-36">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <span
              className="text-[12px] font-mono uppercase tracking-[0.2em]"
              style={{ color: "var(--eyebrow)" }}
            >
              Early access
            </span>

            <h1 className="mt-6 text-[clamp(32px,4.2vw,56px)] leading-[1.1] font-semibold tracking-[-0.03em]">
              Request{" "}
              <span className="underline decoration-[5px] decoration-[var(--accent-amber)] underline-offset-[5px]">
                early access
              </span>
              .
            </h1>

            <p className="mt-6 text-[17px] leading-relaxed text-muted">
              Bringing Perry to your company? Tell us about your team and
              we&apos;ll reach out to get you set up.
            </p>
          </div>

          <div className="mt-12">
            <EarlyAccessForm />
          </div>

          <div className="mt-10 text-center">
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
