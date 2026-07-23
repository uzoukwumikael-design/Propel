const BASE_URL = "https://propelhq.com";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Propel",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.svg`,
    width: 200,
    height: 48,
  },
  description:
    "AI-powered marketing platform for founders. Generate copy, build press kits, plan content, and track analytics in one place.",
  foundingDate: "2025",
  sameAs: [
    "https://twitter.com/propelhq",
    "https://linkedin.com/company/propelhq",
    "https://github.com/propelhq",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@propelhq.com",
      availableLanguage: "English",
    },
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "Propel",
  description: "AI marketing tools for founders",
  publisher: { "@id": `${BASE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/search?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${BASE_URL}/#software`,
  name: "Propel",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "MarketingApplication",
  operatingSystem: "Web",
  url: BASE_URL,
  description:
    "Propel gives founders every marketing tool they need — AI copy, launch checklists, press kits, content calendars, and analytics in one place.",
  featureList: [
    "AI Copy Engine — generate taglines, headlines, and email sequences",
    "Launch Checklist — 100+ point battle-tested launch plan",
    "Press Kit Builder — auto-generate media kits",
    "Content Calendar — multi-channel scheduling",
    "ICP Builder — ideal customer profile generator",
    "SEO Analyzer — AI-powered SEO audit and recommendations",
    "Analytics Hub — all-channel performance tracking",
    "Email Drip Builder — automated email sequence creator",
    "Competitor Intel — real-time competitor monitoring",
  ],
  screenshot: `${BASE_URL}/og-image.svg`,
  softwareVersion: "1.0.0",
  releaseNotes: `${BASE_URL}/changelog`,
  author: { "@id": `${BASE_URL}/#organization` },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "147",
    bestRating: "5",
    worstRating: "1",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      description: "Free forever. Everything you need to validate and launch your idea.",
      price: "0",
      priceCurrency: "USD",
      url: `${BASE_URL}/auth?mode=signup`,
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Builder",
      description: "Unlimited AI generations + all 9 marketing tools for active founders.",
      price: "29",
      priceCurrency: "USD",
      billingIncrement: "P1M",
      url: `${BASE_URL}/auth?mode=signup&plan=builder`,
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Scale",
      description: "For marketing teams going all-in. 5 seats, API access, white-label.",
      price: "89",
      priceCurrency: "USD",
      billingIncrement: "P1M",
      url: `${BASE_URL}/auth?mode=signup&plan=scale`,
      availability: "https://schema.org/InStock",
    },
  ],
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is there really a free plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our Starter plan is free forever — no credit card required. You get 10 AI generations per month, the full launch checklist, the ICP Builder, and one basic press kit.",
      },
    },
    {
      "@type": "Question",
      name: "How does the AI copy engine work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Propel uses Claude AI (by Anthropic) to generate marketing copy trained specifically for startups. You describe your product, audience, and tone — we return scored copy variations instantly.",
      },
    },
    {
      "@type": "Question",
      name: "Can I cancel anytime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, cancel anytime. No questions asked. We also offer a 30-day money-back guarantee on all paid plans.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between Builder and Scale?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Builder ($29/mo) is for solo founders with unlimited AI and all 9 tools. Scale ($89/mo) adds 5 team seats, competitor intel, API access, white-label reports, and a dedicated success manager.",
      },
    },
    {
      "@type": "Question",
      name: "Do you support non-English founders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The AI copy engine can generate copy in any language. Just specify the language in your product description or tone field.",
      },
    },
    {
      "@type": "Question",
      name: "How is Propel different from ChatGPT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Propel is purpose-built for founder marketing. Unlike generic AI tools, every feature is designed for launch workflows: structured copy scoring, press kit templates, launch checklists, SEO analysis, and analytics — all in one place with founder-specific prompts.",
      },
    },
  ],
};

/** Product schema for Google Merchant Center (digital product listing) */
export const merchantProductSchema = (plan: "starter" | "builder" | "scale") => {
  const plans = {
    starter: { name: "Propel Starter", price: "0", desc: "Free forever founder marketing plan. AI copy, launch checklist, ICP builder." },
    builder: { name: "Propel Builder", price: "29", desc: "Unlimited AI generations + all 9 marketing tools for $29/month." },
    scale: { name: "Propel Scale", price: "89", desc: "Team marketing platform with 5 seats, API access, and competitor intel for $89/month." },
  };
  const p = plans[plan];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.desc,
    brand: { "@type": "Brand", name: "Propel" },
    url: `${BASE_URL}/#pricing`,
    image: `${BASE_URL}/og-image.svg`,
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/auth?mode=signup&plan=${plan}`,
      seller: { "@type": "Organization", name: "Propel" },
    },
  };
};

/** Breadcrumb schema for inner pages */
export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${BASE_URL}${item.url}`,
  })),
});

/** Combined homepage schema graph */
export const homepageSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    websiteSchema,
    softwareApplicationSchema,
    faqSchema,
  ],
};
