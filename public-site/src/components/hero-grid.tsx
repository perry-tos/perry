"use client";

import { useEffect, useRef } from "react";

export function HeroGrid() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const section = wrap.parentElement;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let pending = false;
    let targetXpx = 0;
    let targetYpx = 0;

    const apply = () => {
      wrap.style.setProperty("--mx", `${targetXpx}px`);
      wrap.style.setProperty("--my", `${targetYpx}px`);
      pending = false;
    };

    const reset = () => {
      const rect = section.getBoundingClientRect();
      targetXpx = rect.width / 2;
      targetYpx = rect.height * 0.45;
      if (!pending) {
        pending = true;
        requestAnimationFrame(apply);
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      targetXpx = e.clientX - rect.left;
      targetYpx = e.clientY - rect.top;
      if (!pending) {
        pending = true;
        requestAnimationFrame(apply);
      }
    };

    reset();
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", reset);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div ref={wrapRef} className="hero-fx" aria-hidden="true">
      <div className="hero-grid-base" />
      <div className="hero-grid-spot" />
    </div>
  );
}
