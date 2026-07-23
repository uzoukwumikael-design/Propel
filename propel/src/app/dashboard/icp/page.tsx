"use client";

import { useState } from "react";

interface ICPProfile {
  persona_name: string;
  job_title: string;
  company_type: string;
  seniority: string;
  demographics: { age_range: string; background: string; experience: string };
  pain_points: string[];
  goals: string[];
  objections: string[];
  channels: string[];
  trigger_events: string[];
  messaging_angle: string;
  sample_outreach: string;
}

interface ICPResult {
  primary_icp: ICPProfile;
  secondary_icps: { title: string; company_type: string; why: string }[];
  positioning_statement: string;
  value_proposition: string;
}

export default function ICPPage() {
  const [form, setForm] = useState({ product: "", problem: "", current_customers: "", price_point: "", geography: "" });
  const [result, setResult] = useState<ICPResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"primary" | "secondary" | "messaging">("primary");

  const generate = async () => {
    if (!form.product || loading) return;
    setLoading(true); setResult(null);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "icp", payload: form }),
    });
    const data = await res.json();
    setResult(data.icp ?? null);
    setLoading(false);
  };

  const inp = "w-full px-3.5 py-3 bg-[#0D0D0D] border border-[#1C1C1C] rounded-lg text-[#E8E8E8] text-sm outline-none focus:border-[#2A2A2A] transition-colors";
  const canGen = form.product.trim().length > 0;

  return (
    <div>
      <div className="mb-7">
        <h1 className="font-display font-bold text-[20px] tracking-tight mb-1.5">ICP Builder</h1>
        <p className="text-sm text-[#505050]">Define your ideal customer profile and get targeted messaging playbooks.</p>
      </div>

      {!result ? (
        <div className="max-w-xl">
          <div className="space-y-4">
            {[
              { key: "product", label: "YOUR PRODUCT *", placeholder: "Describe what your product does and who it's for", type: "textarea" },
              { key: "problem", label: "THE PROBLEM YOU SOLVE *", placeholder: "What specific pain does your product eliminate?", type: "textarea" },
              { key: "current_customers", label: "EXISTING CUSTOMERS (if any)", placeholder: "Describe your best current customers — their roles, company size, industry", type: "input" },
              { key: "price_point", label: "PRICE POINT", placeholder: "e.g. $29/month, $500/year, enterprise deal", type: "input" },
              { key: "geography", label: "TARGET GEOGRAPHY", placeholder: "e.g. US only, English-speaking markets, global", type: "input" },
            ].map(field => (
              <div key={field.key}>
                <label className="text-[11.5px] text-[#505050] font-semibold tracking-wide block mb-2">{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea value={(form as any)[field.key]} onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                    placeholder={field.placeholder} rows={3}
                    className={inp + " resize-none leading-relaxed"} />
                ) : (
                  <input value={(form as any)[field.key]} onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                    placeholder={field.placeholder} className={inp} />
                )}
              </div>
            ))}

            <button onClick={generate} disabled={!canGen || loading}
              className="w-full py-3.5 rounded-xl font-display font-bold text-sm border-0 cursor-pointer disabled:cursor-not-allowed"
              style={{ background: canGen ? "#B8FF2E" : "#141414", color: canGen ? "#060606" : "#444", opacity: loading ? 0.8 : 1 }}>
              {loading ? "Building your ICP..." : "⊙ Build ICP Profile"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-bold text-[16px] tracking-tight">{result.primary_icp.persona_name}</h2>
              <p className="text-sm text-[#505050] mt-1">{result.primary_icp.job_title} · {result.primary_icp.company_type}</p>
            </div>
            <button onClick={() => setResult(null)}
              className="px-4 py-2 bg-transparent border border-[#1C1C1C] rounded-lg text-[#505050] text-sm cursor-pointer hover:border-[#2A2A2A] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}>← Rebuild</button>
          </div>

          {/* Positioning */}
          <div className="bg-[#B8FF2E]/[0.05] border border-[#B8FF2E]/15 rounded-xl p-5 mb-5">
            <p className="text-[10.5px] text-[#B8FF2E] font-semibold tracking-wide mb-2">✦ POSITIONING STATEMENT</p>
            <p className="text-sm text-[#CCC] leading-relaxed">{result.positioning_statement}</p>
          </div>

          {/* Sub-tabs */}
          <div className="flex gap-1 bg-[#080808] border border-[#1C1C1C] rounded-lg p-1 mb-5 w-fit">
            {(["primary", "secondary", "messaging"] as const).map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className="px-4 py-2 rounded-md text-sm font-medium cursor-pointer border-0 capitalize transition-all"
                style={{ background: activeTab === t ? "#B8FF2E" : "transparent", color: activeTab === t ? "#060606" : "#505050", fontFamily: "var(--font-sans)" }}>
                {t === "primary" ? "Primary ICP" : t === "secondary" ? "Secondary ICPs" : "Messaging"}
              </button>
            ))}
          </div>

          {/* Primary ICP */}
          {activeTab === "primary" && (
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "PAIN POINTS", items: result.primary_icp.pain_points, color: "#FF6B35", icon: "!" },
                { label: "GOALS", items: result.primary_icp.goals, color: "#B8FF2E", icon: "→" },
                { label: "OBJECTIONS", items: result.primary_icp.objections, color: "#FF9F44", icon: "?" },
                { label: "WHERE TO FIND THEM", items: result.primary_icp.channels, color: "#7B61FF", icon: "◈" },
              ].map(section => (
                <div key={section.label} className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
                  <p className="text-[10.5px] font-semibold tracking-wide mb-3" style={{ color: "#505050" }}>{section.label}</p>
                  <ul className="space-y-2.5">
                    {section.items?.map((item, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-[#AAA]">
                        <span className="flex-shrink-0 mt-0.5" style={{ color: section.color }}>{section.icon}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Demographics */}
              <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
                <p className="text-[10.5px] text-[#505050] font-semibold tracking-wide mb-3">DEMOGRAPHICS</p>
                {[
                  ["Age range", result.primary_icp.demographics?.age_range],
                  ["Background", result.primary_icp.demographics?.background],
                  ["Experience", result.primary_icp.demographics?.experience],
                  ["Seniority", result.primary_icp.seniority],
                ].map(([k, v]) => (
                  <div key={k as string} className="flex gap-3 mb-2.5">
                    <span className="text-xs text-[#333] flex-shrink-0 w-24">{k as string}</span>
                    <span className="text-xs text-[#AAA]">{v as string}</span>
                  </div>
                ))}
              </div>

              {/* Trigger events */}
              <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
                <p className="text-[10.5px] text-[#505050] font-semibold tracking-wide mb-3">TRIGGER EVENTS (buy signals)</p>
                <ul className="space-y-2">
                  {result.primary_icp.trigger_events?.map((t, i) => (
                    <li key={i} className="flex gap-2 text-sm text-[#AAA]">
                      <span className="text-[#B8FF2E] flex-shrink-0">⚡</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Secondary ICPs */}
          {activeTab === "secondary" && (
            <div className="space-y-4">
              {result.secondary_icps?.map((icp, i) => (
                <div key={i} className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-[#7B61FF]/10 flex items-center justify-center text-xs font-bold text-[#7B61FF] flex-shrink-0">
                      {i + 2}
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">{icp.title}</p>
                      <p className="text-xs text-[#505050] mb-2">{icp.company_type}</p>
                      <p className="text-sm text-[#AAA] leading-relaxed">{icp.why}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Messaging */}
          {activeTab === "messaging" && (
            <div className="space-y-4">
              <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
                <p className="text-[10.5px] text-[#505050] font-semibold tracking-wide mb-3">VALUE PROPOSITION</p>
                <p className="text-sm text-[#CCC] leading-relaxed">{result.value_proposition}</p>
              </div>
              <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
                <p className="text-[10.5px] text-[#505050] font-semibold tracking-wide mb-3">CORE MESSAGING ANGLE</p>
                <p className="text-sm text-[#CCC] leading-relaxed">{result.primary_icp.messaging_angle}</p>
              </div>
              <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
                <p className="text-[10.5px] text-[#505050] font-semibold tracking-wide mb-3">SAMPLE COLD OUTREACH</p>
                <div className="bg-[#080808] rounded-lg p-4">
                  <p className="text-sm text-[#CCC] leading-relaxed whitespace-pre-wrap">{result.primary_icp.sample_outreach}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
