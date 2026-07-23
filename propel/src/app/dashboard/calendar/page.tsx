"use client";

import { useState } from "react";

const CHANNELS = [
  { name: "Twitter/X", color: "#1DA1F2" },
  { name: "LinkedIn", color: "#0A66C2" },
  { name: "Email", color: "#B8FF2E" },
  { name: "Blog", color: "#FF6B35" },
];

const SAMPLE_POSTS: Record<number, { ch: string; text: string; color: string }> = {
  2: { ch: "Twitter", text: "🚀 We're live! Here's everything we built and why...", color: "#1DA1F2" },
  5: { ch: "Email", text: "Subject: The security checklist every founder needs", color: "#B8FF2E" },
  8: { ch: "LinkedIn", text: "Why we decided to build in public from day 1...", color: "#0A66C2" },
  12: { ch: "Twitter", text: "Product Hunt launch thread — here's what we learned 🧵", color: "#1DA1F2" },
  15: { ch: "Blog", text: "Launch retrospective: 3 months to 500 users", color: "#FF6B35" },
  19: { ch: "Email", text: "Big news: our new feature just dropped", color: "#B8FF2E" },
  22: { ch: "LinkedIn", text: "Lessons from our first 100 customers", color: "#0A66C2" },
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarPage() {
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="font-display font-bold text-[20px] tracking-tight mb-1.5">Content Calendar</h1>
          <p className="text-sm text-[#505050]">Plan your launch content wave across every channel.</p>
        </div>
        <button className="bg-[#B8FF2E] text-[#060606] text-sm font-bold px-4 py-2 rounded-lg border-0 cursor-pointer hover:opacity-90 transition-opacity"
          style={{ fontFamily: "var(--font-sans)" }}>
          + Schedule Post
        </button>
      </div>

      {/* Channel legend */}
      <div className="flex gap-5 mb-5 flex-wrap">
        {CHANNELS.map(c => (
          <div key={c.name} className="flex items-center gap-1.5 text-xs text-[#505050]">
            <div className="w-2 h-2 rounded-sm" style={{ background: c.color }} />
            {c.name}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl overflow-hidden">
        <div className="grid border-b border-[#1C1C1C] bg-[#080808]" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
          {DAYS.map(d => (
            <div key={d} className="p-2.5 text-center text-[11px] text-[#333] font-semibold">{d}</div>
          ))}
        </div>
        <div className="grid" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
          {Array.from({ length: 28 }, (_, i) => {
            const post = posts[i + 1];
            const isLast = i >= 21;
            const isEdge = (i + 1) % 7 === 0;
            return (
              <div key={i}
                className={`min-h-[80px] p-2 ${!isEdge ? "border-r border-[#1C1C1C]" : ""} ${!isLast ? "border-b border-[#1C1C1C]" : ""}`}>
                <div className="text-[10.5px] text-[#2A2A2A] mb-1">{i + 1}</div>
                {post && (
                  <div className="rounded p-1.5 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ background: post.color + "15", border: `1px solid ${post.color}30`, borderLeft: `3px solid ${post.color}` }}
                    onClick={() => setSelected(i + 1)}>
                    <div className="text-[9px] font-bold mb-0.5" style={{ color: post.color }}>{post.ch}</div>
                    <div className="text-[9.5px] leading-snug" style={{ color: "#505050" }}>{post.text.slice(0, 38)}...</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mt-5">
        {[
          { label: "Posts scheduled", value: Object.keys(posts).length },
          { label: "This month reach", value: "~12K" },
          { label: "Channels active", value: 4 },
          { label: "Drafts pending", value: 3 },
        ].map((s, i) => (
          <div key={i} className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-lg p-4">
            <div className="text-xs text-[#505050] mb-2">{s.label}</div>
            <div className="font-display font-bold text-xl text-[#E8E8E8]">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
