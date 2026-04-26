"use client";

import { useEffect, useMemo, useRef } from "react";

const TOS_PARAGRAPHS = [
  "1.1 Acceptance of Terms. By accessing or using the Services, you agree to be bound by these Terms of Service and all policies referenced herein, including without limitation the Acceptable Use Policy, Privacy Policy, and Data Processing Addendum, each as amended from time to time in Provider's sole discretion.",
  "2.3 License Grant. Subject to Customer's continued compliance with these Terms and timely payment of all applicable fees, Provider hereby grants Customer a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the Services solely for Customer's internal business purposes during the Subscription Term.",
  "3.7 Customer Data. Customer retains all right, title, and interest in and to Customer Data. Customer hereby grants Provider a worldwide, royalty-free, non-exclusive license to host, copy, transmit, display, and process Customer Data solely as necessary to provide and improve the Services and as otherwise permitted herein.",
  "4.2 Sub-Processors. Provider may engage additional sub-processors to assist in the processing of Personal Data. Provider will notify Customer of intended additions or replacements by posting updates on the Legal Information page. Continued use of the Services constitutes acceptance of such updates.",
  "5.4 Service Level Commitments. Provider will use commercially reasonable efforts to make the Services available with a monthly uptime percentage of at least 99.9%, excluding Scheduled Maintenance, Emergency Maintenance, Force Majeure Events, and any unavailability caused by factors outside Provider's reasonable control.",
  "6.1 Fees and Payment. Customer will pay all fees specified in the applicable Order Form. All fees are non-refundable except as expressly set forth herein. Provider may increase fees upon renewal by providing at least thirty (30) days prior notice of such increase to Customer.",
  "7.5 Confidentiality. Each party agrees to protect the Confidential Information of the other party using the same degree of care it uses to protect its own confidential information of like kind, but in no event less than a reasonable degree of care, and not to use or disclose such Confidential Information except as expressly permitted herein.",
  "8.2 Indemnification by Customer. Customer will defend, indemnify, and hold harmless Provider from and against any third-party claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to Customer's use of the Services in violation of these Terms or applicable law.",
  "9.3 Limitation of Liability. To the maximum extent permitted by applicable law, in no event will either party's aggregate liability arising out of or relating to these Terms exceed the total fees paid or payable by Customer to Provider during the twelve (12) months immediately preceding the event giving rise to the claim.",
  "10.6 Term and Termination. These Terms commence on the Effective Date and continue until all Subscription Terms have expired or been terminated in accordance with this Section. Either party may terminate these Terms for cause upon written notice of a material breach that remains uncured for thirty (30) days.",
  "11.4 Modifications. Provider reserves the right, at its sole discretion, to modify or replace these Terms at any time. If a revision is material, Provider will make reasonable efforts to provide at least fifteen (15) days notice prior to any new terms taking effect. What constitutes a material change will be determined at Provider's sole discretion.",
  "12.1 Governing Law. These Terms are governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of laws principles. The parties hereby consent to the exclusive jurisdiction of the state and federal courts located in New Castle County, Delaware.",
  "13.8 Export Compliance. The Services may be subject to export laws and regulations of the United States and other jurisdictions. Customer represents that it is not named on any U.S. government denied-party list and will not use the Services in violation of any applicable export restriction or sanction.",
  "14.2 Publicity. Customer grants Provider the right to use Customer's name and logo on Provider's website and in marketing materials solely to identify Customer as a user of the Services, subject to Customer's standard trademark usage guidelines provided in writing to Provider.",
  "15.5 Entire Agreement. These Terms, together with any Order Forms and referenced policies, constitute the entire agreement between the parties with respect to the subject matter hereof and supersede all prior or contemporaneous understandings, agreements, negotiations, representations and warranties, and communications, both written and oral.",
];

export function HeroGrid() {
  const wrapRef = useRef<HTMLDivElement>(null);

  const tosText = useMemo(() => {
    const blocks: string[] = [];
    for (let i = 0; i < 6; i++) {
      blocks.push(...TOS_PARAGRAPHS);
    }
    return blocks.join("  ");
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const section = wrap.parentElement;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (window.matchMedia("(hover: none)").matches) {
      let rafId = 0;
      const start = performance.now();
      const PERIOD_X = 17000;
      const PERIOD_Y = 36000;
      const TWO_PI = Math.PI * 2;
      const HALF_PI = Math.PI / 2;

      const tick = () => {
        const t = performance.now() - start;
        const rect = section.getBoundingClientRect();
        const cx = rect.width * (0.65 + 0.34 * Math.sin((TWO_PI * t) / PERIOD_X - HALF_PI));
        const cy = rect.height * (0.45 + 0.3 * Math.sin((TWO_PI * t) / PERIOD_Y - HALF_PI));
        wrap.style.setProperty("--mx", `${cx}px`);
        wrap.style.setProperty("--my", `${cy}px`);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafId);
    }

    let pending = false;
    let targetXpx = 0;
    let targetYpx = 0;

    const apply = () => {
      wrap.style.setProperty("--mx", `${targetXpx}px`);
      wrap.style.setProperty("--my", `${targetYpx}px`);
      pending = false;
    };

    const reset = () => {
      targetXpx = -9999;
      targetYpx = -9999;
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

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", reset);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div ref={wrapRef} className="hero-fx" aria-hidden="true">
      <div className="hero-tos-base">{tosText}</div>
      <div className="hero-tos-spot">{tosText}</div>
    </div>
  );
}
