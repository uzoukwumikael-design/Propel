"use client";

import { useState } from "react";

interface CheckItem { id: number; text: string; done: boolean; }

const INITIAL: Record<string, CheckItem[]> = {
  "Pre-launch": [
    { id: 1, text: "Define your ICP (Ideal Customer Profile)", done: false },
    { id: 2, text: "Write a one-liner value proposition", done: false },
    { id: 3, text: "Set up landing page with clear CTA", done: false },
    { id: 4, text: "Install analytics (GA4 + Hotjar)", done: false },
    { id: 5, text: "Set up email capture with a lead magnet", done: false },
    { id: 6, text: "Write a 5-email welcome sequence", done: false },
    { id: 7, text: "Schedule 10 pre-launch social posts", done: false },
    { id: 8, text: "Submit to relevant startup directories", done: false },
    { id: 9, text: "Reach out to 10 potential beta users", done: false },
    { id: 10, text: "Set up live chat or support inbox", done: false },
  ],
  "Launch day": [
    { id: 11, text: "Post on Product Hunt at 8AM PST", done: false },
    { id: 12, text: "Submit Show HN to Hacker News", done: false },
    { id: 13, text: "Email your entire waitlist", done: false },
    { id: 14, text: "Post Twitter/X launch thread", done: false },
    { id: 15, text: "Drop links in relevant Slack/Discord communities", done: false },
    { id: 16, text: "DM 20 people in your network", done: false },
    { id: 17, text: "Post LinkedIn launch announcement", done: false },
  ],
  "Post-launch": [
    { id: 18, text: "Collect 5+ testimonials from early users", done: false },
    { id: 19, text: "Write a retrospective blog post", done: false },
    { id: 20, text: "Run retargeting campaign on LinkedIn", done: false },
    { id: 21, text: "Reach out to 3+ relevant newsletters for features", done: false },
    { id: 22, text: "Apply to be featured in startup roundups", done: false },
    { id: 23, text: "Set up referral program", done: false },
  ],
};

export default function ChecklistPage() {
  const [checklist, setChecklist] = useState(INITIAL);

  const toggle = (section: string, id: number) => {
    setChecklist(prev => ({
      ...prev,
      [section]: prev[section].map(item => item.id === id ? { ...item, done: !item.done } : item),
    }));
  };

  const total = Object.values(checklist).flat().length;
  const done = Object.values(checklist).flat().filter(i => i.done).length;
  const pct = Math.round((done / total) * 100);

  return (
    <div>
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="font-display font-bold text-[20px] tracking-tight mb-1.5">Launch Checklist</h1>
          <p className="text-sm text-[#505050]">Battle-tested checklist to launch your product right.</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="font-display font-black text-[26px] text-[#B8FF2E] tracking-tight">{done}/{total}</div>
          <div className="text-[11px] text-[#505050]">{pct}% complete</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-[#111] rounded-full h-1.5 mb-8 overflow-hidden">
        <div className="h-full bg-[#B8FF2E] rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>

      {Object.entries(checklist).map(([section, items]) => {
        const sectionDone = items.filter(i => i.done).length;
        return (
          <div key={section} className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-[11px] tracking-[1px] text-[#404040]">{section.toUpperCase()}</h3>
              <span className="text-[11px] text-[#333]">{sectionDone}/{items.length}</span>
            </div>
            <div className="space-y-1.5">
              {items.map(item => (
                <div key={item.id} onClick={() => toggle(section, item.id)}
                  className="flex items-center gap-3 px-4 py-3 bg-[#0D0D0D] border border-[#1C1C1C] rounded-lg cursor-pointer hover:border-[#2A2A2A] transition-colors group">
                  <div className={`w-[18px] h-[18px] rounded-md flex items-center justify-center flex-shrink-0 text-[11px] font-bold transition-colors ${item.done ? "bg-[#B8FF2E] text-[#060606]" : "border border-[#333] text-transparent"}`}>
                    ✓
                  </div>
                  <span className={`text-[13.5px] transition-colors ${item.done ? "text-[#404040] line-through" : "text-[#E8E8E8]"}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
