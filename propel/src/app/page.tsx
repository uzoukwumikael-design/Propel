"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

/* ── Inline logo — no next/image needed ─────────────────────────────────── */
function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <div
      className="bg-[#B8FF2E] rounded-lg flex items-center justify-center font-display font-black text-[#060606] flex-shrink-0"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.44) }}
      aria-hidden="true"
    >P</div>
  );
}

/* ── Animated counter ───────────────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let v = 0;
      const step = target / 60;
      const t = setInterval(() => {
        v += step;
        if (v >= target) { setCount(target); clearInterval(t); }
        else setCount(Math.floor(v));
      }, 16);
      obs.disconnect();
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ── Data ───────────────────────────────────────────────────────────────── */
const FEATURES = [
  { icon: "◈", title: "AI Copy Engine",    desc: "Taglines, headlines, email sequences, and social posts in your brand voice, in seconds.",                                        tag: "Free",  tc: "text-[#B8FF2E]", tb: "bg-[#B8FF2E]/10" },
  { icon: "✓", title: "Launch Checklist",  desc: "100+ point checklist covering SEO, PR, Product Hunt, communities, and every channel that matters.",                              tag: "Free",  tc: "text-[#B8FF2E]", tb: "bg-[#B8FF2E]/10" },
  { icon: "↗", title: "AI SEO Analyzer",   desc: "AI audit of your landing page — title tags, keywords, structured data gaps, and a prioritised fix list.",                        tag: "Pro",   tc: "text-[#FF6B35]", tb: "bg-[#FF6B35]/10" },
  { icon: "⊙", title: "ICP Builder",       desc: "Define your ideal customer and get channel-specific targeting playbooks, messaging, and sample outreach.",                       tag: "Free",  tc: "text-[#B8FF2E]", tb: "bg-[#B8FF2E]/10" },
  { icon: "◈", title: "Brand Voice",       desc: "Build a complete brand voice guide — personality traits, dos and don'ts, power words, and before/after rewrites.",              tag: "Pro",   tc: "text-[#FF6B35]", tb: "bg-[#FF6B35]/10" },
  { icon: "◎", title: "Press Kit Builder", desc: "Auto-generate press kits with founder bios, product screenshots, company story, and downloadable media assets.",                tag: "Pro",   tc: "text-[#FF6B35]", tb: "bg-[#FF6B35]/10" },
  { icon: "⊞", title: "Content Calendar",  desc: "Plan your launch wave across Twitter, LinkedIn, and newsletters. Drag, drop, schedule, ship.",                                  tag: "Pro",   tc: "text-[#FF6B35]", tb: "bg-[#FF6B35]/10" },
  { icon: "⚡", title: "Analytics Hub",    desc: "Connect GA4 and more. All your metrics in one AI-summarised weekly dashboard.",                                                  tag: "Scale", tc: "text-[#7B61FF]", tb: "bg-[#7B61FF]/10" },
  { icon: "⊗", title: "Competitor Intel",  desc: "Monitor competitor launches, positioning changes, and ad copy in real time. Never get blindsided again.",                       tag: "Scale", tc: "text-[#7B61FF]", tb: "bg-[#7B61FF]/10" },
];

const STEPS = [
  { n: "01", title: "Describe your startup",   desc: "Tell Propel about your product, who it's for, and what makes it different. Takes under 2 minutes." },
  { n: "02", title: "Generate with AI",        desc: "Get AI-crafted copy, press kits, SEO audits, and marketing plans tailored to your specific product." },
  { n: "03", title: "Launch and iterate",      desc: "Execute your plan, track what drives signups, and keep shipping with the data to back every decision." },
];

