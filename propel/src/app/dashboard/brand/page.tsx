"use client";

import { useState } from "react";

interface BrandVoice {
  voice_name: string;
  summary: string;
  personality_traits: string[];
  tone_spectrum: { formal_casual: number; playful_serious: number; bold_subtle: number };
  dos: string[];
  donts: string[];
  power_words: string[];
  avoid_words: string[];
  sample_rewrites: { original: string; rewritten: string; why: string }[];
  tagline_examples: string[];
}

export default function BrandPage() {
  const [step, setStep] = useState<"form" | "result">("form");
  const [form, setForm] = useState({
    company: "",
    description: "",
    adjectives: "",
    competitors: "",
    example_copy: "",
    avoid: "",
  });
  const [result, setResult] = useState<BrandVoice | null>(null);
  const [loading, setLoading] = useState(false);
  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState("");
  const [testLoading, setTestLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<"guide" | "test">("guide");

  const inp = "w-full px-3.5 py-3 bg-[#0D0D0D] border border-[#1C1C1C] rounded-lg text-[#E8E8E8] text-sm outline-none focus:border-[#2A2A2A] transition-colors";

  const generate = async () => {
    if (!form.company || !form.description || loading) return;
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "brand-voice", payload: form }),
    });
    const data = await res.json();
    setResult(data.voice ?? null);
    if (data.voice) setStep("result");
    setLoading(false);
  };

  const testVoice = async () => {
    if (!testInput || testLoading || !result) return;
    setTestLoading(true);
    setTestOutput("");
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "brand-voice-rewrite",
        payload: { text: testInput, voice: result.summary, traits: result.personality_traits, dos: result.dos, donts: result.donts },
      }),
    });
    const data = await res.json();
    setTestOutput(data.result ?? "");
    setTestLoading(false);
  };

  const Meter = ({ label, value }: { label: string[]; value: number }) => (
    <div className="mb-4">
      <div className="flex justify-between text-xs text-[#505050] mb-2">
        <span>{label[0]}</span><span>{label[1]}</span>
      </div>
      <div className="relative bg-[#141414] rounded-full h-2">
        <div className="absolute left-0 top-0 h-full bg-[#B8FF2E] rounded-full" style={{ width: `${value}%` }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#B8FF2E] border-2 border-[#060606] rounded-full shadow"
          style={{ left: `calc(${value}% - 7px)` }} />
      </div>
    </div>
  );

  if (step === "form") return (
    <div>
      <div className="mb-7">
        <h1 className="font-display font-bold text-[20px] tracking-tight mb-1.5">Brand Voice Builder</h1>
        <p className="text-sm text-[#505050]">Define your brand's unique voice and get a complete style guide with AI.</p>
      </div>
      <div className="max-w-xl space-y-4">
        {[
          { key: "company", label: "COMPANY NAME *", placeholder: "Acme Inc.", type: "input" },
          { key: "description", label: "WHAT YOU DO & WHO FOR *", placeholder: "We help B2B founders automate their marketing with AI...", type: "textarea" },
          { key: "adjectives", label: "3–5 ADJECTIVES THAT DESCRIBE YOUR BRAND", placeholder: "Bold, direct, no-nonsense, empowering, clever", type: "input" },
          { key: "competitors", label: "COMPETITORS (and how you're different)", placeholder: "Unlike HubSpot (complex) and Mailchimp (basic), we're built specifically for founders...", type: "input" },
          { key: "example_copy", label: "EXAMPLE OF YOUR BEST COPY (optional)", placeholder: "Paste a headline, tweet, or landing page paragraph that really nails your voice...", type: "textarea" },
          { key: "avoid", label: "TONES / WORDS TO AVOID", placeholder: "Corporate jargon, passive voice, buzzwords like 'synergy', 'leverage'...", type: "input" },
        ].map(field => (
          <div key={field.key}>
            <label className="text-[11.5px] text-[#505050] font-semibold tracking-wide block mb-2">{field.label}</label>
            {field.type === "textarea"
              ? <textarea value={(form as any)[field.key]} onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))} placeholder={field.placeholder} rows={3} className={inp + " resize-none leading-relaxed"} />
              : <input value={(form as any)[field.key]} onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))} placeholder={field.placeholder} className={inp} />
            }
          </div>
        ))}
        <button onClick={generate} disabled={!form.company || !form.description || loading}
          className="w-full py-3.5 rounded-xl font-display font-bold text-sm border-0 cursor-pointer disabled:cursor-not-allowed"
          style={{ background: (form.company && form.description) ? "#B8FF2E" : "#141414", color: (form.company && form.description) ? "#060606" : "#444", opacity: loading ? 0.8 : 1 }}>
          {loading ? "Building your brand voice..." : "◈ Build Brand Voice Guide"}
        </button>
      </div>
    </div>
  );

  if (!result) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-[20px] tracking-tight mb-1">{result.voice_name}</h1>
          <p className="text-sm text-[#505050]">{form.company} · Brand Voice Guide</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setStep("form")} className="px-4 py-2 bg-transparent border border-[#1C1C1C] rounded-lg text-[#505050] text-sm cursor-pointer hover:border-[#2A2A2A]" style={{ fontFamily: "var(--font-sans)" }}>← Rebuild</button>
          <button className="px-4 py-2 bg-[#B8FF2E] border-0 rounded-lg text-[#060606] text-sm font-bold cursor-pointer hover:opacity-90" style={{ fontFamily: "var(--font-sans)" }}>↓ Export PDF</button>
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex gap-1 bg-[#080808] border border-[#1C1C1C] rounded-lg p-1 mb-6 w-fit">
        {(["guide", "test"] as const).map(t => (
          <button key={t} onClick={() => setActiveSection(t)}
            className="px-4 py-2 rounded-md text-sm font-medium cursor-pointer border-0 capitalize"
            style={{ background: activeSection === t ? "#B8FF2E" : "transparent", color: activeSection === t ? "#060606" : "#505050", fontFamily: "var(--font-sans)" }}>
            {t === "guide" ? "Voice Guide" : "Test Your Copy"}
          </button>
        ))}
      </div>

      {activeSection === "guide" && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
            <p className="text-[10.5px] text-[#505050] font-semibold tracking-wide mb-3">VOICE SUMMARY</p>
            <p className="text-sm text-[#CCC] leading-relaxed">{result.summary}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {result.personality_traits?.map((t, i) => (
                <span key={i} className="bg-[#B8FF2E]/10 border border-[#B8FF2E]/20 text-[#B8FF2E] text-xs font-semibold px-3 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>

          {/* Tone spectrum */}
          <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
            <p className="text-[10.5px] text-[#505050] font-semibold tracking-wide mb-4">TONE SPECTRUM</p>
            <Meter label={["Casual", "Formal"]} value={result.tone_spectrum?.formal_casual ?? 40} />
            <Meter label={["Playful", "Serious"]} value={result.tone_spectrum?.playful_serious ?? 30} />
            <Meter label={["Subtle", "Bold"]} value={result.tone_spectrum?.bold_subtle ?? 75} />
          </div>

          {/* Dos and Don'ts */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
              <p className="text-[10.5px] text-[#B8FF2E] font-semibold tracking-wide mb-3">DO ✓</p>
              <ul className="space-y-2.5">
                {result.dos?.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-[#AAA]">
                    <span className="text-[#B8FF2E] flex-shrink-0 mt-0.5">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
              <p className="text-[10.5px] text-[#FF6B35] font-semibold tracking-wide mb-3">DON'T ✗</p>
              <ul className="space-y-2.5">
                {result.donts?.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-[#AAA]">
                    <span className="text-[#FF6B35] flex-shrink-0 mt-0.5">✗</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Power words */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
              <p className="text-[10.5px] text-[#505050] font-semibold tracking-wide mb-3">POWER WORDS TO USE</p>
              <div className="flex flex-wrap gap-2">
                {result.power_words?.map((w, i) => (
                  <span key={i} className="bg-[#141414] text-[#AAA] text-xs px-2.5 py-1 rounded-md">{w}</span>
                ))}
              </div>
            </div>
            <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
              <p className="text-[10.5px] text-[#505050] font-semibold tracking-wide mb-3">WORDS TO AVOID</p>
              <div className="flex flex-wrap gap-2">
                {result.avoid_words?.map((w, i) => (
                  <span key={i} className="bg-[#FF6B35]/10 text-[#FF6B35]/70 text-xs px-2.5 py-1 rounded-md line-through">{w}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Sample rewrites */}
          {result.sample_rewrites?.length > 0 && (
            <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
              <p className="text-[10.5px] text-[#505050] font-semibold tracking-wide mb-4">BEFORE / AFTER REWRITES</p>
              <div className="space-y-5">
                {result.sample_rewrites.map((r, i) => (
                  <div key={i}>
                    <div className="grid grid-cols-2 gap-3 mb-2">
                      <div className="bg-[#080808] rounded-lg p-3 border border-[#FF6B35]/20">
                        <p className="text-[9px] text-[#FF6B35] font-semibold mb-1.5">BEFORE</p>
                        <p className="text-xs text-[#505050] leading-relaxed">{r.original}</p>
                      </div>
                      <div className="bg-[#080808] rounded-lg p-3 border border-[#B8FF2E]/20">
                        <p className="text-[9px] text-[#B8FF2E] font-semibold mb-1.5">AFTER</p>
                        <p className="text-xs text-[#CCC] leading-relaxed">{r.rewritten}</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#333] italic">{r.why}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tagline examples */}
          {result.tagline_examples?.length > 0 && (
            <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
              <p className="text-[10.5px] text-[#505050] font-semibold tracking-wide mb-3">TAGLINE EXAMPLES IN YOUR VOICE</p>
              <div className="space-y-2.5">
                {result.tagline_examples.map((t, i) => (
                  <div key={i} className={`px-4 py-3 rounded-lg text-sm ${i === 0 ? "bg-[#B8FF2E]/5 border border-[#B8FF2E]/20 text-[#E8E8E8] font-medium" : "bg-[#080808] text-[#505050]"}`}>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeSection === "test" && (
        <div className="max-w-2xl space-y-4">
          <div className="bg-[#B8FF2E]/[0.04] border border-[#B8FF2E]/15 rounded-xl p-4">
            <p className="text-xs text-[#B8FF2E] font-semibold mb-1">How this works</p>
            <p className="text-xs text-[#505050] leading-relaxed">Paste any piece of copy — an email, headline, tweet, or bio — and Propel will rewrite it in your brand voice using the guide you just built.</p>
          </div>
          <div>
            <label className="text-[11.5px] text-[#505050] font-semibold tracking-wide block mb-2">PASTE YOUR COPY TO REWRITE</label>
            <textarea value={testInput} onChange={e => setTestInput(e.target.value)}
              placeholder="Paste any copy here — email subject, landing page paragraph, tweet, LinkedIn post, bio..."
              rows={5} className={inp + " resize-y leading-relaxed"} />
          </div>
          <button onClick={testVoice} disabled={!testInput || testLoading}
            className="w-full py-3.5 rounded-xl font-display font-bold text-sm border-0 cursor-pointer disabled:cursor-not-allowed"
            style={{ background: testInput ? "#B8FF2E" : "#141414", color: testInput ? "#060606" : "#444" }}>
            {testLoading ? "Rewriting..." : "◈ Rewrite in Brand Voice"}
          </button>
          {testOutput && (
            <div className="bg-[#0D0D0D] border border-[#B8FF2E]/20 rounded-xl p-5">
              <p className="text-[10.5px] text-[#B8FF2E] font-semibold tracking-wide mb-3">REWRITTEN IN {result.voice_name.toUpperCase()}</p>
              <p className="text-sm text-[#CCC] leading-relaxed whitespace-pre-wrap">{testOutput}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
