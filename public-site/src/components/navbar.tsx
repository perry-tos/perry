import Image from "next/image";
import Link from "next/link";

const WAITLIST_URL = "http://karlsellergren.me/perry-waitlist";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-border-light">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center group" aria-label="Perry home">
          <Image
            src="/perry-logo.png"
            alt="Perry"
            width={92}
            height={30}
            priority
            className="h-7 w-auto transition-transform group-hover:scale-105"
          />
        </Link>

        <a
          href={WAITLIST_URL}
          className="text-[13px] font-medium bg-foreground text-white px-4 py-1.5 rounded-full transition-colors duration-200 hover:bg-accent-teal active:scale-[0.97]"
        >
          Sign up for the waitlist
        </a>
      </div>
    </nav>
  );
}
