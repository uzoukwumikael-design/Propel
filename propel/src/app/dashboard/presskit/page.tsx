"use client";

import { useState } from "react";

interface PressKit {
  boilerplate: string;
  elevator_pitch: string;
  key_facts: string[];
  founder_bios: { name: string; title: string; bio: string }[];
  media_angles: string[];
  press_contact: string;
}

export default function PressKitPage() {
  const [form, setForm] = useState({ company: "", tagline: "", founded: "2025", founders: "", description: "" });
  const [kit, setKit] = useState<PressKit | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!form.company || !form.description || loading) return;
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "presskit", payload: form }),
    });

    const data = await res.json();
    setKit(data.kit ?? null);
    setLoading(false);
  };

  const inp = "w-full px-3.5 py-3 bg-[#0D0D0D] border border-[#1C1C1C] rounded-lg text-[#E8E8E8] text-sm outline-none focus:border-[#2A2A2A] transition-colors";
  const canGenerate = form.company && form.description;

  if (kit) {
    return (
      <div>
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="font-display font-bold text-[20px] tracking-tight mb-1">Press Kit — {form.company}</h1>
            <p className="text-xs text-[#505050]">AI-generated · Ready to share with journalists</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setKit(null)} className="px-4 py-2 bg-transparent border border-[#1C1C1C] rounded-lg text-[#505050] text-sm cursor-pointer hover:border-[#2A2A2A] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}>← Edit</button>
            <button className="px-4 py-2 bg-[#B8FF2E] border-0 rounded-lg text-[#060606] text-sm font-bold cursor-pointer hover:opacity-90 transition-opacity"
              style={{ fontFamily: "var(--font-sans)" }}>↓ Copy as Markdown</button>
          </div>
        </div>

        <div className="space-y-3">
          {[{ label: "ELEVATOR PITCH", content: kit.elevator_pitch }, { label: "COMPANY BOILERPLATE", content: kit.boilerplate }].map(s => (
            <div key={s.label} className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
              <p className="text-[10.5px] text-[#505050] font-semibold tracking-widest mb-2.5">{s.label}</p>
              <p className="text-sm text-[#CCC] leading-relaxed">{s.content}</p>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
              <p className="text-[10.5px] text-[#505050] font-semibold tracking-widest mb-3">KEY FACTS</p>
              <ul className="space-y-2">
                {kit.key_facts?.map((f, i) => (
                  <li key={i} className="flex gap-2 text-sm text-[#AAA]">
                    <span className="text-[#B8FF2E] flex-shrink-0">→</span>{f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
              <p className="text-[10.5px] text-[#505050] font-semibold tracking-widest mb-3">MEDIA ANGLES</p>
              <ul className="space-y-2">
                {kit.media_angles?.map((a, i) => (
                  <li key={i} className="flex gap-2 text-sm text-[#AAA]">
                    <span className="text-[#FF6B35] flex-shrink-0">◈</span>{a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {kit.founder_bios?.map((founder, i) => (
            <div key={i} className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
              <p className="text-[10.5px] text-[#505050] font-semibold tracking-widest mb-3">FOUNDER BIO</p>
              <p className="font-semibold text-sm mb-1">{founder.name}</p>
              <p className="text-xs text-[#505050] mb-2.5">{founder.title}</p>
              <p className="text-[13.5px] text-[#AAA] leading-relaxed">{founder.bio}</p>
            </div>
          ))}

          <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
            <p className="text-[10.5px] text-[#505050] font-semibold tracking-widest mb-2">PRESS CONTACT</p>
            <p className="text-sm text-[#B8FF2E]">{kit.press_contact}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-7">
        <h1 className="font-display font-bold text-[20px] tracking-tight mb-1.5">Press Kit Builder</h1>
        <p className="text-sm text-[#505050]">Generate a professional press kit in 2 minutes.</p>
      </div>

      <div className="max-w-xl space-y-4">
        {[
          { key: "company", label: "COMPANY NAME *", placeholder: "Acme Inc.", type: "input" },
          { key: "tagline", label: "TAGLINE", placeholder: "The smartest way to...", type: "input" },
          { key: "founded", label: "FOUNDED", placeholder: "2025", type: "input" },
          { key: "founders", label: "FOUNDERS (comma-separated)", placeholder: "Jane Doe, John Smith", type: "input" },
          { key: "description", label: "COMPANY DESCRIPTION *", placeholder: "Describe what you do, the problem you solve, your target market, and any traction (funding, users, revenue)...", type: "textarea" },
        ].map(field => (
          <div key={field.key}>
            <label className="text-[11.5px] text-[#505050] font-semibold tracking-wide block mb-2">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea value={(form as any)[field.key]} onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                placeholder={field.placeholder} rows={4} className={inp + " resize-y leading-relaxed"} />
            ) : (
              <input value={(form as any)[field.key]} onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                placeholder={field.placeholder} className={inp} />
            )}
          </div>
        ))}

        <button onClick={generate} disabled={!canGenerate || loading}
          className="w-full py-3.5 rounded-xl font-display font-bold text-sm border-0 transition-opacity cursor-pointer disabled:cursor-not-allowed"
          style={{ background: canGenerate ? "#B8FF2E" : "#141414", color: canGenerate ? "#060606" : "#444", opacity: loading ? 0.8 : 1 }}>
          {loading ? "Generating press kit..." : "◎ Generate Press Kit"}
        </button>
      </div>
    </div>
  );
}
