"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-border-light">
      <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center transition-transform group-hover:scale-105">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-tight">
            Perry
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <NavLink href="/" active={pathname === "/"}>
            Home
          </NavLink>
          <NavLink href="/dashboard" active={pathname === "/dashboard"}>
            Dashboard
          </NavLink>
          <NavLink href="/demo" active={pathname === "/demo"}>
            Demo
          </NavLink>
        </div>

        <a
          href="#install"
          className="text-[13px] font-medium bg-foreground text-white px-4 py-1.5 rounded-full transition-all hover:bg-foreground/85 active:scale-[0.97]"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`text-[13px] px-3 py-1.5 rounded-full transition-colors ${
        active
          ? "text-foreground font-medium bg-black/[0.05]"
          : "text-muted hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
