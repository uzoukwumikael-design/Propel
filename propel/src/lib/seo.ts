export const SITE_NAME = "Propel";
export const SITE_URL = "https://propelhq.com";
export const SITE_TAGLINE = "AI Marketing Tools for Founders";
export const SITE_DESCRIPTION =
  "Stop guessing. Start launching. Propel gives founders every marketing tool they need — AI copy, launch checklists, press kits, content calendars, and analytics in one place.";

export const SEO_KEYWORDS = [
  "startup marketing tools",
  "AI copy generator for startups",
  "founder marketing platform",
  "launch checklist startup",
  "press kit builder",
  "AI marketing automation",
  "startup growth tools",
  "content calendar founders",
  "go-to-market tools SaaS",
  "AI copywriting tool",
  "marketing tools for entrepreneurs",
  "startup launch tools",
  "ICP builder",
  "SEO tool for startups",
  "competitor analysis tool",
];

export const OG_IMAGE = `${SITE_URL}/og-image.svg`;

export const defaultMeta = {
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  keywords: SEO_KEYWORDS.join(", "),
  ogImage: OG_IMAGE,
  twitterHandle: "@propelhq",
};

/** Generate page-level title */
export function pageTitle(title: string) {
  return `${title} | ${SITE_NAME}`;
}

/** Truncate a string to a given length with ellipsis */
export function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max - 3) + "..." : str;
}
