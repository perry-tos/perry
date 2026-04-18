/**
 * Generates realistic Terms of Service text for Meridian.
 * The UPDATE_MARKER is a sentinel the UI splits on to inject the
 * "bad" paragraph during the demo.
 */

export const UPDATE_MARKER = "%%UPDATE_ANCHOR%%";

export const BAD_PARAGRAPH =
  "Meridian may collect, store, combine, and sell all personal data associated with your account — including your name, email, contacts, precise location, browsing history, device identifiers, and any inferences we derive from this information — to advertisers, data brokers, insurance providers, and other third parties, at our sole discretion and without further notice to you.";

/**
 * Phrases inside BAD_PARAGRAPH that the UI highlights during the demo
 * to make it unmistakable *why* the clause harms customers.
 */
export const BAD_PHRASES: { phrase: string; reason: string }[] = [
  { phrase: "sell all personal data", reason: "Sells user data for profit" },
  { phrase: "precise location, browsing history, device identifiers", reason: "Tracks highly sensitive personal info" },
  { phrase: "advertisers, data brokers, insurance providers", reason: "Shares data with parties that can raise your premiums" },
  { phrase: "sole discretion and without further notice", reason: "No user consent or warning required" },
];

// ── helpers ──────────────────────────────────────────────────────────

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

function roman(n: number): string {
  const vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const syms = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  let r = "";
  for (let i = 0; i < vals.length; i++) {
    while (n >= vals[i]) { r += syms[i]; n -= vals[i]; }
  }
  return r;
}

// ── vocabulary pools ─────────────────────────────────────────────────

const ENTITIES = [
  "Meridian", "the Company", "Meridian Inc.", "the Service Provider",
  "Meridian and its subsidiaries", "the Platform Operator",
];

const PARTY = [
  "the User", "the Customer", "the Subscriber", "the Account Holder",
  "the Licensee", "the Authorized User", "the End User", "the Client",
];

const DATA_SUBJECTS = [
  "personally identifiable information", "Customer Data", "usage analytics",
  "behavioral metadata", "session telemetry", "transaction records",
  "authentication credentials", "API interaction logs", "device fingerprints",
  "geolocation data", "content engagement metrics", "search query histories",
  "payment instruments", "browsing fingerprints", "inferential profiles",
];

const JURISDICTIONS = [
  "the State of Delaware", "the State of California", "the State of New York",
  "the United Kingdom", "the European Economic Area", "Singapore",
  "the Republic of Ireland",
];

const TIME_PERIODS = [
  "thirty (30) calendar days", "sixty (60) business days", "ninety (90) calendar days",
  "twelve (12) months", "twenty-four (24) months", "thirty-six (36) months",
  "five (5) years", "seven (7) years",
];

const MONETARY = [
  "one hundred thousand United States dollars (USD $100,000.00)",
  "two hundred fifty thousand United States dollars (USD $250,000.00)",
  "five hundred thousand United States dollars (USD $500,000.00)",
  "the aggregate fees paid by Customer in the twelve (12) months preceding the claim",
  "the lesser of actual damages or the fees paid under the applicable Order Form",
];

const ACTIONS = [
  "collect, process, store, analyze, aggregate, and otherwise use",
  "access, monitor, record, analyze, and retain",
  "compile, benchmark, model, and distribute",
  "capture, transform, enrich, and make available",
];

const CONDITIONS = [
  "at its sole and reasonable discretion",
  "subject to applicable data protection legislation",
  "in accordance with Meridian's then-current Privacy Policy",
  "as reasonably determined by Meridian's compliance team",
  "to the extent permitted by applicable law",
  "in connection with the provision and improvement of the Services",
  "for any lawful business purpose as determined by Meridian",
];

const OBLIGATIONS = [
  "acknowledges and agrees",
  "represents, warrants, and covenants",
  "accepts and consents",
  "shall indemnify, defend, and hold harmless Meridian from and against",
];

// ── section definitions ──────────────────────────────────────────────

interface SubsectionDef {
  title: string;
  paragraphs: number;
}

interface SectionDef {
  title: string;
  preamble: string;
  subsections: SubsectionDef[];
}

