"use client";

const METRICS = [
  { label: "Total Signups", value: "1,284", change: "+18%", up: true },
  { label: "This Week", value: "143", change: "+7%", up: true },
  { label: "Conversion Rate", value: "3.2%", change: "-0.4%", up: false },
  { label: "MRR", value: "$4,814", change: "+22%", up: true },
];

const CHANNELS = [
  { name: "Product Hunt", signups: 312, color: "#FF6B35" },
  { name: "Twitter/X", signups: 284, color: "#B8FF2E" },
  { name: "Direct/Referral", signups: 261, color: "#7B61FF" },
  { name: "Hacker News", signups: 198, color: "#44EAFF" },
  { name: "Newsletter", signups: 143, color: "#FF9F44" },
  { name: "SEO/Organic", signups: 86, color: "#505050" },
];

const WEEKLY = [
  { day: "Mon", signups: 18 },
  { day: "Tue", signups: 24 },
  { day: "Wed", signups: 31 },
  { day: "Thu", signups: 42 },
  { day: "Fri", signups: 38 },
  { day: "Sat", signups: 12 },
  { day: "Sun", signups: 8 },
];

const maxWeekly = Math.max(...WEEKLY.map(w => w.signups));
const maxChannel = Math.max(...CHANNELS.map(c => c.signups));

export default function AnalyticsPage() {
  return (
    <div>
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="font-display font-bold text-[20px] tracking-tight mb-1.5">Analytics Hub</h1>
          <p className="text-sm text-[#505050]">Track your launch performance across all channels.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs bg-[#0D0D0D] border border-[#1C1C1C] rounded-lg text-[#505050] cursor-pointer hover:border-[#2A2A2A] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}>Last 7 days ▾</button>
          <button className="px-3 py-1.5 text-xs bg-[#B8FF2E] border-0 rounded-lg text-[#060606] font-bold cursor-pointer hover:opacity-90 transition-opacity"
            style={{ fontFamily: "var(--font-sans)" }}>Connect GA4</button>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {METRICS.map((m, i) => (
          <div key={i} className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
            <p className="text-[11.5px] text-[#505050] mb-2.5">{m.label}</p>
            <div className="font-display font-black text-[22px] tracking-tight mb-2">{m.value}</div>
            <div className={`text-xs font-medium ${m.up ? "text-[#B8FF2E]" : "text-[#FF6B35]"}`}>
              {m.change} vs last week
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        {/* Weekly signups bar chart */}
        <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
          <p className="text-[11px] text-[#505050] font-semibold tracking-wider mb-5">DAILY SIGNUPS — THIS WEEK</p>
          <div className="flex items-end gap-2 h-32">
            {WEEKLY.map((w, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-[#505050]">{w.signups}</span>
                <div className="w-full rounded-sm transition-all"
                  style={{ height: `${(w.signups / maxWeekly) * 100}%`, background: i === 3 ? "#B8FF2E" : "#1C1C1C", minHeight: "4px" }} />
                <span className="text-[10px] text-[#333]">{w.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Channel breakdown */}
        <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
          <p className="text-[11px] text-[#505050] font-semibold tracking-wider mb-5">SIGNUPS BY CHANNEL</p>
          <div className="space-y-3.5">
            {CHANNELS.map((c, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[13px] text-[#AAA]">{c.name}</span>
                  <span className="text-[13px] font-semibold" style={{ color: c.color }}>{c.signups}</span>
                </div>
                <div className="bg-[#141414] rounded-full h-1.5 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(c.signups / maxChannel) * 100}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-5">
        <p className="text-[11px] text-[#505050] font-semibold tracking-wider mb-4">✦ AI WEEKLY SUMMARY</p>
        <div className="bg-[#B8FF2E]/[0.05] border border-[#B8FF2E]/15 rounded-lg p-4 mb-4">
          <p className="text-sm text-[#505050] leading-relaxed">
            Product Hunt is your top channel (24.3% of signups). Conversion rate dropped 0.4% this week —
            this may be related to your new hero copy. Consider A/B testing the original vs current version.
            Thursday was your best performing day with 42 signups. Newsletter converts at 8%,
            significantly above average — pitch 3 more newsletters this week.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Top action", text: "Double down on Twitter threads", icon: "↗" },
            { label: "Watch out", text: "HN traffic down 23% this week", icon: "⚠" },
            { label: "Opportunity", text: "Pitch 3 more newsletters", icon: "✉" },
          ].map((item, i) => (
            <div key={i} className="bg-[#060606] border border-[#1C1C1C] rounded-lg p-3.5">
              <div className="text-[10px] text-[#333] font-semibold uppercase tracking-wider mb-1.5">{item.label}</div>
              <div className="text-xs text-[#505050]">{item.icon} {item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
