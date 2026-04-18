/**
 * Generates ~100k words of realistic Terms of Service text.
 * The CRITICAL_SENTENCE is the one that gets removed during the demo
 * to trigger a Perry alert.
 */

export const CRITICAL_SENTENCE =
  "Evil Incorporation unconditionally guarantees that all Customer Data, including but not limited to personally identifiable information, proprietary business logic, source code, trade secrets, API keys, authentication credentials, and derived analytics, shall be permanently and irrecoverably deleted from all Evil Incorporation systems, including primary databases, backup archives, disaster recovery sites, and third-party sub-processor systems, within thirty (30) calendar days following the effective date of account termination, service cancellation, or contract expiration, with written certification of deletion provided to the Customer upon request.";

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
  "Evil Incorporation", "the Company", "Evil Inc.", "the Service Provider",
  "Evil Incorporation and its subsidiaries", "the Platform Operator",
];

const PARTY = [
  "the User", "the Customer", "the Subscriber", "the Account Holder",
  "the Licensee", "the Authorized User", "the End User", "the Client",
];

const DATA_SUBJECTS = [
  "personally identifiable information", "Customer Data", "usage analytics",
  "behavioral metadata", "session telemetry", "transaction records",
  "authentication credentials", "API interaction logs", "device fingerprints",
  "geolocation data", "biometric identifiers", "network traffic patterns",
  "content engagement metrics", "search query histories", "social graph data",
  "payment instruments", "browsing fingerprints", "inferential profiles",
];

const JURISDICTIONS = [
  "the State of Delaware", "the State of California", "the State of New York",
  "the United Kingdom", "the European Economic Area", "Singapore",
  "the Cayman Islands", "the State of Texas", "the Republic of Ireland",
];

const TIME_PERIODS = [
  "thirty (30) calendar days", "sixty (60) business days", "ninety (90) calendar days",
  "one hundred eighty (180) calendar days", "twelve (12) months",
  "twenty-four (24) months", "thirty-six (36) months", "five (5) years",
  "seven (7) years", "the maximum period permitted by applicable law",
];

const MONETARY = [
  "one hundred thousand United States dollars (USD $100,000.00)",
  "two hundred fifty thousand United States dollars (USD $250,000.00)",
  "five hundred thousand United States dollars (USD $500,000.00)",
  "one million United States dollars (USD $1,000,000.00)",
  "the aggregate fees paid by Customer in the twelve (12) months preceding the claim",
  "the lesser of actual damages or the fees paid under the applicable Order Form",
];

const ACTIONS = [
  "collect, process, store, analyze, aggregate, de-identify, re-identify, transfer, sublicense, and otherwise exploit",
  "access, monitor, record, analyze, and retain",
  "intercept, decrypt, inspect, copy, and archive",
  "harvest, index, profile, correlate, and monetize",
  "compile, benchmark, model, and distribute",
  "capture, transform, enrich, and commercialize",
];

const CONDITIONS = [
  "at its sole and absolute discretion",
  "without prior notice to or consent from the User",
  "subject to applicable data protection legislation",
  "in accordance with Evil Incorporation's then-current Privacy Policy",
  "as reasonably determined by Evil Incorporation's compliance team",
  "to the fullest extent permitted by applicable law",
  "notwithstanding any contrary provision herein",
  "irrespective of any opt-out preferences previously communicated by the User",
  "in connection with the provision, improvement, or commercialization of the Services",
  "for any lawful business purpose as determined by Evil Incorporation",
];

const OBLIGATIONS = [
  "acknowledges and irrevocably agrees",
  "represents, warrants, and covenants",
  "unconditionally accepts and consents",
  "hereby grants a perpetual, irrevocable, worldwide, royalty-free, fully sublicensable license to",
  "expressly waives any and all claims arising from or related to",
  "shall indemnify, defend, and hold harmless Evil Incorporation from and against",
];

// ── section definitions ──────────────────────────────────────────────

interface SubsectionDef {
  title: string;
  paragraphs: number; // how many paragraphs to generate
}

interface SectionDef {
  title: string;
  preamble: string;
  subsections: SubsectionDef[];
  /** If set, inject this exact text in the specified subsection index */
  inject?: { subsectionIndex: number; text: string };
}