const SECTIONS: SectionDef[] = [
  {
    title: "ACCEPTANCE OF TERMS",
    preamble:
      "These Terms of Service (\"Terms\") constitute a binding agreement between you and Meridian (\"we\", \"us\", \"our\") governing your access to and use of all services, platforms, products, applications, and APIs (collectively, the \"Services\") offered by Meridian and its affiliates. By accessing or using the Services, you (\"User\", \"Customer\", \"you\") acknowledge that you have read and agree to be bound by these Terms.",
    subsections: [
      { title: "Binding Nature of Agreement", paragraphs: 2 },
      { title: "Age and Capacity Requirements", paragraphs: 2 },
      { title: "Modification of Terms", paragraphs: 2 },
      { title: "Severability", paragraphs: 2 },
      { title: "Entire Agreement", paragraphs: 2 },
    ],
  },
  {
    title: "DEFINITIONS",
    preamble:
      "For the purposes of these Terms, the following definitions shall apply unless the context clearly requires otherwise.",
    subsections: [
      { title: "Core Defined Terms", paragraphs: 3 },
      { title: "Service-Specific Definitions", paragraphs: 2 },
      { title: "Data and Privacy Definitions", paragraphs: 3 },
      { title: "Interpretation Rules", paragraphs: 2 },
    ],
  },
  {
    title: "DESCRIPTION OF SERVICES",
    preamble:
      "Meridian provides a suite of enterprise data analytics, cloud infrastructure, and integration services designed to help organizations work with their data. The Services are subject to the specific terms set forth in the applicable Service Schedule or Order Form.",
    subsections: [
      { title: "Platform Services Overview", paragraphs: 2 },
      { title: "Data Analytics and Business Intelligence", paragraphs: 2 },
      { title: "Cloud Infrastructure Services", paragraphs: 2 },
      { title: "API and Integration Services", paragraphs: 2 },
      { title: "Service Level Objectives", paragraphs: 2 },
      { title: "Beta and Pre-Release Services", paragraphs: 2 },
    ],
  },
  {
    title: "USER ACCOUNTS",
    preamble:
      "To access certain features of the Services, you must create and maintain an active account with Meridian. You are responsible for maintaining the accuracy and confidentiality of all account-related information.",
    subsections: [
      { title: "Account Creation Requirements", paragraphs: 2 },
      { title: "Account Security Obligations", paragraphs: 3 },
      { title: "Account Suspension and Termination", paragraphs: 2 },
      { title: "Account Recovery", paragraphs: 2 },
    ],
  },
  {
    title: "PAYMENT TERMS AND BILLING",
    preamble:
      "All fees for the Services are as set forth in the applicable Order Form or pricing schedule. Unless expressly stated otherwise, all fees are quoted in United States dollars and are exclusive of all taxes.",
    subsections: [
      { title: "Fee Structure and Calculation", paragraphs: 2 },
      { title: "Payment Methods and Processing", paragraphs: 2 },
      { title: "Automatic Renewal", paragraphs: 2 },
      { title: "Late Payment Consequences", paragraphs: 2 },
      { title: "Refund Policy", paragraphs: 2 },
    ],
  },
  {
    title: "PRIVACY AND DATA COLLECTION",
    preamble:
      "Meridian strives to be transparent about its data collection and processing practices. This Section describes the categories of information we collect, how we use that information, and the circumstances under which it may be shared with third parties, supplemented by the separately published Privacy Policy.",
    subsections: [
      { title: "Categories of Data Collected", paragraphs: 3 },
      { title: "Automated Data Collection Technologies", paragraphs: 2 },
      { title: "Behavioral Analytics", paragraphs: 2 },
      { title: "Third-Party Data Sharing", paragraphs: 3 },
      { title: "Data Monetization Practices", paragraphs: 2 },
      { title: "International Data Transfers", paragraphs: 2 },
    ],
  },
  {
    title: "DATA PROCESSING AND RETENTION",
    preamble:
      "This Section governs how Meridian processes, retains, and deletes Customer Data collected through the Services. All data processing activities are conducted in accordance with Meridian's data governance framework and applicable data protection legislation.",
    subsections: [
      { title: "Processing Purposes and Legal Bases", paragraphs: 2 },
      { title: "Sub-Processor Engagement", paragraphs: 2 },
      { title: "Data Retention Schedules", paragraphs: 3 },
      { title: "Customer Data Deletion Procedures", paragraphs: 2 },
      { title: "Data Subject Rights and Requests", paragraphs: 2 },
    ],
  },
  {
    title: "INTELLECTUAL PROPERTY",
    preamble:
      "This Section sets forth the intellectual property rights and obligations of Meridian and the User. Nothing in these Terms shall be construed as transferring ownership of any intellectual property from one party to the other except as expressly stated herein.",
    subsections: [
      { title: "Meridian's Proprietary Rights", paragraphs: 2 },
      { title: "License Grant to Users", paragraphs: 2 },
      { title: "User Content License", paragraphs: 2 },
      { title: "Feedback and Suggestions", paragraphs: 2 },
      { title: "Trademark Usage", paragraphs: 2 },
    ],
  },
  {
    title: "ACCEPTABLE USE",
    preamble:
      "You agree to use the Services only for lawful purposes and in accordance with these Terms and all applicable laws. Meridian reserves the right to investigate suspected violations and to take appropriate action, including suspension or termination of your account.",
    subsections: [
      { title: "Prohibited Activities", paragraphs: 3 },
      { title: "Content Restrictions", paragraphs: 2 },
      { title: "Reverse Engineering Restrictions", paragraphs: 2 },
      { title: "Fair Usage and Rate Limiting", paragraphs: 2 },
    ],
  },
  {
    title: "DISCLAIMER OF WARRANTIES",
    preamble:
      "THE SERVICES ARE PROVIDED ON AN \"AS IS\" AND \"AS AVAILABLE\" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, MERIDIAN DISCLAIMS ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.",
    subsections: [
      { title: "General Warranty Disclaimer", paragraphs: 3 },
      { title: "No Guarantee of Availability", paragraphs: 2 },
      { title: "No Guarantee of Accuracy", paragraphs: 2 },
      { title: "Third-Party Services Disclaimer", paragraphs: 2 },
    ],
  },
  {
    title: "LIMITATION OF LIABILITY",
    preamble:
      "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL MERIDIAN, ITS AFFILIATES, OFFICERS, DIRECTORS, OR EMPLOYEES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, OR DATA, REGARDLESS OF THE THEORY OF LIABILITY.",
    subsections: [
      { title: "Exclusion of Consequential Damages", paragraphs: 2 },
      { title: "Cap on Direct Damages", paragraphs: 2 },
      { title: "Exceptions to Liability Limitations", paragraphs: 2 },
      { title: "Force Majeure", paragraphs: 2 },
      { title: "Allocation of Risk", paragraphs: 2 },
    ],
  },
  {
    title: "DISPUTE RESOLUTION",
    preamble:
      "Any dispute arising out of or relating to these Terms shall be resolved in accordance with the procedures set forth in this Section. BY AGREEING TO THESE TERMS, YOU WAIVE YOUR RIGHT TO A JURY TRIAL AND YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION.",
    subsections: [
      { title: "Informal Resolution Procedures", paragraphs: 2 },
      { title: "Mandatory Binding Arbitration", paragraphs: 3 },
      { title: "Class Action Waiver", paragraphs: 2 },
      { title: "Governing Law and Venue", paragraphs: 2 },
    ],
  },
  {
    title: "TERMINATION",
    preamble:
      "Either party may terminate these Terms in accordance with this Section. Meridian reserves the right to suspend or terminate your access to the Services at any time, with or without cause, upon reasonable notice where practicable.",
    subsections: [
      { title: "Termination for Convenience", paragraphs: 2 },
      { title: "Termination for Cause", paragraphs: 2 },
      { title: "Effect of Termination on Data", paragraphs: 2 },
      { title: "Survival Provisions", paragraphs: 2 },
    ],
  },
  {
    title: "GOVERNING LAW AND JURISDICTION",
    preamble:
      "These Terms and any dispute arising out of them shall be governed by and construed in accordance with the laws specified in this Section, without regard to conflict of law principles.",
    subsections: [
      { title: "Choice of Law", paragraphs: 2 },
      { title: "Exclusive Jurisdiction", paragraphs: 2 },
      { title: "Service of Process", paragraphs: 2 },
    ],
  },
  {
    title: "MISCELLANEOUS",
    preamble:
      "The following miscellaneous provisions apply to these Terms and govern matters not otherwise addressed in the preceding Sections.",
    subsections: [
      { title: "Assignment and Transfer", paragraphs: 2 },
      { title: "Notices", paragraphs: 2 },
      { title: "No Agency or Partnership", paragraphs: 2 },
      { title: "Waiver", paragraphs: 2 },
      { title: "Amendments", paragraphs: 2 },
    ],
  },
];

