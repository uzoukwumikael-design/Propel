import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

const parse = (text: string) => {
  try { return JSON.parse(text.replace(/```json|```/g, "").trim()); }
  catch { return null; }
};

export async function POST(request: Request) {
  try {
    const { type, payload } = await request.json();

    // ── AI COPY ────────────────────────────────────────────────────────────
    if (type === "copy") {
      const { product, audience, copyType, tone } = payload;
      const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-6", max_tokens: 1000,
        messages: [{ role: "user", content: `You are an elite startup copywriter. Generate 3 distinct "${copyType}" options.

Product: ${product}
Audience: ${audience || "founders and businesses"}
Tone: ${tone}

Return ONLY valid JSON: [{"copy":"...","subtext":"Why this angle works","score":8.5}]
Make each meaningfully different. Be specific, avoid clichés. Score 1–10.` }],
      });
      const text = msg.content[0].type === "text" ? msg.content[0].text : "";
      return NextResponse.json({ results: parse(text) ?? [] });
    }

    // ── PRESS KIT ──────────────────────────────────────────────────────────
    if (type === "presskit") {
      const { company, tagline, founded, founders, description } = payload;
      const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-6", max_tokens: 1500,
        messages: [{ role: "user", content: `You are a senior PR professional. Generate a complete press kit.

Company: ${company}
Tagline: ${tagline || "N/A"}
Founded: ${founded}
Founders: ${founders || "Not specified"}
Description: ${description}

Return ONLY valid JSON:
{"boilerplate":"2-3 sentence company description","elevator_pitch":"One sentence hook","key_facts":["fact1","fact2","fact3","fact4"],"founder_bios":[{"name":"...","title":"...","bio":"2 sentences"}],"media_angles":["angle1","angle2","angle3"],"press_contact":"press@${company.toLowerCase().replace(/\s+/g, "")}.com"}` }],
      });
      const text = msg.content[0].type === "text" ? msg.content[0].text : "";
      return NextResponse.json({ kit: parse(text) });
    }

    // ── ICP BUILDER ────────────────────────────────────────────────────────
    if (type === "icp") {
      const { product, problem, current_customers, price_point, geography } = payload;
      const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-6", max_tokens: 2000,
        messages: [{ role: "user", content: `You are a go-to-market strategist. Build a detailed ICP profile.

Product: ${product}
Problem solved: ${problem}
Current customers: ${current_customers || "none yet"}
Price point: ${price_point || "not specified"}
Geography: ${geography || "global"}

Return ONLY valid JSON:
{
  "primary_icp": {
    "persona_name": "Descriptive persona name (e.g. The Solo SaaS Founder)",
    "job_title": "Primary job title",
    "company_type": "Company size, stage, industry",
    "seniority": "Level of seniority",
    "demographics": {"age_range":"28-40","background":"...","experience":"..."},
    "pain_points": ["Pain 1","Pain 2","Pain 3","Pain 4"],
    "goals": ["Goal 1","Goal 2","Goal 3"],
    "objections": ["Objection 1","Objection 2","Objection 3"],
    "channels": ["LinkedIn","Product Hunt","..."],
    "trigger_events": ["Just raised seed round","Hired first marketer","..."],
    "messaging_angle": "The core message that resonates most with this person",
    "sample_outreach": "Hi [Name],\n\nI noticed you just [trigger]. Quick question — [pain point question]?\n\n[Value prop in 1 sentence]. Would a 15-min call this week make sense?\n\n[Name]"
  },
  "secondary_icps": [
    {"title":"Persona name","company_type":"...","why":"Why they also buy from you"},
    {"title":"Persona name","company_type":"...","why":"Why they also buy from you"}
  ],
  "positioning_statement": "For [target customer] who [problem], [product name] is a [category] that [key benefit]. Unlike [competitor], we [differentiator].",
  "value_proposition": "One clear sentence: we help [ICP] do [outcome] without [pain]."
}` }],
      });
      const text = msg.content[0].type === "text" ? msg.content[0].text : "";
      return NextResponse.json({ icp: parse(text) });
    }

    // ── BRAND VOICE ────────────────────────────────────────────────────────
    if (type === "brand-voice") {
      const { company, description, adjectives, competitors, example_copy, avoid } = payload;
      const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-6", max_tokens: 2000,
        messages: [{ role: "user", content: `You are a brand strategist at a top creative agency. Build a brand voice guide.

Company: ${company}
What they do: ${description}
Brand adjectives: ${adjectives || "not specified"}
Competitors / differentiation: ${competitors || "not specified"}
Example copy (their best): ${example_copy || "none provided"}
Tones/words to avoid: ${avoid || "not specified"}

Return ONLY valid JSON:
{
  "voice_name": "A memorable name for this brand voice (e.g. The Confident Challenger)",
  "summary": "2-3 sentences describing the brand voice",
  "personality_traits": ["Trait 1","Trait 2","Trait 3","Trait 4"],
  "tone_spectrum": {"formal_casual":35,"playful_serious":25,"bold_subtle":80},
  "dos": ["Do 1","Do 2","Do 3","Do 4","Do 5"],
  "donts": ["Don't 1","Don't 2","Don't 3","Don't 4","Don't 5"],
  "power_words": ["word1","word2","word3","word4","word5","word6","word7","word8"],
  "avoid_words": ["word1","word2","word3","word4","word5","word6"],
  "sample_rewrites": [
    {"original":"We leverage synergistic solutions to empower businesses.","rewritten":"We make marketing that actually works.","why":"Remove jargon, be direct and confident."}
  ],
  "tagline_examples": ["Tagline 1","Tagline 2","Tagline 3"]
}` }],
      });
      const text = msg.content[0].type === "text" ? msg.content[0].text : "";
      return NextResponse.json({ voice: parse(text) });
    }

    // ── BRAND VOICE REWRITE ────────────────────────────────────────────────
    if (type === "brand-voice-rewrite") {
      const { text: inputText, voice, traits, dos, donts } = payload;
      const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-6", max_tokens: 800,
        messages: [{ role: "user", content: `Rewrite the following copy in this brand voice.

Brand voice: ${voice}
Personality traits: ${traits?.join(", ")}
DOs: ${dos?.join("; ")}
DON'Ts: ${donts?.join("; ")}

Original copy:
${inputText}

Return ONLY the rewritten copy, nothing else. Keep roughly the same length.` }],
      });
      const text = msg.content[0].type === "text" ? msg.content[0].text : "";
      return NextResponse.json({ result: text.trim() });
    }

    // ── SEO ANALYZE ────────────────────────────────────────────────────────
    if (type === "seo-analyze") {
      const { content, targetKeyword } = payload;
      const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-6", max_tokens: 1500,
        messages: [{ role: "user", content: `You are an expert SEO analyst. Analyze this page content and return a detailed SEO audit.

Content to analyze:
${content}

Target keyword: ${targetKeyword || "not specified"}

Return ONLY valid JSON:
{
  "overall_score": 72,
  "title": {
    "score": 65,
    "current": "extracted title or 'not found'",
    "length": 42,
    "issue": "Brief description of the issue",
    "recommendation": "Improved title under 60 chars"
  },
  "description": {
    "score": 40,
    "current": "extracted description or 'not found'",
    "length": 80,
    "issue": "Brief issue description",
    "recommendation": "Improved meta description under 160 chars with CTA"
  },
  "headings": {
    "score": 80,
    "h1_count": 1,
    "issues": ["List of heading issues"]
  },
  "keywords": {
    "primary": "${targetKeyword || "auto-detected"}",
    "density": "0.4%",
    "score": 55,
    "recommendation": "How to improve keyword usage"
  },
  "content": {
    "word_count": 320,
    "readability": "Grade 9",
    "score": 75
  },
  "structured_data": {
    "score": 20,
    "found": ["List of schema types found"],
    "missing": ["Organization","SoftwareApplication","FAQPage"]
  },
  "improvements": [
    "Add target keyword to title tag",
    "Write a compelling meta description with CTA",
    "Add Organization JSON-LD schema",
    "Include more semantic keywords"
  ],
  "schema_suggestion": "Organization"
}` }],
      });
      const text = msg.content[0].type === "text" ? msg.content[0].text : "";
      return NextResponse.json({ result: parse(text) });
    }

    // ── SEO META GENERATOR ─────────────────────────────────────────────────
    if (type === "seo-generate") {
      const { topic, keywords, audience, type: pageType } = payload;
      const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-6", max_tokens: 1000,
        messages: [{ role: "user", content: `You are an expert SEO copywriter. Generate optimized meta tags.

Page topic: ${topic}
Target keywords: ${keywords || "derive from topic"}
Target audience: ${audience || "general"}
Page type: ${pageType}

Return ONLY valid JSON:
{
  "title": "Optimized title tag under 60 characters with primary keyword near the start",
  "description": "Compelling meta description under 155 characters — include keyword, benefit, and CTA",
  "h1": "Primary H1 heading — clear, keyword-rich, compelling",
  "h2s": ["H2 subheading 1","H2 subheading 2","H2 subheading 3","H2 subheading 4"]
}` }],
      });
      const text = msg.content[0].type === "text" ? msg.content[0].text : "";
      return NextResponse.json({ result: parse(text) });
    }

    // ── SEO SCHEMA BUILDER ─────────────────────────────────────────────────
    if (type === "seo-schema") {
      const { schemaType, info } = payload;
      const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-6", max_tokens: 1200,
        messages: [{ role: "user", content: `Generate a complete, valid ${schemaType} JSON-LD structured data block for Google.

Business/page info:
${info}

Return ONLY the raw JSON-LD object (no markdown fences, no explanation).
Make it production-ready with real values. Include all relevant properties for ${schemaType}.
Start with: {"@context": "https://schema.org", "@type": "${schemaType}", ...}` }],
      });
      const text = msg.content[0].type === "text" ? msg.content[0].text : "";
      const clean = text.replace(/```json|```/g, "").trim();
      // Pretty-print the JSON
      try { return NextResponse.json({ result: JSON.stringify(JSON.parse(clean), null, 2) }); }
      catch { return NextResponse.json({ result: clean }); }
    }

    return NextResponse.json({ error: "Unknown type" }, { status: 400 });
  } catch (err) {
    console.error("[/api/generate]", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