const SECTIONS: SectionDef[] = [
  {
    title: "ACCEPTANCE OF TERMS AND CONDITIONS",
    preamble: "These Terms of Service (\"Terms\", \"Agreement\", \"TOS\") constitute a legally binding agreement between you and Evil Incorporation (\"Evil Inc.\", \"we\", \"us\", \"our\", \"the Company\") governing your access to and use of all services, platforms, products, applications, websites, APIs, and related technologies (collectively, the \"Services\") offered by Evil Incorporation and its worldwide network of subsidiaries, affiliates, partners, contractors, and sub-processors. By accessing, downloading, installing, registering for, or otherwise using any component of the Services, you (\"User\", \"Customer\", \"Subscriber\", \"you\", \"your\") acknowledge that you have read, understood, and agree to be bound by these Terms in their entirety, including all schedules, exhibits, addenda, and policies incorporated herein by reference. If you do not agree to every provision of these Terms, you must immediately cease all use of the Services and delete any copies of Evil Incorporation software from your devices.",
    subsections: [
      { title: "Binding Nature of Agreement", paragraphs: 4 },
      { title: "Electronic Acceptance and Digital Signatures", paragraphs: 3 },
      { title: "Age and Capacity Requirements", paragraphs: 3 },
      { title: "Corporate and Organizational Acceptance", paragraphs: 4 },
      { title: "Agent Authorization and Delegation", paragraphs: 3 },
      { title: "Modification of Terms", paragraphs: 4 },
      { title: "Severability of Provisions", paragraphs: 3 },
      { title: "Entire Agreement", paragraphs: 3 },
      { title: "Waiver of Class Action Rights", paragraphs: 4 },
      { title: "Third-Party Beneficiary Rights", paragraphs: 3 },
      { title: "Survival of Obligations", paragraphs: 3 },
      { title: "Counterparts and Electronic Delivery", paragraphs: 2 },
    ],
  },
  {
    title: "DEFINITIONS AND INTERPRETATION",
    preamble: "For the purposes of these Terms and all related agreements, policies, and documentation, the following definitions shall apply unless the context clearly requires otherwise. All defined terms shall have the meanings ascribed to them in this Section regardless of whether they appear in singular or plural form, and regardless of capitalization in subsequent sections.",
    subsections: [
      { title: "Core Defined Terms", paragraphs: 5 },
      { title: "Service-Specific Definitions", paragraphs: 4 },
      { title: "Data and Privacy Definitions", paragraphs: 5 },
      { title: "Financial and Commercial Terms", paragraphs: 4 },
      { title: "Technical Infrastructure Definitions", paragraphs: 4 },
      { title: "Legal and Regulatory Definitions", paragraphs: 4 },
      { title: "Interpretation Rules", paragraphs: 3 },
      { title: "Precedence of Documents", paragraphs: 3 },
      { title: "Cross-Reference Conventions", paragraphs: 2 },
      { title: "Temporal References", paragraphs: 3 },
    ],
  },
  {
    title: "DESCRIPTION OF SERVICES",
    preamble: "Evil Incorporation provides a comprehensive suite of enterprise intelligence, data analytics, cloud infrastructure, machine learning, artificial intelligence, and managed technology services designed to help organizations unlock actionable insights from their data assets. The Services encompass, but are not limited to, the following categories and capabilities, each of which is subject to the specific terms and conditions set forth in the applicable Service Schedule or Order Form.",
    subsections: [
      { title: "Platform Services Overview", paragraphs: 4 },
      { title: "Data Analytics and Business Intelligence", paragraphs: 5 },
      { title: "Cloud Infrastructure Services", paragraphs: 4 },
      { title: "Artificial Intelligence and Machine Learning", paragraphs: 5 },
      { title: "API and Integration Services", paragraphs: 4 },
      { title: "Professional and Consulting Services", paragraphs: 3 },
      { title: "Managed Security Services", paragraphs: 4 },
      { title: "Service Level Objectives", paragraphs: 4 },
      { title: "Service Modifications and Deprecation", paragraphs: 4 },
      { title: "Beta and Pre-Release Services", paragraphs: 3 },
      { title: "Regional Service Availability", paragraphs: 3 },
      { title: "Service Dependencies and Prerequisites", paragraphs: 3 },
    ],
  },
  {
    title: "USER ACCOUNTS AND REGISTRATION",
    preamble: "To access certain features of the Services, you must create and maintain an active account with Evil Incorporation. The registration process requires you to provide certain information, and you are responsible for maintaining the accuracy, completeness, and confidentiality of all account-related information. Evil Incorporation reserves the right to verify any information you provide and to refuse or cancel any registration at any time and for any reason.",
    subsections: [
      { title: "Account Creation Requirements", paragraphs: 4 },
      { title: "Identity Verification Procedures", paragraphs: 4 },
      { title: "Account Security Obligations", paragraphs: 5 },
      { title: "Multi-Factor Authentication Requirements", paragraphs: 3 },
      { title: "Account Sharing and Delegation", paragraphs: 4 },
      { title: "Organizational Account Hierarchies", paragraphs: 3 },
      { title: "Account Suspension and Termination", paragraphs: 4 },
      { title: "Account Recovery Procedures", paragraphs: 3 },
      { title: "Data Portability Upon Account Closure", paragraphs: 4 },
      { title: "Inactive Account Policies", paragraphs: 3 },
    ],
  },
  {
    title: "PAYMENT TERMS, FEES, AND BILLING",
    preamble: "All fees for the Services are as set forth in the applicable Order Form, pricing schedule, or as otherwise communicated to you through the platform interface. Unless expressly stated otherwise, all fees are quoted in United States dollars, are non-refundable, and are exclusive of all taxes, duties, levies, and similar governmental charges. Evil Incorporation reserves the right to modify its pricing at any time upon thirty (30) days' notice.",
    subsections: [
      { title: "Fee Structure and Calculation", paragraphs: 5 },
      { title: "Payment Methods and Processing", paragraphs: 4 },
      { title: "Automatic Renewal and Recurring Charges", paragraphs: 4 },
      { title: "Late Payment Consequences", paragraphs: 4 },
      { title: "Taxes and Withholding", paragraphs: 4 },
      { title: "Currency Conversion", paragraphs: 3 },
      { title: "Refund Policy", paragraphs: 4 },
      { title: "Dispute Resolution for Billing", paragraphs: 3 },
      { title: "Credit and Promotional Terms", paragraphs: 3 },
      { title: "Price Adjustment Mechanisms", paragraphs: 4 },
      { title: "Audit Rights for Usage-Based Billing", paragraphs: 3 },
      { title: "Overage Charges and Rate Limiting", paragraphs: 4 },
    ],
  },
  {
    title: "PRIVACY, DATA COLLECTION, AND SURVEILLANCE PRACTICES",
    preamble: "Evil Incorporation is committed to transparency regarding its data collection, processing, and utilization practices. This Section describes the types of information Evil Incorporation collects, how such information is used, and the circumstances under which it may be disclosed to third parties. By using the Services, you consent to the data practices described in this Section and in Evil Incorporation's separately published Privacy Policy, which is incorporated herein by reference.",
    subsections: [
      { title: "Categories of Data Collected", paragraphs: 5 },
      { title: "Automated Data Collection Technologies", paragraphs: 5 },
      { title: "Behavioral Analytics and Profiling", paragraphs: 4 },
      { title: "Cross-Device and Cross-Platform Tracking", paragraphs: 4 },
      { title: "Third-Party Data Enrichment", paragraphs: 4 },
      { title: "Data Sharing with Affiliates and Partners", paragraphs: 5 },
      { title: "Government and Law Enforcement Disclosures", paragraphs: 4 },
      { title: "Data Monetization Practices", paragraphs: 4 },
      { title: "Consent Mechanisms and Opt-Out Limitations", paragraphs: 4 },
      { title: "International Data Transfers", paragraphs: 4 },
      { title: "Biometric Data Collection", paragraphs: 3 },
      { title: "Location Tracking and Geofencing", paragraphs: 3 },
      { title: "Communication Interception and Analysis", paragraphs: 3 },
      { title: "Predictive Modeling and Inference Generation", paragraphs: 4 },
    ],
  },
  {
    title: "DATA PROCESSING, RETENTION, AND DELETION",
    preamble: "This Section governs how Evil Incorporation processes, retains, and (where applicable) deletes Customer Data and other information collected through or in connection with the Services. Evil Incorporation maintains comprehensive data lifecycle management procedures that are designed to balance operational requirements, legal obligations, and customer expectations. All data processing activities are conducted in accordance with Evil Incorporation's internal data governance framework and applicable data protection legislation.",
    subsections: [
      { title: "Data Processing Purposes and Legal Bases", paragraphs: 5 },
      { title: "Sub-Processor Engagement and Oversight", paragraphs: 4 },
      { title: "Data Retention Schedules", paragraphs: 5 },
      { title: "Customer Data Deletion Procedures", paragraphs: 5 },
      { title: "Backup and Disaster Recovery Data", paragraphs: 4 },
      { title: "Anonymization and Pseudonymization", paragraphs: 4 },
      { title: "Data Subject Rights and Requests", paragraphs: 4 },
      { title: "Cross-Border Data Processing", paragraphs: 4 },
      { title: "Data Processing Impact Assessments", paragraphs: 3 },
      { title: "Technical and Organizational Measures", paragraphs: 4 },
      { title: "Data Breach Notification Procedures", paragraphs: 4 },
      { title: "Audit and Compliance Verification", paragraphs: 3 },
    ],
    inject: {
      subsectionIndex: 3, // "Customer Data Deletion Procedures"
      text: CRITICAL_SENTENCE,
    },
  },
  {
    title: "INTELLECTUAL PROPERTY RIGHTS",
    preamble: "This Section sets forth the intellectual property rights and obligations of both Evil Incorporation and the User with respect to the Services, including any content, materials, inventions, or works created in connection with or through the use of the Services. Nothing in these Terms shall be construed as transferring ownership of any intellectual property from one party to the other except as expressly stated herein.",
    subsections: [
      { title: "Evil Incorporation's Proprietary Rights", paragraphs: 4 },
      { title: "License Grant to Users", paragraphs: 4 },
      { title: "User Content License to Evil Incorporation", paragraphs: 5 },
      { title: "Feedback and Suggestions", paragraphs: 3 },
      { title: "Derived Works and Aggregated Data", paragraphs: 4 },
      { title: "Open Source Components", paragraphs: 4 },
      { title: "Trademark Usage Guidelines", paragraphs: 3 },
      { title: "DMCA and Copyright Infringement", paragraphs: 4 },
      { title: "Patent Rights and Indemnification", paragraphs: 4 },
      { title: "Trade Secret Protection", paragraphs: 3 },
      { title: "Joint Inventions", paragraphs: 3 },
      { title: "Moral Rights Waiver", paragraphs: 3 },
    ],
  },
  {
    title: "ACCEPTABLE USE POLICY",
    preamble: "You agree to use the Services only for lawful purposes and in accordance with these Terms and all applicable local, state, national, and international laws and regulations. Evil Incorporation reserves the right to investigate any suspected violation of this Acceptable Use Policy and to take any action it deems appropriate, including but not limited to suspension or termination of your account, reporting to law enforcement authorities, and pursuing civil remedies.",
    subsections: [
      { title: "Prohibited Activities and Conduct", paragraphs: 5 },
      { title: "Content Restrictions", paragraphs: 4 },
      { title: "Network and Infrastructure Abuse", paragraphs: 4 },
      { title: "Reverse Engineering Restrictions", paragraphs: 4 },
      { title: "Competitive Use Restrictions", paragraphs: 3 },
      { title: "Rate Limiting and Fair Usage", paragraphs: 4 },
      { title: "Monitoring and Enforcement", paragraphs: 4 },
      { title: "Reporting Violations", paragraphs: 3 },
      { title: "Consequences of Violation", paragraphs: 4 },
      { title: "Cooperation with Investigations", paragraphs: 3 },
    ],
  },
  {
    title: "DISCLAIMER OF WARRANTIES",
    preamble: "THE SERVICES ARE PROVIDED ON AN \"AS IS\" AND \"AS AVAILABLE\" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, EVIL INCORPORATION DISCLAIMS ALL WARRANTIES, EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.",
    subsections: [
      { title: "General Warranty Disclaimer", paragraphs: 5 },
      { title: "No Guarantee of Availability or Uptime", paragraphs: 4 },
      { title: "No Guarantee of Accuracy or Completeness", paragraphs: 4 },
      { title: "No Warranty Regarding Third-Party Services", paragraphs: 4 },
      { title: "No Warranty for AI and Machine Learning Outputs", paragraphs: 4 },
      { title: "Security Disclaimer", paragraphs: 4 },
      { title: "Regulatory Compliance Disclaimer", paragraphs: 3 },
      { title: "Disclaimer of Fitness for Specific Industries", paragraphs: 4 },
      { title: "Beta Services Disclaimer", paragraphs: 3 },
      { title: "Data Integrity Disclaimer", paragraphs: 3 },
    ],
  },
  {
    title: "LIMITATION OF LIABILITY",
    preamble: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL EVIL INCORPORATION, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, REGARDLESS OF THE THEORY OF LIABILITY AND EVEN IF EVIL INCORPORATION HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
    subsections: [
      { title: "Exclusion of Consequential Damages", paragraphs: 5 },
      { title: "Cap on Direct Damages", paragraphs: 4 },
      { title: "Exceptions to Liability Limitations", paragraphs: 4 },
      { title: "Force Majeure and Extraordinary Events", paragraphs: 4 },
      { title: "Allocation of Risk", paragraphs: 4 },
      { title: "Statute of Limitations for Claims", paragraphs: 3 },
      { title: "Aggregate Liability Across Claims", paragraphs: 4 },
      { title: "Liability for Free or Trial Services", paragraphs: 3 },
      { title: "Subcontractor and Third-Party Liability", paragraphs: 3 },
      { title: "Insurance Requirements", paragraphs: 3 },
    ],
  },
  {
    title: "INDEMNIFICATION",
    preamble: "You agree to indemnify, defend, and hold harmless Evil Incorporation and its officers, directors, employees, agents, affiliates, successors, and assigns from and against any and all claims, liabilities, damages, judgments, awards, losses, costs, expenses, and fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Services.",
    subsections: [
      { title: "Scope of Indemnification Obligations", paragraphs: 5 },
      { title: "Indemnification Procedures", paragraphs: 4 },
      { title: "Control of Defense", paragraphs: 4 },
      { title: "Settlement Authority", paragraphs: 3 },
      { title: "IP Infringement Indemnification by Evil Inc.", paragraphs: 4 },
      { title: "Mutual Indemnification Carve-Outs", paragraphs: 3 },
      { title: "Survival of Indemnification Obligations", paragraphs: 3 },
      { title: "Insurance and Financial Assurance", paragraphs: 3 },
      { title: "Limitation on Indemnification", paragraphs: 3 },
      { title: "Notice and Cooperation Requirements", paragraphs: 4 },
    ],
  },
  {
    title: "DISPUTE RESOLUTION AND ARBITRATION",
    preamble: "Any dispute, controversy, or claim arising out of or relating to these Terms, or the breach, termination, or invalidity thereof, shall be resolved in accordance with the dispute resolution procedures set forth in this Section. BY AGREEING TO THESE TERMS, YOU ARE WAIVING YOUR RIGHT TO A JURY TRIAL AND YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION, COLLECTIVE ACTION, OR REPRESENTATIVE PROCEEDING.",
    subsections: [
      { title: "Informal Resolution Procedures", paragraphs: 4 },
      { title: "Mandatory Binding Arbitration", paragraphs: 5 },
      { title: "Arbitration Rules and Procedures", paragraphs: 5 },
      { title: "Class Action and Jury Trial Waiver", paragraphs: 4 },
      { title: "Small Claims Exception", paragraphs: 3 },
      { title: "Injunctive Relief Carve-Out", paragraphs: 3 },
      { title: "Governing Law and Venue", paragraphs: 4 },
      { title: "Costs and Fees Allocation", paragraphs: 3 },
      { title: "Confidentiality of Proceedings", paragraphs: 3 },
      { title: "Multi-Party Disputes", paragraphs: 3 },
      { title: "International Dispute Resolution", paragraphs: 4 },
      { title: "Statute of Limitations", paragraphs: 3 },
    ],
  },
  {
    title: "TERMINATION AND SUSPENSION",
    preamble: "Either party may terminate these Terms in accordance with the provisions of this Section. Evil Incorporation reserves the right to suspend or terminate your access to the Services at any time, with or without cause, and with or without notice. Upon termination, certain provisions of these Terms shall survive as set forth herein.",
    subsections: [
      { title: "Termination for Convenience", paragraphs: 4 },
      { title: "Termination for Cause", paragraphs: 5 },
      { title: "Suspension of Services", paragraphs: 4 },
      { title: "Effect of Termination on Data", paragraphs: 4 },
      { title: "Post-Termination Obligations", paragraphs: 4 },
      { title: "Transition Assistance", paragraphs: 3 },
      { title: "Refund Upon Termination", paragraphs: 4 },
      { title: "Survival Provisions", paragraphs: 4 },
      { title: "Re-Activation Procedures", paragraphs: 3 },
      { title: "Wind-Down Period", paragraphs: 3 },
    ],
  },
  {
    title: "CONFIDENTIALITY OBLIGATIONS",
    preamble: "Each party acknowledges that, in connection with these Terms and the use of the Services, it may receive or have access to Confidential Information of the other party. Each party agrees to protect the confidentiality of the other party's Confidential Information using the same degree of care that it uses to protect its own Confidential Information of a similar nature, but in no event less than reasonable care.",
    subsections: [
      { title: "Definition of Confidential Information", paragraphs: 4 },
      { title: "Exclusions from Confidential Information", paragraphs: 3 },
      { title: "Obligations of Receiving Party", paragraphs: 5 },
      { title: "Permitted Disclosures", paragraphs: 4 },
      { title: "Compelled Disclosure", paragraphs: 3 },
      { title: "Return or Destruction of Materials", paragraphs: 4 },
      { title: "Injunctive Relief for Breach", paragraphs: 3 },
      { title: "Duration of Confidentiality Obligations", paragraphs: 3 },
      { title: "Residual Knowledge Exception", paragraphs: 3 },
      { title: "Non-Solicitation and Non-Competition", paragraphs: 4 },
    ],
  },
  {
    title: "EXPORT CONTROLS AND SANCTIONS COMPLIANCE",
    preamble: "The Services and any related technology, documentation, and materials are subject to U.S. export control laws and regulations, including the Export Administration Regulations (EAR) administered by the U.S. Department of Commerce, Bureau of Industry and Security, and may also be subject to the trade and economic sanctions programs maintained by the U.S. Department of Treasury, Office of Foreign Assets Control (OFAC). You agree to comply with all applicable export control laws and sanctions regulations in connection with your use of the Services.",
    subsections: [
      { title: "Export Control Compliance Obligations", paragraphs: 4 },
      { title: "Sanctions Screening Requirements", paragraphs: 4 },
      { title: "End-Use and End-User Restrictions", paragraphs: 4 },
      { title: "Deemed Export Controls", paragraphs: 3 },
      { title: "Encryption Technology Compliance", paragraphs: 4 },
      { title: "Anti-Bribery and Anti-Corruption", paragraphs: 4 },
      { title: "Anti-Money Laundering Compliance", paragraphs: 3 },
      { title: "Government Contract Compliance", paragraphs: 4 },
      { title: "Conflict Minerals and Supply Chain", paragraphs: 3 },
      { title: "Reporting Obligations", paragraphs: 3 },
    ],
  },
  {
    title: "ACCESSIBILITY AND NON-DISCRIMINATION",
    preamble: "Evil Incorporation is committed to ensuring that its Services are accessible to all users, including individuals with disabilities, in accordance with applicable accessibility standards and non-discrimination laws. This Section describes Evil Incorporation's accessibility commitments and the mechanisms available for reporting accessibility barriers.",
    subsections: [
      { title: "Accessibility Standards Compliance", paragraphs: 4 },
      { title: "Assistive Technology Compatibility", paragraphs: 3 },
      { title: "Accessibility Feedback Mechanisms", paragraphs: 3 },
      { title: "Non-Discrimination Policy", paragraphs: 4 },
      { title: "Reasonable Accommodations", paragraphs: 3 },
      { title: "Accessibility Remediation Timeline", paragraphs: 3 },
      { title: "Third-Party Accessibility", paragraphs: 3 },
      { title: "Voluntary Product Accessibility Template", paragraphs: 3 },
    ],
  },
  {
    title: "COMMUNICATIONS AND ELECTRONIC NOTICES",
    preamble: "By creating an account or using the Services, you consent to receive communications from Evil Incorporation electronically. Evil Incorporation may communicate with you by email, by posting notices on the platform, by push notification, by text message, or through any other means that Evil Incorporation deems appropriate. You agree that all agreements, notices, disclosures, and other communications provided to you electronically satisfy any legal requirement that such communications be in writing.",
    subsections: [
      { title: "Consent to Electronic Communications", paragraphs: 4 },
      { title: "Marketing and Promotional Communications", paragraphs: 4 },
      { title: "Transactional and Service Communications", paragraphs: 3 },
      { title: "Communication Preferences and Opt-Out", paragraphs: 4 },
      { title: "SMS and Text Message Terms", paragraphs: 3 },
      { title: "Push Notification Consent", paragraphs: 3 },
      { title: "Email Deliverability", paragraphs: 3 },
      { title: "Social Media Communications", paragraphs: 3 },
      { title: "Telephone Communications and Recording", paragraphs: 4 },
      { title: "TCPA Compliance", paragraphs: 3 },
    ],
  },
  {
    title: "API TERMS OF USE",
    preamble: "This Section sets forth additional terms and conditions governing your access to and use of Evil Incorporation's application programming interfaces (\"APIs\"), software development kits (\"SDKs\"), and related documentation and tools. Your use of any Evil Incorporation API is subject to both these Terms and any additional API-specific terms set forth in the applicable API documentation.",
    subsections: [
      { title: "API License and Access", paragraphs: 4 },
      { title: "API Rate Limits and Quotas", paragraphs: 4 },
      { title: "API Key Management and Security", paragraphs: 4 },
      { title: "API Data Usage Restrictions", paragraphs: 5 },
      { title: "API Versioning and Deprecation", paragraphs: 4 },
      { title: "API Service Level Commitments", paragraphs: 3 },
      { title: "Webhook and Callback Security", paragraphs: 4 },
      { title: "SDK License Terms", paragraphs: 3 },
      { title: "API Monitoring and Analytics", paragraphs: 3 },
      { title: "Developer Program Requirements", paragraphs: 3 },
      { title: "API Marketplace Terms", paragraphs: 3 },
      { title: "GraphQL and REST Specific Terms", paragraphs: 3 },
    ],
  },
  {
    title: "USER-GENERATED CONTENT",
    preamble: "The Services may allow you to submit, upload, publish, or otherwise make available content, including but not limited to text, photographs, videos, audio recordings, code, data, and other materials (collectively, \"User Content\"). This Section governs your rights and responsibilities with respect to User Content and the rights you grant to Evil Incorporation in connection with such content.",
    subsections: [
      { title: "User Content Ownership", paragraphs: 4 },
      { title: "License Grant to Evil Incorporation", paragraphs: 5 },
      { title: "Content Moderation and Review", paragraphs: 4 },
      { title: "Prohibited Content Categories", paragraphs: 5 },
      { title: "Content Removal and Takedown", paragraphs: 4 },
      { title: "User Content Representations and Warranties", paragraphs: 4 },
      { title: "Evil Incorporation's Use of User Content", paragraphs: 4 },
      { title: "Content Backup and Recovery", paragraphs: 3 },
      { title: "Content Portability", paragraphs: 3 },
      { title: "AI Training on User Content", paragraphs: 4 },
      { title: "Content Attribution", paragraphs: 3 },
    ],
  },
  {
    title: "SECURITY PRACTICES AND OBLIGATIONS",
    preamble: "Evil Incorporation maintains a comprehensive information security program designed to protect the confidentiality, integrity, and availability of Customer Data and the Services. This Section describes the security measures Evil Incorporation implements and the security-related obligations of Users of the Services.",
    subsections: [
      { title: "Security Program Overview", paragraphs: 4 },
      { title: "Encryption Standards", paragraphs: 4 },
      { title: "Access Control and Authentication", paragraphs: 4 },
      { title: "Vulnerability Management", paragraphs: 4 },
      { title: "Incident Response Procedures", paragraphs: 5 },
      { title: "Penetration Testing and Audits", paragraphs: 3 },
      { title: "Physical Security", paragraphs: 3 },
      { title: "Employee Security Training", paragraphs: 3 },
      { title: "Customer Security Responsibilities", paragraphs: 4 },
      { title: "Security Certifications and Compliance", paragraphs: 3 },
      { title: "Bug Bounty Program", paragraphs: 3 },
      { title: "Security Notifications", paragraphs: 3 },
    ],
  },
  {
    title: "SERVICE LEVEL AGREEMENT",
    preamble: "Subject to the terms and conditions of these Terms, Evil Incorporation commits to the service levels described in this Section with respect to the availability and performance of the production Services. This SLA does not apply to non-production environments, beta features, or free-tier services. Service credits are the sole and exclusive remedy for any failure to meet the service levels described herein.",
    subsections: [
      { title: "Uptime Commitment", paragraphs: 4 },
      { title: "Measurement Methodology", paragraphs: 4 },
      { title: "Exclusions from Uptime Calculation", paragraphs: 4 },
      { title: "Service Credit Calculation", paragraphs: 4 },
      { title: "Credit Request Procedures", paragraphs: 3 },
      { title: "Maintenance Windows", paragraphs: 3 },
      { title: "Performance Benchmarks", paragraphs: 4 },
      { title: "Support Response Times", paragraphs: 4 },
      { title: "Escalation Procedures", paragraphs: 3 },
      { title: "SLA Reporting and Transparency", paragraphs: 3 },
    ],
  },
  {
    title: "GOVERNING LAW AND JURISDICTION",
    preamble: "These Terms and any dispute or claim arising out of or in connection with them or their subject matter or formation (including non-contractual disputes or claims) shall be governed by and construed in accordance with the laws specified in this Section, without regard to conflict of law principles.",
    subsections: [
      { title: "Choice of Law", paragraphs: 4 },
      { title: "Exclusive Jurisdiction", paragraphs: 4 },
      { title: "Forum Selection", paragraphs: 3 },
      { title: "Waiver of Inconvenient Forum", paragraphs: 3 },
      { title: "Service of Process", paragraphs: 3 },
      { title: "International Arbitration Alternative", paragraphs: 4 },
      { title: "Multi-Jurisdictional Compliance", paragraphs: 4 },
      { title: "Regulatory Authority Submissions", paragraphs: 3 },
      { title: "Sovereign Immunity Waiver", paragraphs: 3 },
      { title: "Convention Exclusions", paragraphs: 3 },
    ],
  },
  {
    title: "MISCELLANEOUS PROVISIONS",
    preamble: "The following miscellaneous provisions apply to these Terms and govern matters not otherwise addressed in the preceding Sections. These provisions are an integral part of the agreement between you and Evil Incorporation.",
    subsections: [
      { title: "Assignment and Transfer", paragraphs: 4 },
      { title: "Force Majeure", paragraphs: 4 },
      { title: "Independent Contractor Relationship", paragraphs: 3 },
      { title: "No Agency or Partnership", paragraphs: 3 },
      { title: "Headings and Construction", paragraphs: 3 },
      { title: "Cumulative Remedies", paragraphs: 3 },
      { title: "No Third-Party Beneficiaries", paragraphs: 3 },
      { title: "Notices", paragraphs: 4 },
      { title: "Publicity and Case Studies", paragraphs: 3 },
      { title: "Government End Users", paragraphs: 4 },
      { title: "Entire Agreement", paragraphs: 3 },
      { title: "Amendments", paragraphs: 3 },
      { title: "Waiver", paragraphs: 3 },
      { title: "Successors and Assigns", paragraphs: 3 },
    ],
  },
  {
    title: "DATA PROTECTION ADDENDUM",
    preamble: "This Data Protection Addendum (\"DPA\") supplements the Terms of Service and applies to the extent that Evil Incorporation processes Personal Data on behalf of the Customer in connection with the provision of the Services. This DPA is incorporated into and forms part of the Terms. In the event of any conflict between this DPA and the Terms, this DPA shall prevail with respect to the processing of Personal Data.",
    subsections: [
      { title: "Scope and Application of DPA", paragraphs: 4 },
      { title: "Roles and Responsibilities", paragraphs: 4 },
      { title: "Processing Instructions", paragraphs: 5 },
      { title: "Sub-Processor Management", paragraphs: 5 },
      { title: "International Transfer Mechanisms", paragraphs: 5 },
      { title: "Data Subject Rights Support", paragraphs: 4 },
      { title: "Security Measures", paragraphs: 4 },
      { title: "Data Protection Impact Assessment Support", paragraphs: 3 },
      { title: "Return and Deletion of Data", paragraphs: 4 },
      { title: "Audit and Inspection Rights", paragraphs: 4 },
      { title: "Breach Notification Obligations", paragraphs: 4 },
      { title: "Standard Contractual Clauses", paragraphs: 4 },
      { title: "GDPR Specific Provisions", paragraphs: 4 },
      { title: "CCPA Specific Provisions", paragraphs: 4 },
    ],
  },
  {
    title: "ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING SUPPLEMENT",
    preamble: "This Supplement applies to the extent that the Services include or utilize artificial intelligence, machine learning, deep learning, natural language processing, computer vision, or other algorithmic technologies (collectively, \"AI Technologies\"). The use of AI Technologies within the Services is subject to the terms of this Supplement in addition to all other applicable provisions of these Terms.",
    subsections: [
      { title: "AI Technology Description and Scope", paragraphs: 4 },
      { title: "Training Data and Model Development", paragraphs: 5 },
      { title: "AI Output Ownership and Licensing", paragraphs: 4 },
      { title: "AI Accuracy and Reliability Disclaimers", paragraphs: 4 },
      { title: "Bias and Fairness Commitments", paragraphs: 4 },
      { title: "Explainability and Transparency", paragraphs: 4 },
      { title: "Human Oversight Requirements", paragraphs: 3 },
      { title: "Prohibited AI Use Cases", paragraphs: 4 },
      { title: "AI Model Updates and Versioning", paragraphs: 3 },
      { title: "Customer AI Training Opt-Out", paragraphs: 4 },
      { title: "Regulatory Compliance for AI", paragraphs: 4 },
      { title: "AI Incident Reporting", paragraphs: 3 },
    ],
  },
  {
    title: "CLOUD INFRASTRUCTURE SUPPLEMENT",
    preamble: "This Supplement applies to the extent that the Services include cloud computing infrastructure, storage, networking, container orchestration, serverless computing, or related infrastructure-as-a-service, platform-as-a-service, or software-as-a-service offerings (collectively, \"Cloud Services\"). The use of Cloud Services is subject to the terms of this Supplement in addition to all other applicable provisions of these Terms.",
    subsections: [
      { title: "Cloud Service Description", paragraphs: 4 },
      { title: "Resource Allocation and Scaling", paragraphs: 4 },
      { title: "Data Residency and Sovereignty", paragraphs: 5 },
      { title: "Multi-Tenancy and Isolation", paragraphs: 4 },
      { title: "Backup and Disaster Recovery", paragraphs: 4 },
      { title: "Network Security and Segmentation", paragraphs: 4 },
      { title: "Container and Orchestration Security", paragraphs: 3 },
      { title: "Serverless Computing Terms", paragraphs: 3 },
      { title: "Cloud Migration Services", paragraphs: 3 },
      { title: "Shared Responsibility Model", paragraphs: 4 },
      { title: "Cloud Cost Management", paragraphs: 3 },
      { title: "Environmental and Sustainability Commitments", paragraphs: 3 },
    ],
  },
  {
    title: "ENTERPRISE SUBSCRIPTION TERMS",
    preamble: "This Section sets forth additional terms applicable to enterprise-tier subscriptions and custom agreements entered into between Evil Incorporation and enterprise customers. Enterprise subscriptions are governed by both these Terms and the applicable Enterprise Order Form or Statement of Work executed by the parties.",
    subsections: [
      { title: "Enterprise Licensing Model", paragraphs: 4 },
      { title: "Volume Pricing and Commitments", paragraphs: 4 },
      { title: "Dedicated Support and Success Management", paragraphs: 4 },
      { title: "Custom Development and Integration", paragraphs: 4 },
      { title: "Enterprise Security Features", paragraphs: 4 },
      { title: "Compliance and Audit Support", paragraphs: 4 },
      { title: "Training and Enablement", paragraphs: 3 },
      { title: "Governance and Oversight", paragraphs: 3 },
      { title: "Contract Renewal and Renegotiation", paragraphs: 4 },
      { title: "Multi-Year Commitment Terms", paragraphs: 3 },
    ],
  },
  {
    title: "PROFESSIONAL SERVICES TERMS",
    preamble: "This Section applies to any professional services, consulting, implementation, training, or advisory services (collectively, \"Professional Services\") provided by Evil Incorporation to the Customer under a Statement of Work or similar ordering document. Professional Services are provided subject to these Terms and the specific scope, timeline, and fees set forth in the applicable Statement of Work.",
    subsections: [
      { title: "Scope of Professional Services", paragraphs: 4 },
      { title: "Engagement and Resource Allocation", paragraphs: 4 },
      { title: "Deliverables and Acceptance Criteria", paragraphs: 4 },
      { title: "Change Order Procedures", paragraphs: 3 },
      { title: "Professional Services Fees", paragraphs: 4 },
      { title: "Travel and Expense Reimbursement", paragraphs: 3 },
      { title: "Work Product Ownership", paragraphs: 4 },
      { title: "Customer Cooperation Requirements", paragraphs: 3 },
      { title: "Performance Standards", paragraphs: 3 },
      { title: "Warranty on Professional Services", paragraphs: 3 },
    ],
  },
  {
    title: "PARTNER AND RESELLER TERMS",
    preamble: "This Section applies to authorized partners, resellers, distributors, system integrators, and managed service providers (collectively, \"Partners\") who have been granted the right to resell, distribute, or otherwise make available the Services to end customers. Partner relationships are governed by these Terms and the applicable Partner Agreement executed between Evil Incorporation and the Partner.",
    subsections: [
      { title: "Partner Authorization and Appointment", paragraphs: 4 },
      { title: "Territory and Market Restrictions", paragraphs: 3 },
      { title: "Partner Pricing and Margins", paragraphs: 4 },
      { title: "End Customer Obligations", paragraphs: 4 },
      { title: "Partner Compliance Requirements", paragraphs: 4 },
      { title: "Co-Marketing and Co-Selling", paragraphs: 3 },
      { title: "Partner Training and Certification", paragraphs: 3 },
      { title: "Deal Registration and Conflict Resolution", paragraphs: 3 },
      { title: "Partner Audit Rights", paragraphs: 3 },
      { title: "Partner Termination and Transition", paragraphs: 3 },
    ],
  },
];

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
  const data3 = pick(DATA_SUBJECTS, seed + 10);
  const timePeriod2 = pick(TIME_PERIODS, seed + 11);
  const condition2 = pick(CONDITIONS, seed + 12);
  const entity2 = pick(ENTITIES, seed + 13);
  const party2 = pick(PARTY, seed + 14);

  const templates = [
    `${party} ${obligation} ${entity} in connection with the ${subsectionTitle.toLowerCase()} provisions set forth herein. Without limiting the foregoing, ${entity} shall have the right to ${action} any and all ${data}, ${data2}, and ${data3} ${condition}, for a period of not less than ${timePeriod} from the date of collection or creation, whichever is later. ${party} further acknowledges that ${entity2} may retain derivative works, aggregated datasets, and anonymized extracts of such information for an additional period of ${timePeriod2} following the expiration or termination of this Agreement, subject to the confidentiality obligations set forth in Section ${Math.max(1, sectionNum - 2)} of these Terms. Any breach of the obligations set forth in this subsection shall entitle ${entity} to liquidated damages in an amount not less than ${monetary}, in addition to any other remedies available at law or in equity.`,

    `In furtherance of the ${subsectionTitle.toLowerCase()} objectives described in this Section ${sectionNum}, ${entity} reserves the right to ${action} all information and data generated through ${party}'s use of the Services, including without limitation ${data}, ${data2}, and related metadata, ${condition}. ${party} hereby grants to ${entity2} a non-exclusive, worldwide, perpetual, irrevocable, fully paid-up, royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, perform, and display such data in any and all media or distribution methods now known or later developed, for any purpose deemed appropriate by ${entity} ${condition2}. This license shall survive the termination or expiration of these Terms and shall be freely assignable and sublicensable by ${entity} without notice to or consent from ${party}. For the avoidance of doubt, the foregoing license grant encompasses the right to use ${party}'s ${data3} for training machine learning models, improving algorithmic systems, developing new products and services, and for any commercial purpose.`,

    `Subject to the limitations set forth in Section ${sectionNum + 1} and applicable law in ${jurisdiction}, ${entity} shall implement commercially reasonable technical and organizational measures to protect ${data} against unauthorized access, accidental loss, destruction, or alteration. Notwithstanding the foregoing, ${party} acknowledges that no method of electronic transmission or storage is completely secure, and ${entity2} makes no warranty or guarantee regarding the absolute security of any information transmitted to or stored by the Services. In the event of a security incident affecting ${party}'s ${data2} or ${data3}, ${entity} shall use commercially reasonable efforts to notify ${party} within ${timePeriod} of becoming aware of such incident, provided that such notification may be delayed to the extent required by law enforcement or to the extent that immediate notification would compromise the integrity of an ongoing investigation. ${entity}'s aggregate liability for any security incident shall not exceed ${monetary}, regardless of the number of incidents, the volume of data affected, or the nature of the damages suffered by ${party}.`,

    `${party} ${obligation} that the ${subsectionTitle.toLowerCase()} provisions of these Terms have been negotiated at arm's length between the parties and reflect a fair and reasonable allocation of risk. ${entity} shall have no obligation to ${party2} or to any third party with respect to ${data} except as expressly set forth in this Section ${sectionNum} and the applicable Service Schedule or Order Form. All obligations of ${entity2} under this subsection are contingent upon ${party}'s continued compliance with the payment terms set forth in Section 5, the acceptable use requirements set forth in Section 9, and all other applicable provisions of these Terms. In the event that ${party} fails to comply with any material obligation under these Terms, ${entity} may, ${condition}, suspend or terminate ${party}'s access to the Services and retain all ${data2} and ${data3} in its possession for a period of up to ${timePeriod2} following such suspension or termination.`,

    `For purposes of compliance with applicable data protection legislation in ${jurisdiction} and other jurisdictions in which ${entity} operates or processes data, the parties agree that ${entity2} acts as an independent data controller with respect to ${data} collected through ${party}'s use of the Services, except to the extent that a separate Data Processing Agreement expressly designates ${entity} as a data processor. As an independent data controller, ${entity} shall determine the purposes and means of processing ${data2} and ${data3} ${condition}, subject to applicable law. ${party} ${obligation} this independent controller designation and waives any right to object to ${entity}'s determination of processing purposes, provided that such processing is not manifestly incompatible with the purposes for which the data was originally collected. ${entity}'s rights under this subsection shall survive the termination or expiration of these Terms for a period of ${timePeriod}, after which ${entity} may, ${condition2}, either delete or further anonymize such data at its sole discretion.`,

    `The provisions of this subsection regarding ${subsectionTitle.toLowerCase()} shall be interpreted broadly to give maximum effect to the intentions of the parties as expressed herein. Where any ambiguity exists in the interpretation of this Section ${sectionNum}, such ambiguity shall be resolved in favor of ${entity} ${condition}. ${party} hereby waives the application of any rule of construction that would require ambiguous provisions to be construed against the drafting party. Furthermore, ${party2} agrees that any failure by ${entity2} to exercise or enforce any right or provision of these Terms shall not constitute a waiver of such right or provision, and that each right and remedy of ${entity} under these Terms is cumulative and in addition to every other right and remedy available to ${entity} at law or in equity. The aggregate value of ${party}'s liability under this subsection shall be limited to ${monetary}, except in cases of willful misconduct, fraud, or gross negligence, in which case no limitation shall apply.`,

    `In connection with the ${subsectionTitle.toLowerCase()} requirements described herein, ${party} agrees to provide ${entity} with all information, access, documentation, and cooperation reasonably requested by ${entity2} within ${timePeriod} of such request. Failure to comply with such requests may result in suspension of the Services, termination of these Terms, or both, ${condition}. ${entity} shall have the right to conduct periodic audits of ${party}'s compliance with this Section ${sectionNum}, either directly or through qualified third-party auditors, at ${entity}'s expense (except where the audit reveals material non-compliance, in which case ${party} shall reimburse ${entity} for all reasonable audit costs). Such audits may include review of ${party}'s ${data}, ${data2}, system configurations, access logs, and organizational policies, and shall be conducted during normal business hours with reasonable advance notice, except in cases of suspected fraud or material breach, in which case ${entity2} may conduct audits without prior notice.`,

    `${entity} may, from time to time and ${condition}, engage third-party service providers, subcontractors, and sub-processors (collectively, \"Subcontractors\") to perform certain functions related to the ${subsectionTitle.toLowerCase()} obligations described in this Section ${sectionNum}. ${party} hereby consents to such engagement, provided that ${entity2} shall remain responsible for the acts and omissions of its Subcontractors to the same extent as if such acts or omissions were performed directly by ${entity}. Notwithstanding the foregoing, ${entity}'s aggregate liability for Subcontractor acts and omissions shall not exceed ${monetary} in any twelve (12) month period. ${entity} maintains a current list of Subcontractors on its website, which ${party} agrees to review periodically. ${entity} shall provide ${party2} with ${timePeriod2} notice before engaging any new Subcontractor that will process ${data3}, during which time ${party} may object to such engagement by providing written notice to ${entity}. If ${party}'s objection is not resolved to ${party}'s reasonable satisfaction, ${party}'s sole remedy shall be termination of the affected Services.`,
  ];

  return pick(templates, seed + paraNum * 7);
}