// Section index after which we insert the update marker (deep in the doc)
const MARKER_AFTER_SECTION = 6; // After "PRIVACY AND DATA COLLECTION"

// ── paragraph generation ─────────────────────────────────────────────

function generateParagraph(
  sectionNum: number,
  subNum: number,
  paraNum: number,
  subsectionTitle: string,
): string {
  const seed = sectionNum * 1000 + subNum * 100 + paraNum;
  const entity = pick(ENTITIES, seed);
  const party = pick(PARTY, seed + 1);
  const data = pick(DATA_SUBJECTS, seed + 2);
  const jurisdiction = pick(JURISDICTIONS, seed + 3);
  const timePeriod = pick(TIME_PERIODS, seed + 4);
  const monetary = pick(MONETARY, seed + 5);
  const action = pick(ACTIONS, seed + 6);
  const condition = pick(CONDITIONS, seed + 7);
  const obligation = pick(OBLIGATIONS, seed + 8);
  const data2 = pick(DATA_SUBJECTS, seed + 9);
  const timePeriod2 = pick(TIME_PERIODS, seed + 11);
  const entity2 = pick(ENTITIES, seed + 13);

  const templates = [
    `${party} ${obligation} ${entity} in connection with the ${subsectionTitle.toLowerCase()} provisions set forth herein. ${entity} shall have the right to ${action} any and all ${data} and ${data2} ${condition}, for a period of not less than ${timePeriod} from the date of collection. ${party} further acknowledges that ${entity2} may retain aggregated or anonymized extracts of such information for an additional period of ${timePeriod2} following the expiration or termination of this Agreement.`,

    `In furtherance of the ${subsectionTitle.toLowerCase()} objectives described in this Section ${sectionNum}, ${entity} reserves the right to ${action} information generated through ${party}'s use of the Services, including ${data} and related metadata, ${condition}. ${party} grants ${entity2} a non-exclusive, worldwide, royalty-free license to use such data for the purpose of providing and improving the Services, subject to the confidentiality obligations set forth elsewhere in these Terms.`,

    `Subject to the limitations set forth in this Section and applicable law in ${jurisdiction}, ${entity} shall implement commercially reasonable technical and organizational measures to protect ${data} against unauthorized access, accidental loss, or alteration. ${party} acknowledges that no method of electronic transmission or storage is completely secure, and ${entity2} makes no warranty regarding the absolute security of any information transmitted to or stored by the Services. ${entity}'s aggregate liability for any security incident shall not exceed ${monetary}.`,

    `${party} ${obligation} that the ${subsectionTitle.toLowerCase()} provisions of these Terms reflect a fair and reasonable allocation of risk. ${entity} shall have no obligation to ${party} or to any third party with respect to ${data} except as expressly set forth in this Section and the applicable Service Schedule. All obligations of ${entity2} under this subsection are contingent upon ${party}'s continued compliance with the payment terms and acceptable use requirements set forth elsewhere in these Terms.`,

    `For purposes of compliance with applicable data protection legislation in ${jurisdiction}, the parties agree that ${entity2} acts as an independent data controller with respect to ${data} collected through ${party}'s use of the Services, except to the extent that a separate Data Processing Agreement designates ${entity} as a data processor. As an independent data controller, ${entity} shall determine the purposes and means of processing such data ${condition}, subject to applicable law.`,

    `In connection with the ${subsectionTitle.toLowerCase()} requirements described herein, ${party} agrees to provide ${entity} with information and cooperation reasonably requested by ${entity2} within ${timePeriod} of such request. Failure to comply with such requests may result in suspension of the Services or termination of these Terms, ${condition}. ${entity} may conduct periodic audits of ${party}'s compliance with this Section at ${entity}'s expense, subject to reasonable advance notice during normal business hours.`,

    `${entity} may, from time to time and ${condition}, engage third-party service providers and sub-processors to perform certain functions related to the ${subsectionTitle.toLowerCase()} obligations described in this Section. ${party} consents to such engagement, provided that ${entity2} shall remain responsible for the acts and omissions of its sub-processors to the same extent as if such acts were performed directly by ${entity}. ${entity} maintains a current list of sub-processors on its website.`,
  ];

  return pick(templates, seed + paraNum * 7);
}