const PRICING = [
  {
    name: "Starter", price: 0, period: "forever free", badge: null, highlight: false,
    desc: "Everything to validate and launch your idea.",
    features: ["10 AI generations / month", "Full launch checklist", "ICP Builder", "1 basic press kit", "SEO page score", "Community support"],
    cta: "Get started free",
  },
  {
    name: "Builder", price: 29, period: "/ month", badge: "Most popular", highlight: true,
    desc: "For founders actively going to market.",
    features: ["Unlimited AI generations", "All 9 marketing tools", "5 projects", "AI SEO Analyzer + Schema Builder", "Brand Voice guide", "Email drip builder", "Priority support"],
    cta: "Start 14-day free trial",
  },
  {
    name: "Scale", price: 89, period: "/ month", badge: null, highlight: false,
    desc: "For marketing teams going all-in.",
    features: ["Everything in Builder", "5 team seats", "Competitor intel", "API access", "White-label reports", "Custom integrations", "Dedicated success manager"],
    cta: "Talk to sales",
  },
];

const TESTIMONIALS = [
  { name: "Amara Osei",    role: "Founder, TrustStack", text: "I used to spend 3 hours on one launch email. Now I have a full email sequence in 20 minutes. Propel paid for itself on day one.",                  initials: "AO" },
  { name: "Ji-woo Kim",   role: "CEO, Fluent AI",      text: "The launch checklist alone is worth it. I was missing 40% of the channels that actually drove my signups.",                                        initials: "JK" },
  { name: "Ravi Mehta",   role: "Solo founder, Docflow",text: "Built my press kit in 15 minutes, got featured in two newsletters the same week. The press kit builder is insane.",                               initials: "RM" },
  { name: "Lena Fischer", role: "Co-founder, PulseDB", text: "The AI copy engine actually understands B2B SaaS. I stopped second-guessing my messaging the moment I saw the first output.",                      initials: "LF" },
];

