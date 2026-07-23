"use client";

import { useState } from "react";

interface SEOResult {
  overall_score: number;
  title: { score: number; current: string; length: number; issue: string; recommendation: string };
  description: { score: number; current: string; length: number; issue: string; recommendation: string };
  headings: { score: number; h1_count: number; issues: string[] };
  keywords: { primary: string; density: string; score: number; recommendation: string };
  content: { word_count: number; readability: string; score: number };
  structured_data: { score: number; found: string[]; missing: string[] };
  improvements: string[];
  schema_suggestion: string;
}

const SCHEMA_TYPES = [
  "Organization", "SoftwareApplication", "Product", "LocalBusiness",
  "Article", "FAQPage", "HowTo", "WebSite", "BreadcrumbList",
];

export default function SEOPage() {
  const [tab, setTab] = useState<"analyzer" | "generator" | "schema">("analyzer");

  // Analyzer state
  const [content, setContent] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [result, setResult] = useState<SEOResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Generator state
  const [genForm, setGenForm] = useState({ topic: "", keywords: "", audience: "", type: "landing page" });
  const [genResult, setGenResult] = useState<{ title: string; description: string; h1: string; h2s: string[] } | null>(null);
  const [genLoading, setGenLoading] = useState(false);

  // Schema builder state
  const [schemaType, setSchemaType] = useState("Organization");
  const [schemaInput, setSchemaInput] = useState("");
  const [schemaOutput, setSchemaOutput] = useState("");
  const [schemaLoading, setSchemaLoading] = useState(false);
  const [schemaCopied, setSchemaCopied] = useState(false);

  const runAnalysis = async () => {
    if (!content.trim() || loading) return;
    setLoading(true); setResult(null);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "seo-analyze", payload: { content, targetKeyword } }),
    });
    const data = await res.json();
    setResult(data.result ?? null);
    setLoading(false);
  };

  const runGenerator = async () => {
    if (!genForm.topic || genLoading) return;
    setGenLoading(true); setGenResult(null);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "seo-generate", payload: genForm }),
    });
    const data = await res.json();
    setGenResult(data.result ?? null);
    setGenLoading(false);
  };

  const buildSchema = async () => {
    if (!schemaInput || schemaLoading) return;
    setSchemaLoading(true); setSchemaOutput("");
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "seo-schema", payload: { schemaType, info: schemaInput } }),
    });
    const data = await res.json();
    setSchemaOutput(data.result ?? "");
    setSchemaLoading(false);
  };

  const copySchema = () => {
    navigator.clipboard.writeText(schemaOutput).catch(() => {});
    setSchemaCopied(true);
    setTimeout(() => setSchemaCopied(false), 2000);
  };

  const scoreColor = (s: number) =>
    s >= 80 ? "#B8FF2E" : s >= 60 ? "#FF9F44" : "#FF6B35";

  const inp = "w-full px-3.5 py-3 bg-[#0D0D0D] border border-[#1C1C1C] rounded-lg text-[#E8E8E8] text-sm outline-none focus:border-[#2A2A2A] transition-colors";

  return (
    <div>
      <div className="mb-7">
        <h1 className="font-display font-bold text-[20px] tracking-tight mb-1.5">AI SEO Analyzer</h1>
        <p className="text-sm text-[#505050]">Audit your content, generate optimized tags, and build structured data.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#080808] border border-[#1C1C1C] rounded-lg p-1 mb-7 w-fit">
        {(["analyzer", "generator", "schema"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="px-4 py-2 rounded-md text-sm font-medium cursor-pointer border-0 capitalize transition-all"
            style={{ background: tab === t ? "#B8FF2E" : "transparent", color: tab === t ? "#060606" : "#505050", fontFamily: "var(--font-sans)" }}>
            {t === "analyzer" ? "Page Analyzer" : t === "generator" ? "Meta Generator" : "Schema Builder"}
          </button>
        ))}
      </div>

      {/* ── TAB: ANALYZER ─────────────────── */}
      {tab === "analyzer" && (
        <div className="grid grid-cols-2 gap-7">
          <div>
            <div className="mb-4">
              <label className="text-[11.5px] text-[#505050] font-semibold tracking-wide block mb-2">PASTE YOUR PAGE CONTENT OR HTML</label>
              <textarea value={content} onChange={e => setContent(e.target.value)}
                placeholder="Paste your page title, meta description, headings, and body content here..."
                className={inp + " resize-y min-h-[180px] leading-relaxed"} rows={8} />
            </div>
            <div className="mb-5">
              <label className="text-[11.5px] text-[#505050] font-semibold tracking-wide block mb-2">TARGET KEYWORD (optional)</label>
              <input value={targetKeyword} onChange={e => setTargetKeyword(e.target.value)}
                placeholder="e.g. startup marketing tools" className={inp} />
            </div>
            <button onClick={runAnalysis} disabled={!content.trim() || loading}
              className="w-full py-3.5 rounded-xl font-display font-bold text-sm border-0 transition-opacity cursor-pointer disabled:cursor-not-allowed"
              style={{ background: content.trim() ? "#B8FF2E" : "#141414", color: content.trim() ? "#060606" : "#444", opacity: loading ? 0.8 : 1 }}>
              {loading ? "Analyzing..." : "↗ Run SEO Audit"}
            </button>
          </div>

          <div>
            {loading && (
              <div className="space-y-3">
                {[1,2,3,4,5].map(i => <div key={i} className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl h-16 animate-pulse" />)}
              </div>
            )}
            {!loading && !result && (
              <div className="border border-dashed border-[#1C1C1C] rounded-xl h-full flex flex-col items-center justify-center gap-2.5 text-[#2A2A2A]">
                <span className="text-3xl">↗</span>
                <span className="text-sm">SEO audit appears here</span>
              </div>
            )}
            {result && (
              <div className="space-y-3">
                {/* Overall score */}
                <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#505050] font-semibold tracking-wide mb-1">OVERALL SEO SCORE</p>
                    <p className="text-xs text-[#333]">{result.improvements?.length ?? 0} improvements found</p>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-black text-[36px]" style={{ color: scoreColor(result.overall_score) }}>
                      {result.overall_score}
                    </span>
                    <span className="text-muted text-sm">/100</span>
                  </div>
                </div>

                {/* Score bars */}
                {[
                  { label: "Title Tag", score: result.title?.score, tip: result.title?.issue },
                  { label: "Meta Description", score: result.description?.score, tip: result.description?.issue },
                  { label: "Headings", score: result.headings?.score, tip: result.headings?.issues?.[0] ?? "OK" },
                  { label: "Keywords", score: result.keywords?.score, tip: result.keywords?.recommendation },
                  { label: "Structured Data", score: result.structured_data?.score, tip: result.structured_data?.missing?.[0] ? `Missing: ${result.structured_data.missing[0]}` : "OK" },
                ].map((item, i) => (
                  <div key={i} className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-lg px-4 py-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-[#AAA] font-medium">{item.label}</span>
                      <span className="text-xs font-bold" style={{ color: scoreColor(item.score ?? 0) }}>{item.score ?? "—"}</span>
                    </div>
                    <div className="bg-[#141414] rounded-full h-1.5 mb-2 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${item.score ?? 0}%`, background: scoreColor(item.score ?? 0) }} />
                    </div>
                    <p className="text-[10.5px] text-[#505050]">{item.tip}</p>
                  </div>
                ))}

                {/* Improvements */}
                {result.improvements?.length > 0 && (
                  <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-4">
                    <p className="text-[10.5px] text-[#505050] font-semibold tracking-wide mb-3">TOP IMPROVEMENTS</p>
                    <ul className="space-y-2">
                      {result.improvements.map((imp, i) => (
                        <li key={i} className="flex gap-2.5 text-xs text-[#AAA]">
                          <span className="text-[#FF6B35] flex-shrink-0">→</span>{imp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {result.title?.recommendation && (
                  <div className="bg-[#B8FF2E]/[0.04] border border-[#B8FF2E]/15 rounded-xl p-4">
                    <p className="text-[10.5px] text-[#B8FF2E] font-semibold mb-2">✦ RECOMMENDED TITLE</p>
                    <p className="text-sm text-[#CCC]">{result.title.recommendation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB: GENERATOR ────────────────── */}
      {tab === "generator" && (
        <div className="grid grid-cols-2 gap-7">
          <div className="space-y-4">
            {[
              { key: "topic", label: "PAGE TOPIC / PRODUCT *", placeholder: "e.g. AI marketing tools for founders" },
              { key: "keywords", label: "TARGET KEYWORDS (comma-separated)", placeholder: "e.g. startup marketing, AI copywriting, founder tools" },
              { key: "audience", label: "TARGET AUDIENCE", placeholder: "e.g. B2B SaaS founders, startup CTOs" },
            ].map(field => (
              <div key={field.key}>
                <label className="text-[11.5px] text-[#505050] font-semibold tracking-wide block mb-2">{field.label}</label>
                <input value={(genForm as any)[field.key]} onChange={e => setGenForm(p => ({ ...p, [field.key]: e.target.value }))}
                  placeholder={field.placeholder} className={inp} />
              </div>
            ))}
            <div>
              <label className="text-[11.5px] text-[#505050] font-semibold tracking-wide block mb-2">PAGE TYPE</label>
              <select value={genForm.type} onChange={e => setGenForm(p => ({ ...p, type: e.target.value }))} className={inp + " cursor-pointer"}>
                {["landing page","blog post","product page","about page","pricing page","case study"].map(t => (
                  <option key={t} value={t} style={{ background: "#0D0D0D" }}>{t}</option>
                ))}
              </select>
            </div>
            <button onClick={runGenerator} disabled={!genForm.topic || genLoading}
              className="w-full py-3.5 rounded-xl font-display font-bold text-sm border-0 cursor-pointer disabled:cursor-not-allowed"
              style={{ background: genForm.topic ? "#B8FF2E" : "#141414", color: genForm.topic ? "#060606" : "#444", opacity: genLoading ? 0.8 : 1 }}>
              {genLoading ? "Generating..." : "✦ Generate Meta Tags"}
            </button>
          </div>

          <div>
            {genLoading && <div className="space-y-3">{[1,2,3,4].map(i => <div key={i} className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl h-20 animate-pulse" />)}</div>}
            {!genLoading && !genResult && (
              <div className="border border-dashed border-[#1C1C1C] rounded-xl h-72 flex flex-col items-center justify-center gap-2.5 text-[#2A2A2A]">
                <span className="text-3xl">◈</span>
                <span className="text-sm">Optimized meta tags appear here</span>
              </div>
            )}
            {genResult && (
              <div className="space-y-3">
                {[
                  { label: "TITLE TAG", content: genResult.title, char: genResult.title?.length, max: 60, color: (genResult.title?.length ?? 0) <= 60 ? "#B8FF2E" : "#FF6B35" },
                  { label: "META DESCRIPTION", content: genResult.description, char: genResult.description?.length, max: 160, color: (genResult.description?.length ?? 0) <= 160 ? "#B8FF2E" : "#FF6B35" },
                  { label: "H1 HEADING", content: genResult.h1, char: null, max: null, color: "#B8FF2E" },
                ].map((item, i) => (
                  <div key={i} className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[10.5px] text-[#505050] font-semibold tracking-wide">{item.label}</p>
                      {item.char !== null && (
                        <span className="text-[10px] font-semibold" style={{ color: item.color }}>{item.char}/{item.max} chars</span>
                      )}
                    </div>
                    <p className="text-sm text-[#CCC] leading-relaxed">{item.content}</p>
                  </div>
                ))}
                {genResult.h2s?.length > 0 && (
                  <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-4">
                    <p className="text-[10.5px] text-[#505050] font-semibold tracking-wide mb-3">SUGGESTED H2 SUBHEADINGS</p>
                    <ul className="space-y-2">
                      {genResult.h2s.map((h, i) => (
                        <li key={i} className="flex gap-2 text-sm text-[#AAA]">
                          <span className="text-[#505050] flex-shrink-0">H2</span>{h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB: SCHEMA BUILDER ────────────── */}
      {tab === "schema" && (
        <div className="grid grid-cols-2 gap-7">
          <div className="space-y-4">
            <div>
              <label className="text-[11.5px] text-[#505050] font-semibold tracking-wide block mb-2">SCHEMA TYPE</label>
              <select value={schemaType} onChange={e => setSchemaType(e.target.value)} className={inp + " cursor-pointer"}>
                {SCHEMA_TYPES.map(t => <option key={t} value={t} style={{ background: "#0D0D0D" }}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[11.5px] text-[#505050] font-semibold tracking-wide block mb-2">YOUR BUSINESS / PAGE INFO *</label>
              <textarea value={schemaInput} onChange={e => setSchemaInput(e.target.value)}
                placeholder={`Describe your ${schemaType.toLowerCase()} — name, description, URL, contact info, pricing, etc. The more detail, the better the schema.`}
                className={inp + " resize-y leading-relaxed"} rows={8} />
            </div>
            <button onClick={buildSchema} disabled={!schemaInput || schemaLoading}
              className="w-full py-3.5 rounded-xl font-display font-bold text-sm border-0 cursor-pointer disabled:cursor-not-allowed"
              style={{ background: schemaInput ? "#B8FF2E" : "#141414", color: schemaInput ? "#060606" : "#444" }}>
              {schemaLoading ? "Building schema..." : `◈ Generate ${schemaType} Schema`}
            </button>

            <div className="bg-[#B8FF2E]/[0.04] border border-[#B8FF2E]/15 rounded-xl p-4">
              <p className="text-xs text-[#B8FF2E] font-semibold mb-2">How to use</p>
              <p className="text-xs text-[#505050] leading-relaxed">Copy the generated JSON-LD and add it inside a <code className="bg-[#1C1C1C] px-1 py-0.5 rounded text-[#AAA]">&lt;script type="application/ld+json"&gt;</code> tag in your page's <code className="bg-[#1C1C1C] px-1 py-0.5 rounded text-[#AAA]">&lt;head&gt;</code>.</p>
            </div>
          </div>

          <div>
            {schemaLoading && <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl h-80 animate-pulse" />}
            {!schemaLoading && !schemaOutput && (
              <div className="border border-dashed border-[#1C1C1C] rounded-xl h-80 flex flex-col items-center justify-center gap-2.5 text-[#2A2A2A]">
                <span className="text-3xl">◈</span>
                <span className="text-sm">JSON-LD schema appears here</span>
              </div>
            )}
            {schemaOutput && (
              <div className="bg-[#080808] border border-[#1C1C1C] rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#1C1C1C]">
                  <p className="text-xs text-[#505050] font-semibold">{schemaType} Schema · JSON-LD</p>
                  <button onClick={copySchema} className="text-xs font-semibold px-3 py-1.5 rounded-lg border-0 cursor-pointer"
                    style={{ background: schemaCopied ? "#B8FF2E" : "#1C1C1C", color: schemaCopied ? "#060606" : "#505050", fontFamily: "var(--font-sans)" }}>
                    {schemaCopied ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="p-4 text-[11px] text-[#AAA] overflow-auto max-h-[500px] leading-relaxed whitespace-pre-wrap">
                  {schemaOutput}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
