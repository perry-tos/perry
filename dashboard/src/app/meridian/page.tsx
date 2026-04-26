import Link from "next/link";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata = {
  title: "Meridian Pay — Global Payment Infrastructure",
  description:
    "Meridian Pay powers card acquiring, instant payouts, and cross-border settlement for ambitious businesses in 97 countries.",
};

export default function MeridianLanding() {
  return (
    <div
      className={`${inter.variable} ${playfair.variable} meridian-root min-h-screen bg-ivory bg-grain text-navy-950`}
    >
      {/* ── Navbar ──────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-navy-950 border-b border-gold-500/20">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/meridian" className="flex items-center gap-3">
            <div className="w-8 h-8 border border-gold-500 flex items-center justify-center">
              <span className="font-display text-gold-400 text-base leading-none">
                M
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-white text-lg tracking-wide">
                MERIDIAN
              </span>
              <span className="text-[8px] tracking-[0.3em] text-gold-400 uppercase">
                Pay
              </span>
            </div>
          </Link>
          <span className="text-[12px] tracking-widest uppercase text-white/80">
            Legal
          </span>
        </div>
      </nav>

      {/* ── Hero (full viewport) ─────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 bg-weave text-white">
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="animate-fade-up text-[10px] tracking-[0.35em] uppercase text-gold-400 mb-6">
            — Licensed payment institution · Est. 2004
          </div>
          <h1 className="animate-fade-up font-display text-5xl md:text-6xl leading-[1.1] text-white">
            Move money
            <span className="text-gold-400 italic"> anywhere </span>
            in the world.
          </h1>
          <p className="animate-fade-up-delay mt-6 text-lg text-white/80 font-light leading-relaxed">
            Meridian Pay powers card acquiring, instant payouts, and
            cross-border settlement for ambitious businesses in 97 countries.
          </p>
        </div>
      </section>

      {/* ── Generic info section ─────────────────────────────── */}
      <section className="px-6 py-24 border-t border-navy-950/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-[10px] tracking-[0.3em] uppercase text-navy-700 mb-4">
            — About Meridian Pay
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-navy-950 leading-tight">
            Payment infrastructure for businesses that cannot afford to drop a
            transaction.
          </h2>
          <div className="mt-8 space-y-5 text-navy-900/80 leading-relaxed">
            <p>
              Meridian Pay is a licensed acquirer and e-money institution,
              regulated across the EU, UK, and North America. We authorize,
              settle, and reconcile billions of dollars in card, bank transfer,
              and stablecoin payments every day on behalf of merchants,
              marketplaces, and platforms.
            </p>
            <p>
              Our stack is PCI DSS Level 1 certified, SOC 2 Type II audited,
              and engineered for authorization rates above 99.9%. Whether you
              are processing recurring subscriptions, wholesale payouts, or
              high-risk FX flows, Meridian Pay delivers the rails — and the
              compliance backbone — to scale without surprises.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="bg-navy-950 text-ivory/60 text-[10px] tracking-[0.2em] uppercase py-8 px-6 border-t border-gold-500/20">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            © 2004–2026 Meridian Global Holdings, LLC · All rights reserved
          </div>
          <div className="flex gap-4">
            <span>Legal</span>
            <span>Privacy</span>
            <span>Cookies</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
