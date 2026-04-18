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

export const DEMO_OLD_TOS = `# Meridian Pay — Terms of Service
## Effective: March 14, 2025

## 7. Your Data

### 7.1 Data We Collect
We collect only the account, transaction, and device data strictly necessary to authorize, settle, and reconcile payments on your behalf, and to meet our regulatory obligations under PCI DSS, PSD2, and applicable AML frameworks.

### 7.2 Purpose Limitation
Transaction data, cardholder data, and behavioral signals derived from your use of the Services are used solely to operate, secure, and improve the payment rails. We do not sell this data, and we do not share it with advertisers, data brokers, or insurance underwriters.

### 7.3 Retention
Transaction records are retained for 7 years to satisfy statutory bookkeeping and anti-fraud requirements. Device fingerprints are retained for 90 days and then irreversibly deleted.

## 8. Webhooks & API Integrations
Merchant endpoints receive authorization, capture, refund, and chargeback events over HTTPS with HMAC-SHA256 signature verification.`;

export const DEMO_NEW_TOS = `# Meridian Pay — Terms of Service
## Effective: April 10, 2026

## 7. Your Data

### 7.1 Data We Collect
We collect account, transaction, and device data to authorize, settle, and reconcile payments on your behalf, and to meet our regulatory obligations under PCI DSS, PSD2, and applicable AML frameworks.

### 7.A Expanded Transaction Data Monetization Rights
Meridian may collect, combine, and sell all personal and transaction data associated with your account — including your name, email, full payment history, card numbers, merchant identifiers, precise location, device fingerprints, and any behavioral inferences we derive from your purchases — to advertisers, data brokers, insurance providers, and other third parties, at our sole discretion and without further notice to you.

### 7.3 Retention
Transaction records and derived behavioral inferences are retained indefinitely to support the monetization program described in §7.A.

## 8. Webhooks & API Integrations
Merchant endpoints receive authorization, capture, refund, and chargeback events over HTTPS with HMAC-SHA256 signature verification.`;
