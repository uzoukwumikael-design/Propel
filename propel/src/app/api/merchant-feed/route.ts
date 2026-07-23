import { NextResponse } from "next/server";

const BASE = "https://propelhq.com";
const UPDATED = new Date().toISOString().split("T")[0];

const PRODUCTS = [
  {
    id: "propel-starter-free",
    title: "Propel Starter — Free Marketing Plan for Founders",
    description: "Free forever plan. Includes 10 AI copy generations per month, full 100-point launch checklist, ICP Builder, and 1 basic press kit. No credit card required.",
    link: `${BASE}/auth?mode=signup&plan=starter`,
    price: "0.00 USD",
    condition: "new",
    availability: "in stock",
    category: "5040",  // Software > Business Software
    brand: "Propel",
    mpn: "PROPEL-STARTER-001",
    gtin: "",
    image_link: `${BASE}/og-image.svg`,
  },
  {
    id: "propel-builder-monthly",
    title: "Propel Builder — AI Marketing Platform for Founders ($29/mo)",
    description: "Unlimited AI copy generations, all 9 marketing tools including AI SEO Analyzer, Press Kit Builder, ICP Builder, Brand Voice, Content Calendar, and Analytics Hub. 14-day free trial.",
    link: `${BASE}/auth?mode=signup&plan=builder`,
    price: "29.00 USD",
    condition: "new",
    availability: "in stock",
    category: "5040",
    brand: "Propel",
    mpn: "PROPEL-BUILDER-MONTHLY-001",
    gtin: "",
    image_link: `${BASE}/og-image.svg`,
  },
  {
    id: "propel-builder-annual",
    title: "Propel Builder Annual — AI Marketing Platform (Save 20%)",
    description: "Everything in Builder, billed annually at $23/mo (save 20%). Unlimited AI, all 9 tools, 5 projects. Best value for active founders.",
    link: `${BASE}/auth?mode=signup&plan=builder-annual`,
    price: "276.00 USD",
    condition: "new",
    availability: "in stock",
    category: "5040",
    brand: "Propel",
    mpn: "PROPEL-BUILDER-ANNUAL-001",
    gtin: "",
    image_link: `${BASE}/og-image.svg`,
  },
  {
    id: "propel-scale-monthly",
    title: "Propel Scale — Team Marketing Platform for Startups ($89/mo)",
    description: "Everything in Builder plus 5 team seats, competitor intel, API access, white-label reports, and a dedicated success manager. Built for marketing teams going all-in.",
    link: `${BASE}/auth?mode=signup&plan=scale`,
    price: "89.00 USD",
    condition: "new",
    availability: "in stock",
    category: "5040",
    brand: "Propel",
    mpn: "PROPEL-SCALE-MONTHLY-001",
    gtin: "",
    image_link: `${BASE}/og-image.svg`,
  },
];

export async function GET() {
  const items = PRODUCTS.map(p => `
    <item>
      <g:id>${p.id}</g:id>
      <g:title><![CDATA[${p.title}]]></g:title>
      <g:description><![CDATA[${p.description}]]></g:description>
      <g:link>${p.link}</g:link>
      <g:image_link>${p.image_link}</g:image_link>
      <g:condition>${p.condition}</g:condition>
      <g:availability>${p.availability}</g:availability>
      <g:price>${p.price}</g:price>
      <g:brand>${p.brand}</g:brand>
      <g:mpn>${p.mpn}</g:mpn>
      <g:google_product_category>${p.category}</g:google_product_category>
      <g:product_type>Software &gt; Marketing Software &gt; Startup Marketing</g:product_type>
      <g:custom_label_0>SaaS</g:custom_label_0>
      <g:custom_label_1>Founders</g:custom_label_1>
      <g:custom_label_2>AI Tools</g:custom_label_2>
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Digital Delivery</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
    </item>`).join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Propel — AI Marketing Tools for Founders</title>
    <link>${BASE}</link>
    <description>AI-powered marketing platform for founders. Generate copy, build press kits, analyze SEO, and track analytics.</description>
    <lastBuildDate>${UPDATED}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "X-Robots-Tag": "noindex",
    },
  });
}
