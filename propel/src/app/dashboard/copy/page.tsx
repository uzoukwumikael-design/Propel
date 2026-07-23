"use client";

import { useState } from "react";

const COPY_TYPES = ["Tagline", "Hero headline", "Email subject line", "Twitter thread hook", "LinkedIn post", "Product description", "Cold email opener", "Ad headline"];
const TONES = ["Bold & direct", "Professional", "Casual & friendly", "Witty", "Urgent & FOMO"];

interface CopyResult {
  copy: string;
  subtext: string;
  score: number;
}

export default function CopyPage() {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [type, setType] = useState("Tagline");
  const [tone, setTone] = useState("Bold & direct");
  const [results, setResults] = useState<CopyResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generate = async () => {
    if (!product.trim() || loading) return;
    setLoading(true);
    setResults([]);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "copy", payload: { product, audience, copyType: type, tone } }),
    });

    const data = await res.json();
    setResults(data.results ?? []);
    setLoading(false);
  };

  const copyText = (text: string, i: number) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const inp = "w-full px-3.5 py-3 bg-[#0D0D0D] border border-[#1C1C1C] rounded-lg text-[#E8E8E8] text-sm outline-none focus:border-[#2A2A2A] transition-colors";

  return (
    <div>
      <div className="mb-7">
        <h1 className="font-display font-bold text-[20px] tracking-tight mb-1.5">AI Copy Engine</h1>
        <p className="text-sm text-[#505050]">Generate high-converting copy for any channel in seconds.</p>
      </div>

      <div className="grid grid-cols-2 gap-7">
        {/* ── FORM ── */}
        <div>
          <div className="mb-4">
            <label className="text-[11.5px] text-[#505050] font-semibold tracking-wide block mb-2">YOUR PRODUCT *</label>
            <textarea value={product} onChange={e => setProduct(e.target.value)}
              placeholder="Describe what your product does and who it's for..."
              className={inp + " resize-y min-h-[100px] leading-relaxed"} rows={4} />
          </div>

          <div className="mb-4">
            <label className="text-[11.5px] text-[#505050] font-semibold tracking-wide block mb-2">TARGET AUDIENCE</label>
            <input value={audience} onChange={e => setAudience(e.target.value)}
              placeholder="e.g. B2B SaaS founders, enterprise CTOs..." className={inp} />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <label className="text-[11.5px] text-[#505050] font-semibold tracking-wide block mb-2">COPY TYPE</label>
              <select value={type} onChange={e => setType(e.target.value)} className={inp + " cursor-pointer"}>
                {COPY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[11.5px] text-[#505050] font-semibold tracking-wide block mb-2">TONE</label>
              <select value={tone} onChange={e => setTone(e.target.value)} className={inp + " cursor-pointer"}>
                {TONES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <button onClick={generate} disabled={!product.trim() || loading}
            className="w-full py-3.5 rounded-xl font-display font-bold text-sm border-0 transition-opacity cursor-pointer disabled:cursor-not-allowed"
            style={{ background: product.trim() ? "#B8FF2E" : "#141414", color: product.trim() ? "#060606" : "#444", opacity: loading ? 0.8 : 1 }}>
            {loading ? "Generating..." : "✦ Generate Copy"}
          </button>
        </div>

        {/* ── RESULTS ── */}
        <div>
          <div className="flex justify-between mb-3.5">
            <label className="text-[11.5px] text-[#505050] font-semibold tracking-wide">RESULTS</label>
            {results.length > 0 && <span className="text-[11px] text-[#333]">Click to copy</span>}
          </div>

          {loading ? (
            <div className="space-y-2.5">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl h-24 animate-pulse" />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="border border-dashed border-[#1C1C1C] rounded-xl h-72 flex flex-col items-center justify-center gap-2.5 text-[#2A2A2A]">
              <span className="text-3xl">◈</span>
              <span className="text-sm">Generated copy appears here</span>
            </div>
          ) : (
            <div className="space-y-2.5">
              {results.map((r, i) => (
                <div key={i} onClick={() => copyText(r.copy, i)}
                  className={`rounded-xl p-4 cursor-pointer transition-all hover:border-[#333] ${i === 0 ? "bg-[#B8FF2E]/[0.05] border border-[#B8FF2E]/20" : "bg-[#0D0D0D] border border-[#1C1C1C]"}`}>
                  <div className="flex items-start justify-between gap-2.5">
                    <span className={`text-[14px] leading-relaxed ${i === 0 ? "text-[#E8E8E8] font-medium" : "text-[#505050]"}`}>{r.copy}</span>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${i === 0 ? "bg-[#B8FF2E] text-[#060606]" : "bg-[#141414] text-[#444]"}`}>
                        {r.score}
                      </span>
                      <span className="text-[10px] text-[#333]">{copiedIdx === i ? "✓ Copied!" : "Copy"}</span>
                    </div>
                  </div>
                  {r.subtext && <p className="text-[11.5px] text-[#404040] mt-2">{r.subtext}</p>}
                </div>
              ))}
              <button onClick={generate} className="w-full py-2.5 border border-[#1C1C1C] rounded-lg text-[#505050] text-sm cursor-pointer bg-transparent hover:border-[#2A2A2A] transition-colors mt-1"
                style={{ fontFamily: "var(--font-sans)" }}>
                ↻ Regenerate
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