const FAQS = [
  { q: "Is there really a free plan?",                         a: "Yes. Our Starter plan is free forever — no credit card required. You get 10 AI generations/month, the full launch checklist, ICP Builder, and one basic press kit." },
  { q: "How does the AI copy engine work?",                    a: "Propel uses Claude AI (by Anthropic) to generate marketing copy. You describe your product, audience, and tone — we return scored copy variations instantly, each ranked by quality." },
  { q: "Can I cancel anytime?",                                a: "Absolutely. Cancel anytime, no questions asked. We also offer a 30-day money-back guarantee on all paid plans." },
  { q: "What's the difference between Builder and Scale?",     a: "Builder ($29/mo) is for solo founders — unlimited AI and all 9 tools. Scale ($89/mo) adds 5 team seats, competitor intel, API access, and white-label reports." },
  { q: "How is Propel different from ChatGPT?",               a: "Propel is purpose-built for founder marketing. Every feature is designed for launch workflows: structured copy scoring, press kit templates, SEO analysis, launch checklists, and analytics — in one place with founder-specific prompts." },
  { q: "Do you support non-English founders?",                 a: "Yes. The AI copy engine generates content in any language. Just write your product description in that language or note it in the tone field." },
  { q: "What does the SEO Analyzer actually do?",              a: "Paste your page content and Propel's AI scores your title tag, meta description, heading structure, keyword density, and structured data. You get a prioritised fix list plus AI-generated improvements in seconds." },
  { q: "Can I generate Google structured data (JSON-LD)?",     a: "Yes — the Schema Builder tab inside the SEO Analyzer generates production-ready JSON-LD for Organization, Product, SoftwareApplication, FAQPage, and more. Just describe your business and copy the output into your site's <head>." },
];

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const [annual,  setAnnual]  = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#060606] text-[#E8E8E8]">

      {/* ══ NAV ══════════════════════════════════════════════════════════ */}
      <nav
        className="sticky top-0 z-50 border-b border-[#1C1C1C] bg-[#060606]/90 backdrop-blur-md"
        role="navigation" aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Propel home">
            <LogoMark size={32} />
            <span className="font-display font-bold text-[15px] tracking-tight">Propel</span>
          </Link>

          <div className="hidden md:flex gap-8 text-sm text-[#505050]">
            {[["#features","Features"],["#how-it-works","How it works"],["#pricing","Pricing"],["#faq","FAQ"]].map(([href,label]) => (
              <a key={href} href={href} className="hover:text-[#E8E8E8] transition-colors">{label}</a>
            ))}
          </div>

          <div className="flex gap-2.5">
            <Link href="/auth" className="btn-outline text-sm px-4 py-2">Sign in</Link>
            <Link href="/auth?mode=signup" className="btn-primary text-sm px-4 py-2">Try free →</Link>
          </div>
        </div>
      </nav>

      {/* ══ HERO ═════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-28 pb-20 px-10 text-center" aria-label="Hero">
        {/* Glow */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(184,255,46,0.06) 0%, transparent 65%)" }} />

        <div className="inline-flex items-center gap-2 bg-[#0D0D0D] border border-[#1C1C1C] rounded-full px-4 py-2 text-xs text-[#505050] mb-9">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF2E] inline-block animate-pulse" />
          Public beta · 1,200+ founders already launching
        </div>

        <h1 className="font-display font-black text-[clamp(36px,5.5vw,68px)] leading-[1.06] tracking-[-2.5px] max-w-3xl mx-auto mb-6">
          Stop guessing.<br />
          <span className="text-[#B8FF2E]">Start launching.</span>
        </h1>

        <p className="text-[17px] text-[#505050] leading-relaxed max-w-[500px] mx-auto mb-11">
          Every marketing tool founders need — AI copy, launch checklists, press kits, SEO analyzer, and analytics — all in one place.
        </p>

        <div className="flex gap-3 justify-center flex-wrap mb-4">
          <Link href="/auth?mode=signup"
            className="bg-[#B8FF2E] text-[#060606] font-bold px-8 py-4 rounded-xl text-[15px] border-0 hover:opacity-90 transition-opacity">
            Start for free — no card needed →
          </Link>
          <a href="#features"
            className="bg-transparent text-[#505050] px-7 py-4 border border-[#1C1C1C] rounded-xl text-sm hover:border-[#505050] transition-colors">
            See all 9 tools ↓
          </a>
        </div>
        <p className="text-xs text-[#505050]/40">Free plan forever · No credit card · 30-day money-back on paid plans</p>

        {/* Stats */}
        <div className="flex gap-10 justify-center mt-14 flex-wrap">
          {[{ v: 1284, s: "+", label: "Founders launched" },{ v: 9, s: "", label: "Marketing tools" },{ v: 30, s: "-day guarantee", label: "Money-back" }].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display font-black text-[30px] tracking-tight text-[#E8E8E8]">
                <AnimatedCounter target={s.v} suffix={s.s} />
              </div>
              <div className="text-xs text-[#505050] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* App mockup */}
        <div className="max-w-[920px] mx-auto mt-16 bg-[#0a0a0a] border border-[#1C1C1C] rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 60px 100px rgba(0,0,0,0.8), 0 0 80px rgba(184,255,46,0.05)" }}
          role="img" aria-label="Propel dashboard screenshot">
          <div className="bg-[#070707] border-b border-[#1C1C1C] px-4 py-3 flex items-center gap-2">
            {["#FF5E57","#FEBC2E","#28C840"].map(c=><div key={c} className="w-2.5 h-2.5 rounded-full" style={{background:c}} />)}
            <div className="flex-1 bg-[#0D0D0D] rounded mx-3 h-6 flex items-center px-3 text-[11px] text-[#505050]/50">
              app.propelhq.com/dashboard/copy
            </div>
          </div>
          <div className="grid" style={{gridTemplateColumns:"190px 1fr"}}>
            <div className="border-r border-[#1C1C1C] p-4">
              <p className="text-[10px] text-[#505050]/30 uppercase tracking-widest font-semibold mb-3">Tools</p>
              {[{icon:"◈",label:"AI Copy",a:true},{icon:"↗",label:"SEO Analyzer"},{icon:"◎",label:"Press Kit"},{icon:"⊙",label:"ICP Builder"},{icon:"⚡",label:"Analytics"}].map(item=>(
                <div key={item.label} className={`flex items-center gap-2 px-2.5 py-2 rounded-lg mb-0.5 text-[13px] ${item.a?"bg-[#B8FF2E]/10 text-[#B8FF2E] font-semibold":"text-[#505050]/40"}`}>
                  <span className="text-xs">{item.icon}</span>{item.label}
                </div>
              ))}
            </div>
            <div className="p-5">
              <p className="text-[11px] text-[#505050] mb-3">AI COPY ENGINE — TAGLINE</p>
              <div className="bg-[#060606] border border-[#1C1C1C] rounded-lg px-3.5 py-2.5 text-[12.5px] text-[#505050]/40 mb-4">
                TrustStack — B2B SaaS security compliance automation for engineering teams...
              </div>
              {[{s:"9.4",t:"Security compliance that doesn't slow your team down.",top:true},{s:"8.8",t:"From scrappy startup to enterprise-ready in weeks, not months.",top:false},{s:"8.1",t:"Close enterprise deals without hiring a security team.",top:false}].map((item,i)=>(
                <div key={i} className={`flex items-center justify-between gap-3 rounded-lg px-3.5 py-2.5 mb-2 ${item.top?"bg-[#B8FF2E]/5 border border-[#B8FF2E]/30":"bg-[#060606] border border-[#1C1C1C]"}`}>
                  <span className={`text-[12.5px] ${item.top?"text-[#E8E8E8]":"text-[#505050]/40"}`}>{item.t}</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${item.top?"bg-[#B8FF2E] text-[#060606]":"bg-[#0D0D0D] text-[#505050]/40"}`}>{item.s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SOCIAL PROOF ═════════════════════════════════════════════════ */}
      <section className="px-10 pb-16 text-center">
        <p className="text-[11px] text-[#505050]/25 uppercase tracking-widest mb-6">Trusted by founders from</p>
        <div className="flex gap-12 justify-center flex-wrap items-center">
          {["Y Combinator","Sequoia Scout","500 Startups","Techstars","Product Hunt"].map(b=>(
            <span key={b} className="text-sm text-[#505050]/25 font-semibold">{b}</span>
          ))}
        </div>
      </section>

      {/* ══ HOW IT WORKS ═════════════════════════════════════════════════ */}
      <section id="how-it-works" className="px-10 py-20 border-t border-[#1C1C1C]">
        <div className="text-center mb-14">
          <p className="text-[11px] text-[#505050]/60 uppercase tracking-widest font-semibold mb-4">How it works</p>
          <h2 className="font-display font-black text-[clamp(26px,3.5vw,42px)] tracking-tight">
            From signup to launch in minutes.
          </h2>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <div key={i} className="relative">
              {i < 2 && (
                <div className="absolute top-6 left-full w-full h-px hidden md:block"
                  style={{background:"linear-gradient(90deg,#1C1C1C 0%,transparent 100%)"}} />
              )}
              <div className="w-12 h-12 rounded-xl bg-[#B8FF2E]/10 border border-[#B8FF2E]/20 flex items-center justify-center mb-5">
                <span className="font-display font-black text-sm text-[#B8FF2E]">{step.n}</span>
              </div>
              <h3 className="font-display font-bold text-[15px] tracking-tight mb-3">{step.title}</h3>
              <p className="text-sm text-[#505050] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURES ═════════════════════════════════════════════════════ */}
      <section id="features" className="px-10 py-20 border-t border-[#1C1C1C]">
        <div className="text-center mb-16">
          <p className="text-[11px] text-[#505050]/60 uppercase tracking-widest font-semibold mb-4">Everything you need</p>
          <h2 className="font-display font-black text-[clamp(28px,4vw,44px)] tracking-[-1.5px] mb-4">
            9 tools. One platform.<br />Zero excuses.
          </h2>
          <p className="text-[#505050] text-[15.5px] max-w-md mx-auto">
            Stop duct-taping 12 different tools together. Launch from one place.
          </p>
        </div>
        <div className="max-w-[1100px] mx-auto grid grid-cols-3 gap-px bg-[#1C1C1C]">
          {FEATURES.map((f, i) => (
            <article key={i} className="bg-[#060606] hover:bg-[#0D0D0D] transition-colors p-8">
              <div className="flex justify-between items-start mb-4">
                <span className={`text-xl ${f.tc}`} aria-hidden="true">{f.icon}</span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${f.tb} ${f.tc}`}>{f.tag}</span>
              </div>
              <h3 className="font-display font-bold text-[13px] tracking-tight mb-2.5">{f.title}</h3>
              <p className="text-[13px] text-[#505050] leading-relaxed">{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ══ SEO SPOTLIGHT ════════════════════════════════════════════════ */}
      <section className="px-10 py-20 border-t border-[#1C1C1C]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#B8FF2E]/10 border border-[#B8FF2E]/20 rounded-full px-3 py-1.5 text-xs text-[#B8FF2E] font-semibold mb-6">
              ↗ AI SEO Analyzer
            </div>
            <h2 className="font-display font-black text-[clamp(24px,3.5vw,40px)] tracking-tight mb-5">
              Rank higher.<br /><span className="text-[#B8FF2E]">Get found first.</span>
            </h2>
            <p className="text-[#505050] text-[15px] leading-relaxed mb-7">
              Paste your URL or content — Propel's AI audits your title tags, meta descriptions, heading structure, keyword density, and structured data. You get a scored report with a prioritised fix list in seconds.
            </p>
            <ul className="space-y-3">
              {["Title & meta description optimisation","Keyword density + semantic analysis","Structured data (JSON-LD) suggestions","Competitor keyword gap analysis","Auto-generate Google-ready schema markup"].map((item,i)=>(
                <li key={i} className="flex gap-3 text-sm text-[#505050]">
                  <span className="text-[#B8FF2E] flex-shrink-0 mt-0.5">✓</span>{item}
                </li>
              ))}
            </ul>
            <Link href="/auth?mode=signup" className="inline-block mt-7 bg-[#B8FF2E] text-[#060606] font-bold px-6 py-3 rounded-xl text-sm border-0 hover:opacity-90 transition-opacity">
              Try AI SEO free →
            </Link>
          </div>
          {/* Mock SEO audit card */}
          <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs text-[#505050] font-semibold tracking-wider">SEO AUDIT RESULTS</p>
              <span className="font-display font-black text-2xl text-[#B8FF2E]">72<span className="text-sm text-[#505050] font-sans">/100</span></span>
            </div>
            {[{label:"Title Tag",score:58,tip:"Too vague — add primary keyword",c:"#FF6B35"},{label:"Meta Description",score:40,tip:"Missing CTA and keyword",c:"#FF6B35"},{label:"Heading Structure",score:85,tip:"H1 looks good ✓",c:"#B8FF2E"},{label:"Keyword Density",score:62,tip:"Increase to 1.5% from 0.4%",c:"#FF9F44"},{label:"Structured Data",score:20,tip:"No schema markup found",c:"#FF6B35"}].map((item,i)=>(
              <div key={i} className="mb-4">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-[#505050]">{item.label}</span>
                  <span className="text-xs font-semibold" style={{color:item.c}}>{item.score}</span>
                </div>
                <div className="bg-[#141414] rounded-full h-1.5 mb-1.5 overflow-hidden">
                  <div className="h-full rounded-full" style={{width:`${item.score}%`,background:item.c}} />
                </div>
                <p className="text-[10.5px] text-[#505050]/50">{item.tip}</p>
              </div>
            ))}
            <div className="mt-5 bg-[#B8FF2E]/5 border border-[#B8FF2E]/15 rounded-lg p-3">
              <p className="text-xs text-[#B8FF2E] font-semibold mb-1">✦ Top fix: Add Organization schema</p>
              <p className="text-[11px] text-[#505050]">Adding JSON-LD structured data could improve CTR by 15–30% in Google results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PRICING ══════════════════════════════════════════════════════ */}
      <section id="pricing" className="px-10 py-20 border-t border-[#1C1C1C]">
        <div className="text-center mb-14">
          <p className="text-[11px] text-[#505050]/60 uppercase tracking-widest font-semibold mb-4">Pricing</p>
          <h2 className="font-display font-black text-[clamp(28px,4vw,44px)] tracking-[-1.5px] mb-6">
            Start free. Scale when ready.
          </h2>
          {/* Billing toggle */}
          <div className="inline-flex bg-[#0D0D0D] border border-[#1C1C1C] rounded-lg p-1 gap-1">
            {["Monthly","Annual (save 20%)"].map(opt=>(
              <button key={opt} onClick={()=>setAnnual(opt.startsWith("A"))}
                className="px-5 py-2 rounded-md text-[13px] font-medium transition-all cursor-pointer border-0"
                style={{background:(opt.startsWith("A")===annual)?"#B8FF2E":"transparent",color:(opt.startsWith("A")===annual)?"#060606":"#505050",fontFamily:"var(--font-sans)"}}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-[1000px] mx-auto grid grid-cols-3 gap-5">
          {PRICING.map((plan,i)=>(
            <div key={i}
              className={`relative rounded-2xl p-8 ${plan.highlight?"bg-[#B8FF2E]/[0.04] border border-[#B8FF2E]/30":"bg-[#0D0D0D] border border-[#1C1C1C]"}`}
              itemScope itemType="https://schema.org/Offer">
              {plan.badge&&<div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#B8FF2E] text-[#060606] text-[11px] font-bold px-4 py-1 rounded-full">{plan.badge}</div>}
              <p className="text-sm text-[#505050] mb-3" itemProp="name">{plan.name}</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className={`font-display font-black text-[40px] tracking-tight ${plan.highlight?"text-[#B8FF2E]":"text-[#E8E8E8]"}`} itemProp="price">
                  ${annual&&plan.price>0?Math.round(plan.price*0.8):plan.price}
                </span>
                <span className="text-sm text-[#505050]">{plan.period}</span>
                <meta itemProp="priceCurrency" content="USD"/>
              </div>
              <p className="text-sm text-[#505050] mb-7 leading-relaxed" itemProp="description">{plan.desc}</p>
              <div className="mb-7 space-y-2.5">
                {plan.features.map((f,j)=>(
                  <div key={j} className="flex gap-2.5 text-[13.5px] text-[#AAAAAA]">
                    <span className={`flex-shrink-0 mt-0.5 ${plan.highlight?"text-[#B8FF2E]":"text-[#505050]/40"}`}>✓</span>{f}
                  </div>
                ))}
              </div>
              <Link href="/auth?mode=signup"
                className={`block w-full text-center py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-90 ${plan.highlight?"bg-[#B8FF2E] text-[#060606]":"bg-[#111111] text-[#505050] hover:text-[#E8E8E8]"}`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-[#505050]/40 mt-6">
          All paid plans include a 30-day money-back guarantee · No setup fees · Cancel anytime
        </p>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════════════════════════ */}
      <section className="px-10 py-20 border-t border-[#1C1C1C]">
        <div className="text-center mb-14">
          <p className="text-[11px] text-[#505050]/60 uppercase tracking-widest font-semibold mb-4">Testimonials</p>
          <h2 className="font-display font-black text-[clamp(26px,3.5vw,42px)] tracking-tight">
            Founders love Propel.
          </h2>
        </div>
        <div className="max-w-[860px] mx-auto grid grid-cols-2 gap-5">
          {TESTIMONIALS.map((t,i)=>(
            <figure key={i} className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl p-6"
              itemScope itemType="https://schema.org/Review">
              <blockquote itemProp="reviewBody">
                <p className="text-[13.5px] text-[#505050] leading-relaxed mb-6">"{t.text}"</p>
              </blockquote>
              <figcaption className="flex items-center gap-3" itemScope itemType="https://schema.org/Person">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-[#060606] flex-shrink-0"
                  style={{background:"linear-gradient(135deg, #B8FF2E, #FF6B35)"}} aria-hidden="true">
                  {t.initials}
                </div>
                <div>
                  <p className="text-[13.5px] font-semibold" itemProp="name">{t.name}</p>
                  <p className="text-xs text-[#505050]" itemProp="jobTitle">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════════════ */}
      <section id="faq" className="px-10 py-20 border-t border-[#1C1C1C]">
        <div className="text-center mb-14">
          <p className="text-[11px] text-[#505050]/60 uppercase tracking-widest font-semibold mb-4">FAQ</p>
          <h2 className="font-display font-black text-[clamp(26px,3.5vw,42px)] tracking-tight">Common questions.</h2>
        </div>
        <div className="max-w-2xl mx-auto space-y-2.5">
          {FAQS.map((faq,i)=>(
            <div key={i} className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl overflow-hidden"
              itemScope itemType="https://schema.org/Question">
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer bg-transparent border-0"
                style={{fontFamily:"var(--font-sans)"}} aria-expanded={openFaq===i}>
                <span className="font-semibold text-[14px] text-[#E8E8E8]" itemProp="name">{faq.q}</span>
                <span className={`text-[#505050] ml-4 flex-shrink-0 text-lg transition-transform duration-200 ${openFaq===i?"rotate-45":""}`}>+</span>
              </button>
              {openFaq===i&&(
                <div className="px-6 pb-5" itemScope itemType="https://schema.org/Answer">
                  <p className="text-sm text-[#505050] leading-relaxed" itemProp="text">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════════════════ */}
      <section className="px-10 py-24 border-t border-[#1C1C1C] text-center relative overflow-hidden">
        <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{background:"radial-gradient(ellipse, rgba(184,255,46,0.07) 0%, transparent 65%)"}} />
        <h2 className="font-display font-black text-[clamp(28px,4.5vw,52px)] tracking-[-2px] max-w-xl mx-auto mb-5">
          Your launch deserves<br />better tools.
        </h2>
        <p className="text-[#505050] text-[15px] mb-9">Join 1,200+ founders who ship with Propel.</p>
        <Link href="/auth?mode=signup"
          className="font-display font-black text-[#060606] bg-[#B8FF2E] px-10 py-4 rounded-xl text-base border-0 hover:opacity-90 transition-opacity inline-block">
          Start for free →
        </Link>
        <p className="text-xs text-[#505050]/30 mt-4">Free plan forever · No credit card · 30-day money-back on paid plans</p>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
      <footer className="border-t border-[#1C1C1C] px-10 py-10" role="contentinfo">
        <div className="max-w-7xl mx-auto flex items-start justify-between flex-wrap gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <LogoMark size={28} />
              <span className="font-display font-bold text-sm">Propel</span>
            </Link>
            <p className="text-xs text-[#505050]/50 max-w-[200px] leading-relaxed">
              AI-powered marketing tools for founders who ship.
            </p>
            <p className="text-xs text-[#505050]/25 mt-3">© 2025 Propel. All rights reserved.</p>
          </div>
          <div className="grid grid-cols-3 gap-12 text-xs">
            {[
              { heading: "Product",  links: ["Features","Pricing","Changelog","Roadmap"] },
              { heading: "Company",  links: ["About","Blog","Careers","Press"] },
              { heading: "Legal",    links: ["Privacy","Terms","Cookies"] },
            ].map(col=>(
              <div key={col.heading}>
                <p className="font-semibold text-[#505050]/60 mb-4 uppercase tracking-wider">{col.heading}</p>
                <ul className="space-y-3 text-[#505050]/40">
                  {col.links.map(l=><li key={l}><a href="#" className="hover:text-[#505050] transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