// ── main generator ───────────────────────────────────────────────────

export function generateTos(): string {
  const lines: string[] = [];

  lines.push("EVIL INCORPORATION");
  lines.push("TERMS OF SERVICE AND MASTER SUBSCRIPTION AGREEMENT");
  lines.push("");
  lines.push(`Effective Date: January 1, 2024`);
  lines.push(`Last Updated: April 15, 2026`);
  lines.push(`Version: 14.7.2`);
  lines.push(`Document Reference: EI-TOS-2024-Q1-REV47`);
  lines.push("");
  lines.push(
    "IMPORTANT: PLEASE READ THESE TERMS OF SERVICE CAREFULLY BEFORE USING ANY SERVICES PROVIDED BY EVIL INCORPORATION. BY ACCESSING OR USING THE SERVICES, YOU AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE TO ALL OF THESE TERMS, DO NOT ACCESS OR USE THE SERVICES. THESE TERMS CONTAIN A MANDATORY ARBITRATION PROVISION AND A CLASS ACTION WAIVER, WHICH AFFECT YOUR LEGAL RIGHTS. PLEASE REVIEW SECTIONS 13 AND 24 CAREFULLY.",
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
      lines.push(
        `${sectionNum}.${sub + 1} ${subsection.title}.`,
      );
      lines.push("");

      // Generate the paragraphs for this subsection
      for (let p = 0; p < subsection.paragraphs; p++) {
        const letter = String.fromCharCode(97 + p); // a, b, c, ...
        const para = generateParagraph(sectionNum, sub, p, subsection.title);
        lines.push(`(${letter}) ${para}`);
        lines.push("");
      }

      // Inject the critical sentence if this is the right spot
      if (
        section.inject &&
        sub === section.inject.subsectionIndex
      ) {
        lines.push(
          `(${String.fromCharCode(97 + subsection.paragraphs)}) ${section.inject.text}`,
        );
        lines.push("");
      }
    }

    lines.push("─".repeat(80));
    lines.push("");
  }

  // Appendices for extra length
  const appendices = [
    "SCHEDULE A: LIST OF SUB-PROCESSORS AND THIRD-PARTY SERVICE PROVIDERS",
    "SCHEDULE B: STANDARD CONTRACTUAL CLAUSES FOR INTERNATIONAL DATA TRANSFERS",
    "SCHEDULE C: TECHNICAL AND ORGANIZATIONAL SECURITY MEASURES",
    "SCHEDULE D: SERVICE LEVEL AGREEMENT METRICS AND CALCULATIONS",
    "SCHEDULE E: DATA PROCESSING AGREEMENT STANDARD TERMS",
    "SCHEDULE F: ACCEPTABLE USE POLICY DETAILED SPECIFICATIONS",
    "SCHEDULE G: PRICING AND FEE SCHEDULES",
    "SCHEDULE H: COMPLIANCE CERTIFICATIONS AND ATTESTATIONS",
  ];

  for (let a = 0; a < appendices.length; a++) {
    lines.push(appendices[a]);
    lines.push("");
    // Generate substantial content for each schedule
    for (let item = 1; item <= 12; item++) {
      lines.push(`${roman(a + 1)}.${item} ${pick(CONDITIONS, a * 12 + item).charAt(0).toUpperCase() + pick(CONDITIONS, a * 12 + item).slice(1)}, ${pick(ENTITIES, a * 12 + item)} shall ${pick(ACTIONS, a * 12 + item)} all ${pick(DATA_SUBJECTS, a * 12 + item)} and ${pick(DATA_SUBJECTS, a * 12 + item + 1)} for a period of ${pick(TIME_PERIODS, a * 12 + item)} following the effective date of this Schedule. ${pick(PARTY, a * 12 + item)} ${pick(OBLIGATIONS, a * 12 + item)} that this Schedule constitutes an integral part of the Terms and that any breach of the obligations set forth herein shall entitle ${pick(ENTITIES, a * 12 + item + 1)} to liquidated damages in an amount not less than ${pick(MONETARY, a * 12 + item)}, in addition to any other remedies available at law or in equity under the laws of ${pick(JURISDICTIONS, a * 12 + item)}. The provisions of this Schedule shall survive the termination or expiration of the Terms for a period of ${pick(TIME_PERIODS, a * 12 + item + 2)} and shall be binding upon the successors and assigns of both parties. For the avoidance of doubt, the obligations set forth in this item ${roman(a + 1)}.${item} are cumulative and in addition to, and not in lieu of, any other obligations of ${pick(PARTY, a * 12 + item + 1)} under the Terms, including without limitation the obligations set forth in Sections ${Math.min(sectionNum(a, item), 30)}, ${Math.min(sectionNum(a, item) + 3, 30)}, and ${Math.min(sectionNum(a, item) + 7, 30)} of the Terms.`);
      lines.push("");
    }
    lines.push("─".repeat(80));
    lines.push("");
  }

  lines.push("END OF TERMS OF SERVICE");
  lines.push("");
  lines.push(`© 2024-2026 Evil Incorporation. All rights reserved.`);
  lines.push("Evil Incorporation is a registered trademark of Evil Incorporation Holdings, LLC.");
  lines.push("Document ID: EI-LEGAL-TOS-2024-0417-FINAL");

  return lines.join("\n");
}

function sectionNum(a: number, item: number): number {
  return ((a * 3 + item) % 28) + 1;
}

/** Count words in the generated ToS (for verification) */
export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}