// ── main generator ───────────────────────────────────────────────────

export function generateTos(): string {
  const lines: string[] = [];

  lines.push("MERIDIAN");
  lines.push("TERMS OF SERVICE");
  lines.push("");
  lines.push(`Effective Date: January 1, 2024`);
  lines.push(`Last Updated: April 15, 2026`);
  lines.push(`Version: 4.2`);
  lines.push("");
  lines.push(
    "IMPORTANT: PLEASE READ THESE TERMS OF SERVICE CAREFULLY BEFORE USING ANY SERVICES PROVIDED BY MERIDIAN. BY ACCESSING OR USING THE SERVICES, YOU AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE, DO NOT USE THE SERVICES. THESE TERMS CONTAIN A MANDATORY ARBITRATION PROVISION AND A CLASS ACTION WAIVER."
  );
  lines.push("");
  lines.push("─".repeat(80));
  lines.push("");

  for (let s = 0; s < SECTIONS.length; s++) {
    const section = SECTIONS[s];
    const sectionNum = s + 1;

    lines.push(`SECTION ${sectionNum}: ${section.title}`);
    lines.push("");
    lines.push(section.preamble);
    lines.push("");

    for (let sub = 0; sub < section.subsections.length; sub++) {
      const subsection = section.subsections[sub];
      lines.push(`${sectionNum}.${sub + 1} ${subsection.title}.`);
      lines.push("");

      for (let p = 0; p < subsection.paragraphs; p++) {
        const letter = String.fromCharCode(97 + p);
        const para = generateParagraph(sectionNum, sub, p, subsection.title);
        lines.push(`(${letter}) ${para}`);
        lines.push("");
      }
    }

    lines.push("─".repeat(80));
    lines.push("");

    // Inject the update marker deep in the document, after the privacy section
    if (sectionNum === MARKER_AFTER_SECTION) {
      lines.push(UPDATE_MARKER);
      lines.push("");
    }
  }

  const appendices = [
    "SCHEDULE A: LIST OF SUB-PROCESSORS",
    "SCHEDULE B: STANDARD CONTRACTUAL CLAUSES FOR INTERNATIONAL DATA TRANSFERS",
    "SCHEDULE C: TECHNICAL AND ORGANIZATIONAL SECURITY MEASURES",
  ];

  for (let a = 0; a < appendices.length; a++) {
    lines.push(appendices[a]);
    lines.push("");
    for (let item = 1; item <= 6; item++) {
      const condition = pick(CONDITIONS, a * 12 + item);
      const capitalized = condition.charAt(0).toUpperCase() + condition.slice(1);
      lines.push(
        `${roman(a + 1)}.${item} ${capitalized}, ${pick(ENTITIES, a * 12 + item)} shall ${pick(ACTIONS, a * 12 + item)} all ${pick(DATA_SUBJECTS, a * 12 + item)} for a period of ${pick(TIME_PERIODS, a * 12 + item)} following the effective date of this Schedule. ${pick(PARTY, a * 12 + item)} ${pick(OBLIGATIONS, a * 12 + item)} that this Schedule constitutes an integral part of the Terms. The provisions of this Schedule shall survive the termination or expiration of the Terms for a period of ${pick(TIME_PERIODS, a * 12 + item + 2)}.`
      );
      lines.push("");
    }
    lines.push("─".repeat(80));
    lines.push("");
  }

  lines.push("END OF TERMS OF SERVICE");
  lines.push("");
  lines.push(`© 2024-2026 Meridian. All rights reserved.`);
  lines.push("Meridian is a registered trademark of Meridian Holdings, LLC.");

  return lines.join("\n");
}

/** Count words in the generated ToS (for verification) */
export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}
