export interface TosAlert {
  id: string;
  provider: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  summary: string;
  changes: string[];
  actionRequired: boolean;
  detectedAt: string;
  sourceUrl: string;
}

export interface Organization {
  id: string;
  name: string;
  repos: string[];
  installedAt: string;
  alertCount: number;
}

export const mockAlerts: TosAlert[] = [
  {
    id: "1",
    provider: "OpenAI",
    severity: "CRITICAL",
    summary:
      "OpenAI updated data usage terms to allow training on API inputs unless explicitly opted out via new endpoint. Previous opt-out via email is deprecated.",
    changes: [
      "Section 3.2: API inputs may now be used for model training by default",
      "Section 3.4: Email-based opt-out deprecated, replaced with /v1/organization/data-controls endpoint",
      "Section 7.1: Data retention extended from 30 to 90 days for abuse monitoring",
    ],
    actionRequired: true,
    detectedAt: "2 hours ago",
    sourceUrl: "https://openai.com/policies/terms-of-use",
  },
  {
    id: "2",
    provider: "Stripe",
    severity: "HIGH",
    summary:
      "Stripe updated fee structure for cross-border transactions in EEA. New surcharge of 0.5% applies to all EUR transactions processed through non-EU entities.",
    changes: [
      "Section 4.1: Cross-border EEA surcharge increased from 0% to 0.5%",
      "Section 4.3: Currency conversion markup changed from 1% to 1.5%",
      "Section 12: Dispute liability shifted to merchant for transactions over 10,000 EUR",
    ],
    actionRequired: true,
    detectedAt: "6 hours ago",
    sourceUrl: "https://stripe.com/legal/ssa",
  },
  {
    id: "3",
    provider: "AWS",
    severity: "MEDIUM",
    summary:
      "AWS updated acceptable use policy to restrict certain AI workloads on shared tenancy instances. Dedicated hosts now required for models exceeding 70B parameters.",
    changes: [
      "Section 2.1: AI model training on shared instances limited to models under 70B parameters",
      "Section 2.3: New logging requirement for GPU-accelerated workloads",
    ],
    actionRequired: false,
    detectedAt: "1 day ago",
    sourceUrl: "https://aws.amazon.com/service-terms/",
  },
  {
    id: "4",
    provider: "Twilio",
    severity: "LOW",
    summary:
      "Twilio updated privacy addendum with minor clarifications to GDPR sub-processor list. No functional changes to data processing terms.",
    changes: [
      "Appendix B: Added 2 new sub-processors (both EU-based)",
      "Section 8.2: Clarified data residency options for EU customers",
    ],
    actionRequired: false,
    detectedAt: "3 days ago",
    sourceUrl: "https://www.twilio.com/legal/tos",
  },
];

export const mockOrganizations: Organization[] = [
  {
    id: "1",
    name: "Acme Corp",
    repos: ["acme/api-gateway", "acme/payments-service", "acme/ml-pipeline"],
    installedAt: "2 days ago",
    alertCount: 3,
  },
  {
    id: "2",
    name: "Nordic Fintech AB",
    repos: ["nordic/core-banking", "nordic/compliance-engine"],
    installedAt: "5 days ago",
    alertCount: 1,
  },
  {
    id: "3",
    name: "DataLab Research",
    repos: ["datalab/llm-trainer", "datalab/inference-api", "datalab/dashboard"],
    installedAt: "1 week ago",
    alertCount: 4,
  },
];

export const DEMO_OLD_TOS = `# OpenAI Terms of Use
## Effective: March 14, 2025

### 3. Content
#### 3.2 Use of Content
We do not use Content that you provide to or receive from our API ("API Content") to develop or improve our Services. We may use Content from Services other than our API to help develop and improve our Services.

#### 3.4 Opting Out
You may opt out of having your non-API content used for training by emailing support@openai.com with your organization ID.

### 7. Data
#### 7.1 Data Retention
API Content may be retained for up to 30 days for abuse and misuse monitoring, after which it will be deleted unless required by law.`;

export const DEMO_NEW_TOS = `# OpenAI Terms of Use
## Effective: April 10, 2026

### 3. Content
#### 3.2 Use of Content
We may use Content provided to our API ("API Content") to develop and improve our Services, unless you have opted out through the data controls available in your organization settings. Non-API Content may be used to develop and improve our Services.

#### 3.4 Managing Your Data
You may manage your data preferences, including opting out of training, through the /v1/organization/data-controls API endpoint. Previous opt-out methods (including email-based requests) will be honored through June 30, 2026, after which they will no longer be supported.

### 7. Data
#### 7.1 Data Retention
API Content may be retained for up to 90 days for trust and safety purposes, including abuse monitoring, misuse detection, and model safety evaluation. Content may be retained longer if flagged by our automated safety systems.`;
