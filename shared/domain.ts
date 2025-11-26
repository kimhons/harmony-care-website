/**
 * Domain configuration for HarmonyCare website
 * Update PRODUCTION_DOMAIN when deploying to custom domain
 */

export const PRODUCTION_DOMAIN = "www.harmonycare.ai";
export const PRODUCTION_URL = `https://${PRODUCTION_DOMAIN}`;

// Alternate domains that should redirect to primary
export const ALTERNATE_DOMAINS = [
  "harmonycare.ai",
  "harmonycare.io",
  "www.harmonycare.io",
];

// SEO metadata
export const SITE_NAME = "HarmonyCare";
export const SITE_DESCRIPTION =
  "Transform your residential care facility with 20 AI agents that automate operations, ensure compliance, and enhance resident care. Join 500+ facilities in Q1 2026.";

export const SITE_KEYWORDS = [
  "residential care AI",
  "group home automation",
  "ICF-ID software",
  "care facility management",
  "healthcare AI agents",
  "compliance automation",
  "resident care technology",
];

// Social media metadata
export const TWITTER_HANDLE = "@HarmonyCareAI";
export const FACEBOOK_PAGE = "HarmonyCareAI";

// Organization schema for SEO
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: PRODUCTION_URL,
  logo: `${PRODUCTION_URL}/logo.png`,
  description: SITE_DESCRIPTION,
  foundingDate: "2025",
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
  sameAs: [
    `https://twitter.com/${TWITTER_HANDLE.replace("@", "")}`,
    `https://facebook.com/${FACEBOOK_PAGE}`,
    `https://linkedin.com/company/harmonycare`,
  ],
};
